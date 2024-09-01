import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path";
const app = express()
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'
import productRoutes from "./routes/product.routes.js"
import uploadRoutes from "./routes/upload.routes.js"

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/upload",uploadRoutes)

const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname + "/upload"))); 

export{app}