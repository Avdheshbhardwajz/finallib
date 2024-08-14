import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Library App</div>
        <div>
          <Link
            to="/"
            className="text-white px-4 py-2 hover:bg-gray-700 rounded"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="text-white px-4 py-2 hover:bg-gray-700 rounded"
          >
            Books
          </Link>
          <Link
            to="/add-book"
            className="text-white px-4 py-2 hover:bg-gray-700 rounded"
          >
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
