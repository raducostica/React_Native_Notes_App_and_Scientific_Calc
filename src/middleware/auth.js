const jwt = require("jsonwebtoken");

const User = require("../schemas/UserScemha");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "You must be logged in" });
  }

  // authorization === "Bearer token"
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "jwtSecret", async (err, payload) => {
    if (err) {
      return res.status(401).json({ msg: "You must be logged in" });
    }

    console.log(payload);

    const { userId } = payload;

    const person = await User.findById(userId);

    req.user = person;
    next();
  });
};
