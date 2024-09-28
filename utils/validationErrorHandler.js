// Helper function to handle validation errors

const { validationResult } = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array().map(((msg)=>msg.msg)) });
    }
    next();
};

module.exports = handleValidationErrors