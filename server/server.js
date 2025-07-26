const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth.js");

// mongoose connection
require("./db.js");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));
app.use("/", authRoute);

// Environment Variables
const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});