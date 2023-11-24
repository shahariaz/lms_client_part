// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <div className="flex justify-center mb-4">
        <span className="mx-4">
          <a
            href="/privacy-policy"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Privacy Policy
          </a>
        </span>
        <span className="mx-4">
          <a
            href="/terms-of-service"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Terms of Service
          </a>
        </span>
        <span className="mx-4">
          <a
            href="/cookie-policy"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Cookie Policy
          </a>
        </span>
      </div>
      <div className="mt-4 text-sm opacity-75">
        <p className="animate-bounce">Tech ACEpert © All rights reserved</p>
        <p className="animate-bounce">Designed by shahariaz.info@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
