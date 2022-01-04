const express = require("express");
const inputFilter = require("../inputFilter");
const { error, allModels } = require("../config");
const { refresh_tokens } = allModels;
const router = express.Router();
const { sign, verify } = require("jsonwebtoken");

router.post("/refresh-token", async (req, res, next) => {
    try {
        inputFilter({ refreshToken: "string" }, {}, req.body);
    } catch (e) {
        error(e.key, e.message, next, 400);
        return;
    }
    let payLoad;
    try {
        payLoad = verify(req.body.refreshToken, process.env.REFRESH_KEY);
    } catch (e) {
        error("refreshToken", "Invalid or Expired Refresh Token", next, 401);
        return;
    }
    const { refreshToken } = req.body;
    try {
        const queryResult = await refresh_tokens.findFirst({
            where: { refresh_token: refreshToken },
            select: { username: true },
        });
        if (!queryResult) {
            error(
                "refreshToken",
                "you have been revoked access, please login again",
                next
            );
            return false;
        }
        const accessToken = sign(
            { username: queryResult.username },
            process.env.ACCESS_KEY,
            {
                expiresIn: "10h",
            }
        );
        res.json({ accessToken });
    } catch (e) {
        console.log(e);
        error("database", "error", next, 500);
    }
});
module.exports = router;
