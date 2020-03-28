const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const Notes = require("../schemas/NotesSchema");

// CREATE NOTE
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(422).json({ msg: "Information not accepted" });
  }
  try {
    let note = new Notes({
      title,
      content,
      user: req.user._id
    });

    await note.save();

    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "server error" });
  }
});

// GET NOTES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id });

    res.json(notes);
  } catch (error) {
    res.status(401).json({ msg: "server error" });
  }
});

// EDIT NOTE
router.put("/:id", authMiddleware, async (req, res) => {
  // Get new title and content
  const { title, content } = req.body;

  // create new note
  const notesField = {};

  if (title) {
    notesField.title = title;
  }

  if (content) {
    notesField.content = content;
  }

  try {
    // find note by id sent
    let note = await Notes.findById(req.params.id);

    // check if there is a note
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // if the user attached to the note is not the same as the user logged in, user is not authorized
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: notesField
      },
      {
        new: true
      }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(401).json({ msg: "error" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Notes.findByIdAndRemove(req.params.id);
    return res.status(201).json({ msg: "successfully deleted" });
  } catch (error) {}
});

module.exports = router;
