const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/AppError");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    
    if(!authHeader) {
        const error = AppError.create('token is required', 401, httpStatusText.ERROR);
        return next(error);
    }
    const token = authHeader.split(" ")[1];

    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = currentUser;
        next();
    } catch (err) {
        const error = AppError.create("expired token", 401, httpStatusText.ERROR);
        return next(error);
      }
}

module.exports = verifyToken;