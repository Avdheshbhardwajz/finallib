import React from "react";
import BookForm from "../components/books/BookForm";
import BookList from "../components/books/BookList";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <BookForm />
      <BookList />
    </div>
  );
};

export default Dashboard;
