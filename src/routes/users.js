const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../schemas/UserScemha");

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let user = await User.findOne({ email });
    // let newUsername = await User.findOne({ username });

    if (user) {
      return res.status(401).json({ msg: "user exists" });
    }

    user = new User({
      email,
      username,
      password
    });

    const salt = await bcrypt.genSaltSync(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Successfully signed up, please login
    return res.status(201).json({ msg: "Signed up" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "user already exists" });
  }
});

module.exports = router;
