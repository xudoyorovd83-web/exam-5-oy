const jwt = require("jsonwebtoken");
const { access_token } = require("../utils/jwt");
const CustomErrorhandler = require("../error/custom-error-handler");

const refreshTokenController = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            throw CustomErrorhandler.UnAuthorizet("Refresh token is not defined");
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    
        const accessToken = access_token({
            id: decode.id,
            role: decode.role,
            email: decode.email
        });

        res.status(200).json({ accessToken });

    } catch (error) {
        next(error);
    }
};

module.exports = refreshTokenController;