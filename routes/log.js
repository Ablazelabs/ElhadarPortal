const express = require("express");
const inputFilter = require("../inputFilter");
const { error, allModels } = require("../config");
const router = express.Router();
const fs = require("fs");
router.post("/log", async (req, res, next) => {
    let reqBody = {};
    try {
        reqBody = inputFilter(
            {
                from: "string",
            },
            {},
            req.body,
            1
        );
    } catch (e) {
        error(e.key, e.message, next, 400);
        return;
    }
    try {
        const { from, log } = req.body;
        if (!log) {
            return error("log", "log is necessary", next, 400);
        }

        const writtenLog = `\n${new Date().toString()}\n${JSON.stringify(
            log
        )}\n`;
        console.log(log);
        const filePath = from + ".txt";
        fs.writeFileSync(filePath, writtenLog, { flag: "a" });

        return res.json({ success: true });
    } catch (e) {
        console.log(e);
        error("database", "error", next, 500);
    }
});
router.get("/log", async (req, res, next) => {
    const { from } = req.query;
    console.log(from);
    if (!from) {
        return error("from", "from is required in query parameters", next, 400);
    }
    const filePath = from + ".txt";
    if (fs.existsSync(filePath)) {
        return res.send(fs.readFileSync(filePath));
    } else {
        return res.status(404).json({ file: "no logs found" });
    }
});

router.delete("/log", async (req, res, next) => {
    const from = req.query;
    if (!from) {
        return error("from", "from is required in query parameters", next, 400);
    }
    const filePath = from + ".txt";
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "");
    }
    return res.json({ success: true });
});
module.exports = router;
