const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res, next) => {
    res.send("elhadar registration api is working fine");
});
app.use("/api", require("./routes/customerForm"));

app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/addUser"));

// app.use("/api", require("./routes/customerFormGet"));
app.use("/api", require("./routes/refreshToken"));
app.use("/api", require("./routes/logout"));
app.use("/api", require("./routes/log"));

app.use((err, _req, res, _next) => {
    try {
        let myError = JSON.parse(err.message);
        const status = myError.status;
        myError.status = undefined;
        res.status(status).send({ error: myError });
    } catch (e) {
        res.status(500).send({ error: { database: "error" } });
    }
});
const port = 2222;
module.exports = app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
