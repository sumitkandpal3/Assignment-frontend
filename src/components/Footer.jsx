import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-400 hover:text-white">
            About
          </Link>
          <Link to="/products" className="text-gray-400 hover:text-white">
            Products
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white">
            Contact
          </Link>
        </div>
        <div className="text-gray-400">
          <p>&copy; 2024 MyStore. All rights reserved.</p>
          <p>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms" className="hover:text-white ml-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
