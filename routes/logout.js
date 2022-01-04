const express = require("express");
const inputFilter = require("../inputFilter");
const { error, allModels } = require("../config");
const { refresh_tokens } = allModels;
const router = express.Router();

router.post("/logout", async (req, res, next) => {
    try {
        inputFilter({ refreshToken: "string" }, {}, req.body);
    } catch (e) {
        error(e.key, e.message, next, 400);
        return;
    }
    try {
        await refresh_tokens.delete({
            where: { refresh_token: req.body.refreshToken },
        });
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});
module.exports = router;
