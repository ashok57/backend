const Note = require("../schema/noteSchema");

// Get all notes
const notesList = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

// Get single note
const noteDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id).populate(
      "createdBy",
      "name email role",
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: error.message,
    });
  }
};

// Create note - ADMIN only
const createNote = async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      isPublished,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error.message,
    });
  }
};

// Update note - ADMIN only
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPublished } = req.body;

    const note = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
        isPublished,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message,
    });
  }
};

// Delete note - ADMIN only
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};

module.exports = {
  notesList,
  noteDetails,
  createNote,
  updateNote,
  deleteNote,
};
