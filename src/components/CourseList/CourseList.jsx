// components/CourseList.js

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../../CourseContextApi";
const CourseList = () => {
  const { courses, updateCourses } = useCourseContext();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/all-courses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        updateCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    if (courses.length === 0) {
      fetchCourses();
    }
  }, [courses, updateCourses]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Link to={`/courses/${course._id}`} className="btn">
              Enter Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
