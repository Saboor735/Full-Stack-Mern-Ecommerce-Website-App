import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
console.log("Order routes loaded")
const app=express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// middleware
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));
 
// api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order" , orderRoute)
console.log("Mounted /api/order routes")
app.get("/", (req, res)=>{
    res.send("")
})



app.listen(port,()=> console.log("Server started on PORT: " + port))