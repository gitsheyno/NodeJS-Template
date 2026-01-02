const User = require("../model/User");
const handleLogout = async (req, res) => {
  //On client also delte the accessToken
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204); // Not Content
  const refreshToken = cookie.jwt;
  //Is refresh token in DB?
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
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

  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
