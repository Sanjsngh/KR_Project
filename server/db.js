const mongoose = require("mongoose");
const clc = require("cli-color")

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(clc.green.bold("Successfully connected")))
    .catch((err) => console.log(clc.red.bold(err)))