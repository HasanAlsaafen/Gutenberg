import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 px-4 md:px-16 lg:px-28 py-8">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section aria-labelledby="footer-about">
                    <h2 id="footer-about" className="text-lg font-bold mb-4 text-white">About Us</h2>
                    <p className="text-gray-300">Trusted Systems Company for Information Technology</p>
                </section>

                <nav aria-labelledby="footer-links">
                    <h2 id="footer-links" className="text-lg font-bold mb-4 text-white">Quick Links</h2>
                    <ul className="text-gray-300 space-y-2">
                        <li><a href="/home" className="hover:underline">Home</a></li>
                        <li><a href="/services" className="hover:underline">Services</a></li>
                        <li><a href="/content" className="hover:underline">Content</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                    </ul>
                </nav>

                <section aria-labelledby="footer-social">
                    <h2 id="footer-social" className="text-lg font-bold mb-4 text-white">Follow Us</h2>
                    <ul className="flex space-x-6 text-gray-300">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline">
                                <FaFacebookF className="text-blue-500" />
                                <span>Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline" >
                                <FaTwitter className="text-sky-500" />
                                <span>Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline" >
                                <FaInstagram className="text-orange-500" />
                                <span>Instagram</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </section>

            <section className="border-t border-gray-600 pt-6 text-gray-300 text-center mt-6">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="font-medium">Trusted Systems Company for Information Technology</span>
                </p>
            </section>
        </footer>
    );
};

export default Footer;


