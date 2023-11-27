import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../AuthContextApi";

const TeacherHome = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex flex-col items-center justify-center"
      >
        <motion.h2 className="text-3xl font-extrabold mb-4 text-gray-900">
          Welcome, {user ? user.name : "Teacher"}!
        </motion.h2>
        <Link to="/homework">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white p-6 rounded-md"
          >
            See Student Homework
          </motion.button>
        </Link>
      </motion.div>
      <Footer />
    </div>
  );
};

export default TeacherHome;
