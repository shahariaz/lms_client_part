import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Header = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-16 h-auto" />
          </Link>
        </div>
        <div className="text-white font-bold text-xl flex items-center space-x-4">
          <Link to="/" className="text-lg animate-pulse">
            Welcome to Tech ACEpert
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact Us
          </Link>
        </div>
        {/* You can add more elements or links on the right if needed */}
      </div>
    </nav>
  );
};

export default Header;
