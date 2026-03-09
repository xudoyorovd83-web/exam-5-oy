const CustomErrorhandler = require("../error/custom-error-handler");

module.exports = function (err, req, res, next) {
    if (err instanceof CustomErrorhandler) {
        return res
            .status(err.status || 400)
            .json({ massage: err.massage, errors: err.errors })
    }
    if (err.name === "ValidationError") {
        const validationErrors = Object.valeues(err.errors).map(
            (error) => error.massage)
        res.status(400).json({
            massageName: "ValidationError",
            errors: validationErrors,
        });
    }
    return res.status(500).json({ massage: err.massage })

}