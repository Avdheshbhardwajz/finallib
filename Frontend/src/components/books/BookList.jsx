import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios"; // Updated import path
import { setBooks } from "../../redux/bookSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        dispatch(setBooks(response.data));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, [dispatch]);

  return (
    <div>
      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{/* Add Edit and Delete buttons if needed */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
