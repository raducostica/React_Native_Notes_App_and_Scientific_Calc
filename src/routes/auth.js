const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("config");

const User = require("../schemas/UserScemha");

const auth = require("../middleware/auth");

// get user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.find(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ msg: "Invalid credentials" });
  }
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    jwt.sign(
      { userId: user._id },
      config.get("jwtSecret"),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) {
          throw err;
        }

        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "server error" });
  }
});

module.exports = router;
