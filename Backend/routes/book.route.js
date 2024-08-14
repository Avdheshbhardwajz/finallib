const express = require("express");
const {
  createBook,
  getBooks,
  deleteBook,
} = require("../controllers/book.controller");

const { authorize, protect } = require("../middlewares/auth.middleware");

const book = express.Router();

book.use(protect);

book
  .route("/")
  .get(authorize("VIEWER", "VIEW_ALL"), getBooks)
  .post(authorize("CREATOR"), createBook);

book.route("/:id").delete(authorize("CREATOR"), deleteBook);

module.exports = book;
