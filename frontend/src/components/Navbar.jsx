import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "react-feather";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Form Builder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/create-form" className="text-gray-700 hover:text-blue-500 transition">
              Create Form
            </Link>
            <Link to="/view-responses" className="text-gray-700 hover:text-blue-500 transition">
              View Responses
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-500 transition">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 pb-4">
            <Link to="/create-form" className="block text-gray-700 hover:text-blue-500 transition">
              Create Form
            </Link>
            <Link to="/view-responses" className="block text-gray-700 hover:text-blue-500 transition">
              View Responses
            </Link>
            <Link to="/admin" className="block text-gray-700 hover:text-blue-500 transition">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
