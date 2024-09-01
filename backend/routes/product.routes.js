import express from "express";
import { onlyForAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { addProduct, addProductReviews, fetchAllProducts, fetchNewProducts, fetchProductById, fetchProducts, fetchTopProducts, removeProduct, updateProductDetails } from "../controllers/product.controller.js";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";

const router = express.Router()

router.route("/").post(verifyJWT, onlyForAdmin, formidable(), addProduct).get(fetchProducts)
router.route("/allproducts").get(fetchAllProducts)
router.route("/top").get(fetchTopProducts)
router.route("/new").get(fetchNewProducts)
router.route("/:id").put(verifyJWT,onlyForAdmin,formidable(),updateProductDetails).delete(verifyJWT,onlyForAdmin,removeProduct).get(fetchProductById)
router.route("/:id/reviews").post(verifyJWT,checkId,addProductReviews)
export default router