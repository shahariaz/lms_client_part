// src/context/CourseContext.js
import React, { createContext, useContext, useReducer } from "react";

const CourseContext = createContext();

const initialState = {
  formData: {
    courseName: "",
    description: "",
    // Add other fields as needed
  },
  currentStep: 1,
  // Add other state properties as needed
};

const courseReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    // Add other cases as needed
    default:
      return state;
  }
};

const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};

const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};

export { CourseProvider, useCourse };
