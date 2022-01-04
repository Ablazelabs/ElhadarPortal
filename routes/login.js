const express = require("express");
const inputFilter = require("../inputFilter");
const { error, allModels } = require("../config");
const { user, refresh_tokens } = allModels;
const router = express.Router();
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
    let reqBody = {};
    try {
        reqBody = inputFilter(
            {
                username: "string",
                password: "string",
            },
            {},
            req.body,
            4
        );
    } catch (e) {
        error(e.key, e.message, next, 400);
        return;
    }
    try {
        const queryResult = await user.findUnique({
            where: { username: reqBody.username },
            select: { password: true },
        });
        if (!queryResult) {
            error("username", "account doesn't exist", next);
            return false;
        }
        const correctPassword = await compare(
            reqBody.password,
            queryResult.password
        );
        if (!correctPassword) {
            error("password", "Wrong password", next);
            return false;
        }
        const accessToken = sign(
            {
                username: queryResult.username,
            },
            process.env.ACCESS_KEY,
            { expiresIn: "10h" }
        );
        const refreshToken = sign(
            {
                username: queryResult.username,
            },
            process.env.REFRESH_KEY
        );
        await refresh_tokens.create({
            data: {
                refresh_token: refreshToken,
                username: reqBody.username,
            },
        });
        res.json({ accessToken, refreshToken, username: queryResult.username });
    } catch (e) {
        console.log(e);
        error("database", "error", next, 500);
    }
});
module.exports = router;
