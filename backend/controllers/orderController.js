import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import Stripe from "stripe";
//global variables
const currency="inr";
const delivery_fee=10;

// gateway initializie
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing orders using COD method
const placeOrder = async (req, res)=> {
try {
    const {items, amount, address} = req.body;
    const userId = req.userId;
    console.log("Placing order for userId:", userId);
    console.log("Order items:", items);
const orderData={
    userId,
    items,
    address,
    amount,
    paymentMethod:"COD",
    payment:false,
    date: Date.now()

}
const newOrder = new orderModel(orderData)
await newOrder.save()
console.log("Order saved successfully");

await userModel.findByIdAndUpdate(userId, {cartData:{}})
console.log("Cart cleared for user");
res.json({success:true, message:"Order Placed"})




} catch (error) {
   console.log(error)
   res.json({success:false, message:error.message}) 
}
}

//placing orders using stripe method 
const placeOrderStripe = async (req, res)=> {
  try {
    const {items, amount, address}= req.body;
    const userId = req.userId;
    const {origin}= req.headers;
    const orderData={
         userId,
    items,
    address,
    amount,
    paymentMethod:"Stripe",
    payment:false,
    date: Date.now()
    }
    const newOrder = new orderModel(orderData)
await newOrder.save()

const line_items = items.map((item)=>({
price_data:{
    currency:currency,
    product_data:{
        name:item.name
    },
    
    unit_amount: item.price * 100,
  },

quantity:item.quantity,
}))
line_items.push({
  price_data:{
    currency:currency,
    product_data:{
        name: "Delivery Charges"
    },
    
    unit_amount: delivery_fee * 100,
  },

quantity:1,
})

const session = await stripe.checkout.sessions.create({
    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode:"payment",
})
res.json({success:true, session_url:session.url})
}
  catch (error) {
    console.log(error)
   res.json({success:false, message:error.message}) 
  }  
}

//Verification of Stripe
const verifyStripe = async (req, res)=> {
    const {orderId, success}= req.body;
    const userId = req.userId;
    try {
        console.log("Verifying Stripe payment - orderId:", orderId, "success:", success, "userId:", userId);
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            console.log("Payment verified and order updated");
            res.json({success:true, message:"Payment Successful"})
        } else{
            await orderModel.findByIdAndDelete(orderId)
            console.log("Payment failed, order deleted");
            res.json({success:false, message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
   res.json({success:false, message:error.message}) 
    }
}



//placing orders using razorpay method
const placeOrderRazorpay = async (req, res)=> {
    
}


//All orders data fior admin panel
const allOrders = async (req, res)=> {
 
    try {
        const orders= await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }








}


//User data for frontend
const userOrders = async (req, res)=> {
  try {
    // Handle both string and object formats for userId
    let userId = req.userId;
    if (typeof userId === 'object' && userId.Id) {
      userId = userId.Id;
    }
    console.log("Fetching orders for userId:", userId);
    const orders= await orderModel.find({userId})
    console.log("Orders found:", orders);
    res.json({success:true, orders})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }  
}

//Update order status from admin panel
const updateStatus = async (req, res)=> {
    try { 
        const {orderId, status} = req.body;
        console.log("Updating order:", orderId, "to status:", status);
        await orderModel.findByIdAndUpdate(orderId, {status})
        console.log("Order updated successfully");
        res.json({success:true, message:"Order status updated"})
    } catch (error) { 
        console.log(error)  
        res.json({success:false, message:error.message})
    }
}
export {verifyStripe ,placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus}