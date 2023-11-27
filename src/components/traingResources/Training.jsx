import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Header = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md sticky top-0 z-50">
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
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <div className="flex flex-col items-center mb-4">
        <span className="my-2">
          <Link
            to="/privacy-policy"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Privacy Policy
          </Link>
        </span>
        <span className="my-2">
          <Link
            to="/terms-of-service"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Terms of Service
          </Link>
        </span>
        <span className="my-2">
          <Link
            to="/cookie-policy"
            className="hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Cookie Policy
          </Link>
        </span>
      </div>
      <div className="mt-4 text-sm opacity-75">
        <p className="mb-2 sm:mb-0">Tech ACEpert © All rights reserved</p>
        <p className="mb-2 sm:mb-0">Designed by shahariaz.info@gmail.com</p>
      </div>
    </footer>
  );
};

const PostDetailPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/admins/postdata"
        );
        setPosts(response.data.post);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 post-detail-page p-4 sm:p-8">
        {posts.map((post) => (
          <div key={post._id}>
            {post.content.map((htmlContent, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;
