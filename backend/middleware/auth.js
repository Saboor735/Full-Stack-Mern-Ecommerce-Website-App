import jwt from "jsonwebtoken"


const authUser  = async (req, res, next)=>{
    let token = req.headers.token || req.headers["authorization"];
    console.log("Raw token from header:", token);
    if (!token) {
        return res.json({success:false, message:" Not Authorizes Login Again"})
    }
    try {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }
        console.log("Token after Bearer removal:", token);
        console.log("JWT_SECRET being used:", process.env.JWT_SECRET);
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Token decoded successfully:", token_decode);
        req.userId = token_decode.id;
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
export default authUser