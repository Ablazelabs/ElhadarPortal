const { verify } = require("jsonwebtoken");
const { error } = require("./config");
module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        error("accessToken", "was not sent", next, 401);
        return;
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    let payLoad;
    try {
        payLoad = verify(accessToken, process.env.ACCESS_KEY);
    } catch (e) {
        error("accessToken", "Invalid or Expired Access Token", next, 401);
        return;
    }
    res.locals.username = payLoad.username;
    next();
};
