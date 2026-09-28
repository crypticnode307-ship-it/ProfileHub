import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export function authUser(req, res, next) {
    const authHeaders = req.headers.authorization;
    
    if(!authHeaders) {
        return res.status(401).json({
            message: "Access token required"
        });
    }
    const [scheme, token] = authHeaders.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({message: "Invalid authorization header"});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(e) {
        return res.status(401).json({message: "Invalid token"});
    }

}