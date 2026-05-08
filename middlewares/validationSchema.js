const { body } = require("express-validator");

const validationSchema = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("Title is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Title must be between 2 and 100 characters"),
        body("price")
            .notEmpty()
            .withMessage("Price is required")
            .isNumeric()
            .withMessage("Price must be a number"),
    ];
};

module.exports = validationSchema;