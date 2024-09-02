import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields
        switch (true) {
            case!name:return res.json({error:"Name is required"})
            case!description:return res.json({error:"Description is required"})
            case!price:return res.json({error:"price is required"})
            case!category:return res.json({error:"category is required"})
            case!quantity:return res.json({error:"quantity is required"})
            case!brand:return res.json({error:"brand is required"})
        }
        const product = new Product({ ...req.fields })
        await product.save()
        return res
        .status(201)
            .json(new ApiResponse
                (200, {
          product

        }, "Product Successfully Created"));
    } catch (error) {
        throw new ApiError (400,`${error.message}`)
    }
})
const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields

        switch (true) {
            case!name:return res.json({error:"Name is required"})
            case!description:return res.json({error:"Description is required"})
            case!price:return res.json({error:"price is required"})
            case!category:return res.json({error:"category is required"})
            case!quantity:return res.json({error:"quantity is required"})
            case!brand:return res.json({error:"brand is required"})
        }
        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })
        await product.save()
        return res
        .status(201)
            .json(new ApiResponse
                (200, {
          product

        }, "Product Successfully Updated"));
    } catch (error) {
        throw new ApiError(400,error.message)
    }
})

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(new ApiResponse(200,{product},"Product Successfully Deleted"))
    } catch (error) {
        throw new ApiError(500,error.message)
    }
})
const fetchProducts = asyncHandler(async (req, res) => {
    try {

        const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json(new ApiResponse(200,{
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      },"Here Are The Six Products"));
    } catch (error) {
        throw new ApiError(500,'Server Error')
    }
})
const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product)
        {
            res.json(new ApiResponse(200,{product},'Here Is Your Product'))
        }
        else {
            throw new ApiError(404,'Product Not Found')
        }
    } catch (error) {
        throw new ApiError(404,'Product Not Found')
    }
})
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({createAt:-1})
        res.json(new ApiResponse(200,{products},'Here Are All Products'))
    } catch (error) {
        throw new ApiError(500,error.message)
    }
})
const addProductReviews=asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
            if (alreadyReviewed) {
                throw new ApiError(400,"Product Already Reviewed")
            }
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user:req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
            await product.save()
            res.json(new ApiResponse(201,{product},"Review Added"))
        }
        else{
            throw new ApiError(404,'Product Not Found')
        }
    } catch (error) {
        throw new ApiError(400,error.message)
    }
})
const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4)
        res.json(new ApiResponse(200,{products},"Top Products"))
    } catch (error) {
        throw new ApiError(400,error.message)
    }
})
const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ _id: -1 }).limit(5)
        res.json(new ApiResponse(200,{products},"New Products"))
    } catch (error) {
        throw new ApiError(400,error.message)
    }
})
export {addProduct,updateProductDetails,removeProduct,fetchProducts,fetchAllProducts,fetchProductById,addProductReviews,fetchTopProducts,fetchNewProducts}