import React, { useState } from "react";
import axios from "../../axios"; // Updated import path
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/bookSlice";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/books", { title, author });
      dispatch(addBook(response.data));
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
