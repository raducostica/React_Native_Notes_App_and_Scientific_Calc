const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const Notes = require("../schemas/NotesSchema");

// CREATE NOTE
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(422).json({ msg: "Information not accepted" });
  }
  try {
    let note = new Notes({
      title,
      content,
      userId: req.user.id
    });

    await note.save();

    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "server error" });
  }
});

// GET NOTES
router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    res.status(401).json({ msg: "server error" });
  }
});

module.exports = router;
