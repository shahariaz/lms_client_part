import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { motion } from "framer-motion";

const TeacherHome = () => {
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get("/api/teacher");
        setTeacherName(response.data.name);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen"
    >
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
          Welcome, {teacherName}!
        </h2>
        <Link to="/homework">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white p-6 rounded-md"
          >
            See Student Homework
          </motion.button>
        </Link>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default TeacherHome;
