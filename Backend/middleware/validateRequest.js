
export const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // validate body
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.errors.map((err) => err.message),
        });
    }
};
