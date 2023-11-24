import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const Forget = () => {
  // Apply styles to hide the scrollbar
  const bodyStyles = {
    overflowY: "hidden",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex-grow flex items-center justify-center bg-gray-900"
        style={bodyStyles}
      >
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-200">
            Forget Password
          </h2>
          <p className="text-gray-300 mb-4 text-center">
            Forgotten your password? Let's fix that! Reach out to our support
            team at{" "}
            <a href="mailto:support@xxxxx.com" className="text-blue-400">
              support@xxxxx.com
            </a>{" "}
            using your registered email.
          </p>
          <div className="mt-6 text-center">
            <Link to="/">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
                type="button"
              >
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forget;
