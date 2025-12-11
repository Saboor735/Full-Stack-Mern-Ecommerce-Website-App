// import userModel from "../models/userModel.js"


// // add products o user cart
// const addToCart  = async (req, res)=>{
// try {
//     const{itemId, size}= req.body
//     const userId = req.userId;
//     const userData = await userModel.findById(userId)
//     let cartData = await userData.cartData;
//     if (cartData[itemId]) {
//         if (cartData[itemId][size]) {
//             cartData[itemId][size] += 1
//         }
//         else{
//             cartData[itemId][size]=1
//         }
//     } else{
//         cartData[itemId]={}
//         cartData[itemId][size]=1
//     }

// await userModel.findByIdAndUpdate(userId, {cartData})
// res.json({success: true, message:"Added To Cart"})

// } catch (error) {
//     console.log(error)
//     res.json({success:false, message:error.message})
// }
// }




// // update user cart
// const updateCart  = async (req, res)=>{
// try {
//     const { itemId, size, quantity}= req.body
//     const userId = req.userId;
//     const userData = await userModel.findById(req.userId)
//     let cartData = userData.cartData || {};;
   
// cartData[itemId][size] = quantity;

// await userModel.findByIdAndUpdate (req.userId, {cartData});
// res.json({success: true, message:"Cart Updated"});

// } catch (error) {
//      console.log(error)
//     res.json({success:false, message:error.message})
// }

// }


// // get user cart data
// const getUserCart  = async (req,res)=>{
// try {
//     // const {userId}= req.body
//     const userData = await userModel.findById(req.userId)
//     const cartData = userData.cartData || {};
//     res.json({success: true, cartData})
// } catch (error) {
//     console.log(error)
//     res.json({success:false, message:error.message})
// }
// }

// export {addToCart, updateCart, getUserCart}

import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = 0;

    cartData[itemId][size] += 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    res.json({ success: true, cartData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
