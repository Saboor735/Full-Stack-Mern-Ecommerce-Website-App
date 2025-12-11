import express from "express"
import {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRoute = express.Router()

//Admin Features
orderRoute.post("/list", adminAuth, allOrders)
orderRoute.post("/status", adminAuth, updateStatus)


//Payment Features
orderRoute.post("/place", authUser, placeOrder)
console.log("Order route POST /place is registered")
orderRoute.post("/stripe", authUser, placeOrderStripe)
orderRoute.post("/razorpay", authUser, placeOrderRazorpay)

//verify stripe payment route
orderRoute.post("/verifystripe", authUser, verifyStripe)

//UserFeatures
orderRoute.post("/userorders", authUser, userOrders)

export default orderRoute
