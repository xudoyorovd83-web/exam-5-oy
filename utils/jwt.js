const jwt = require("jsonwebtoken");

const access_token = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" }); // 15 minut
};

const refresh_token = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: "60d" }); // 60 kun
};

module.exports = {
    access_token,
    refresh_token
};