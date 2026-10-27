import jsonwebtoken from "jsonwebtoken"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function AuthMiddleware (req,res,next){
    const token = req.header('Authorization')
    if (!token){
        return res.status(401).json({"Error" : "No token provided"})
    }
    try {
        req.user = jsonwebtoken.verify(token, process.env.JWT_KEY) // e.g. { username }
        req.body.user = req.user
        next()
    } catch {
        return res.status(403).json({"Error" : "Invalid or expired token"})
    }
}
