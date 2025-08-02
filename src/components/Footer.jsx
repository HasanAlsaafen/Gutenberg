import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 px-4 md:px-16 lg:px-28 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">About Us</h2>
          <p className="text-gray-300">
            Gutenberg Company for Information Technology
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Quick Links</h2>
          <ul className="text-gray-300 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Content
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Follow Us</h2>
          <ul className="flex space-x-6 text-gray-300">
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaFacebookF className="text-blue-500" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaTwitter className="text-sky-500" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaInstagram className="text-orange-500" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 pt-6 text-gray-300 text-center mt-6">
        <p>© 2025 Gutenberg Company for Information Technology</p>
      </div>
    </footer>
  );
};

export default Footer;
