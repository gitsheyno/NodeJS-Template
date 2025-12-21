require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log("Auth Header: " + authHeader); // Bearer token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoced) => {
    if (err) return res.sendStatus(403);
    req.user = decoced.username;
    next();
  });
};

module.exports = verifyJWT;
