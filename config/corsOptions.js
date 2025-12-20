const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
];

const coreObj = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('not allowed'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = coreObj;
