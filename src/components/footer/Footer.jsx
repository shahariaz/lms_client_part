// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <div className="flex flex-col items-center mb-4">
        <span className="my-2">
          <a
            href="/privacy-policy"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Privacy Policy
          </a>
        </span>
        <span className="my-2">
          <a
            href="/terms-of-service"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Terms of Service
          </a>
        </span>
        <span className="my-2">
          <a
            href="/cookie-policy"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Cookie Policy
          </a>
        </span>
      </div>
      <div className="mt-4 text-sm opacity-75">
        <p className="mb-2 sm:mb-0">Tech ACEpert © All rights reserved</p>
        <p className="mb-2 sm:mb-0">Designed by shahariaz.info@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
