const appError = require("../utils/appError");

module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const error = appError.create("you are unauthorized", 403);
            return next(error);
        }
        next();
    }
};