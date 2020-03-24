const mongoose = require("mongoose");
const express = require("express");
const authMiddleware = require("../middleware/auth");

const Track = require("../schemas/TrackSchema");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/", authMiddleware, async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ error: "Invalid" });
  }

  try {
    const track = new Track({
      name,
      locations,
      userId: req.user.id
    });

    await track.save();

    res.send(track);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

module.exports = router;
