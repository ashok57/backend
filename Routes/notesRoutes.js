const express = require("express");

const {
  notesList,
  noteDetails,
  createNote,
  updateNote,
  deleteNote,
} = require("../Controller/notesControllers");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/notes", authMiddleware, notesList);

router.get("/note/:id", authMiddleware, noteDetails);

// ADMIN ONLY
router.post(
  "/notes",
  authMiddleware,
  adminMiddleware,
  createNote
);

router.put(
  "/note/:id",
  authMiddleware,
  adminMiddleware,
  updateNote
);

router.delete(
  "/note/:id",
  authMiddleware,
  adminMiddleware,
  deleteNote
);

module.exports = router;