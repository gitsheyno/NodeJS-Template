const allowedOrigins = require("./allowedOrigins");

const coreObj = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("not allowed"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = coreObj;
