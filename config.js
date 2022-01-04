const error = (key, message, next, status = 400) => {
    const myError = { status };
    myError[key] = message;
    next(new Error(JSON.stringify(myError)));
};
const { PrismaClient } = require("@prisma/client");

const allModels = new PrismaClient();
module.exports = {
    error,
    allModels,
};
