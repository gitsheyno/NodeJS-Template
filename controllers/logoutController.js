const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //On client also delte the accessToken
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204); // Not Content
  const refreshToken = cookie.jwt;
  //Is refresh token in DB?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }

  // Delete refresh token in DB
  const otherUsers = usersDB.users.filter(
    (user) => user.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
