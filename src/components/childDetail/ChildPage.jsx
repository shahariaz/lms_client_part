// ChildrenList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header"; // Import your Header component
import Footer from "../footer/Footer"; // Import your Footer component

const ChildrenList = () => {
  const [childrenData, setChildrenData] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childDetails, setChildDetails] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API using axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/parent/65614fc44ff2471ca31f5877"
        );

        // Destructure the data property from the response
        const { data } = response;

        if (response.status === 200) {
          setChildrenData(data.data.children);
        } else {
          console.error("Failed to fetch data from the backend");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  // Function to toggle selected child and fetch additional details
  const toggleChild = async (child) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/v1/parent/65614fc44ff2471ca31f5877`
      );

      if (response.status === 200) {
        setChildDetails(response.data.childDetails);
      } else {
        console.error("Failed to fetch child details from the backend");
        // Set some default details if the child details are not available
        setChildDetails({
          teacherName: "No teacher assigned",
          liveClass: {
            date: "No upcoming live class",
            time: "",
            link: "",
          },
          currentModule: "No module information",
          description: "No description available",
        });
      }

      setSelectedChild((prevSelectedChild) =>
        prevSelectedChild === child ? null : child
      );
    } catch (error) {
      console.error("Error fetching child details:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto my-8 flex-grow">
        <h1 className="text-2xl font-semibold mb-4">
          Click to show child details
        </h1>
        {childrenData.map((child) => (
          <div
            key={child._id}
            className="bg-white p-4 mb-4 rounded-md shadow-md cursor-pointer"
            onClick={() => toggleChild(child)}
          >
            <h2 className="text-lg font-semibold mb-2">{child.name}</h2>
            {/* Show more details if the child is selected */}
            {selectedChild === child && childDetails && (
              <div>
                <p>Your Child's Details</p>
                <p>Child's Name: {child.name}</p>
                <p>Teacher's Name: {childDetails.teacherName}</p>
                <p>Next Monthly Live Class:</p>
                <p>Date: {childDetails.liveClass.date}</p>
                <p>Time: {childDetails.liveClass.time}</p>
                <p>Link: {childDetails.liveClass.link}</p>
                <p>Current Module: {childDetails.currentModule}</p>
                <p>Description: {childDetails.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChildrenList;
