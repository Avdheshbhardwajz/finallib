const Book = require("../models/book.model");
const logger = require("../utils/logger");

exports.createBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    const book = new Book({ title, author, createdBy: req.user._id });
    await book.save();
    logger.info(`Book titled "${title}" created by ${req.user.username}`);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBooks = async (req, res) => {
  const { old, new: recent } = req.query;
  let query = { createdBy: req.user._id };

  if (req.user.roles.includes("VIEW_ALL")) {
    query = {};
  }

  if (old) {
    query.createdAt = { $lt: new Date(Date.now() - 10 * 60 * 1000) };
  } else if (recent) {
    query.createdAt = { $gt: new Date(Date.now() - 10 * 60 * 1000) };
  }

  try {
    const books = await Book.find(query);
    logger.info(`Books fetched by ${req.user.username}`);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    await book.remove();
    logger.info(`Book titled "${book.title}" deleted by ${req.user.username}`);
    res.json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
