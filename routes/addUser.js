const express = require("express");
const authenticate = require("../authenticate");
const inputFilter = require("../inputFilter");
const { error, allModels } = require("../config");
const { user } = allModels;
const router = express.Router();
const { hash } = require("bcrypt");

router.post("/add-user", authenticate, async (req, res, next) => {
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
        if (queryResult) {
            error("username", "account already exists", next);
            return false;
        }
        const hashedPassword = await hash(reqBody.password, 10);
        await user.create({
            data: {
                username: reqBody.username,
                password: hashedPassword,
            },
        });
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        error("database", "error", next, 500);
    }
});
module.exports = router;
