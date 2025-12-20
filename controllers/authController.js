const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;

  if (!user | !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) {
    return res.sendStatus(401);
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //Create JWT
    res.status(200).json({ message: `User ${user} logged in successfully.` });
  } else {
    return res.sendStatus(401).json({ message: "Unauthorized" });
  }
};

module.exports = { handleLogin };
