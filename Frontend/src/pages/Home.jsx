import React from "react";
import Navbar from "../components/Navbar"; // Adjust the path as necessary
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Library App</h1>
        <p className="mb-4">
          Manage your books and explore the library with ease.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/books"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Books
          </Link>
          <Link
            to="/add-book"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add a Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
