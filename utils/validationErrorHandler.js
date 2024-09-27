// Helper function to handle validation errors

const { validationResult } = require("express-validator");
const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    return null;
};

module.exports = handleValidationErrors