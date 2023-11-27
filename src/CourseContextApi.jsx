// Create a new file for the context
// context/CourseContext.js

import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const useCourseContext = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const updateCourses = (newCourses) => {
    setCourses(newCourses);
  };

  return (
    <CourseContext.Provider value={{ courses, updateCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
