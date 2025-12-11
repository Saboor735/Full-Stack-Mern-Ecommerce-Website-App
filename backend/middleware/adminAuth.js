import jwt from "jsonwebtoken"

const adminAuth= async(req, res, next)=>{
    try {
        // Prefer the standard Authorization header; fall back to a custom `token` header only if needed.
        let token = req.headers["authorization"] || req.headers.token;
        // Don't log the full token. Log presence and a masked snippet for debugging.
        const rawTokenForLog = typeof token === 'string' ? token : '';
        const masked = rawTokenForLog
          ? rawTokenForLog.length > 12
            ? `${rawTokenForLog.slice(0,6)}...${rawTokenForLog.slice(-6)}`
            : '<<token-present>>'
          : '<<no-token>>';
        console.log("Admin token header present:", rawTokenForLog ? true : false, "masked:", masked);

        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        if (typeof token === "string" && token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        // Basic format check for JWT: header.payload.signature (3 parts) when token is a JWT string.
        if (typeof token === 'string' && token.includes('.')) {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return res.json({ success: false, message: "Invalid token format" });
            }
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Log only the non-sensitive claims we need for debugging.
        if (token_decode && typeof token_decode === 'object') {
            const safeDecode = {
                email: token_decode.email,
                isAdmin: token_decode.isAdmin,
                iat: token_decode.iat,
                exp: token_decode.exp,
            };
            console.log("Admin token decoded:", safeDecode);
        } else {
            console.log("Admin token decoded: (legacy/primitive token)");
        }
        // Support both new structured tokens and legacy string tokens.
        if (typeof token_decode === 'string') {
            // legacy token was created as jwt.sign(email+password, ...)
            if (token_decode !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)) {
                return res.json({success:false, message:"Not Authorized Login Again"})
            }
        } else {
            // token_decode should be an object with email and isAdmin
            if (!token_decode || token_decode.email !== process.env.ADMIN_EMAIL || token_decode.isAdmin !== true) {
                return res.json({success:false, message:"Not Authorized Login Again"})
            }
        }
        next()
    } catch (error) {
        console.log("adminAuth error:", error)
        return res.json({success:false, message: error.message})
    }
}
export default adminAuth
