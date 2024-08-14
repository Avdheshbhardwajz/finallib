import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
  },
});

export const { setBooks, addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;
