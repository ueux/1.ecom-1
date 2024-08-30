import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/category",categoryRoutes)

export{app}