const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header('Authorization')?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                status: 401,
                message: "authorization denied"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }
    catch(err) {
        res.status(401).json({ 
            message: 'Authorization failed. Please log in again'}
        );
    }

}

module.exports = authMiddleware;