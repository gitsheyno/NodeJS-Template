require("dotenv").config();

const fs = require("fs");
const path = require("path");
const coreObj = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const { logEvents, logger } = require("./middleware/logEvents");

const cors = require("cors");
const express = require("express");
const app = express();

const verifyJWT = require("./middleware/verifyJWT");
const defineCookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

//Connect to MongoDB
connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(coreObj));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(defineCookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
