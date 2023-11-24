// src/components/createCourse/CourseForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledCreateCourse = styled.div`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #4caf50;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const StyledSection = styled.div`
  margin-bottom: 20px;
`;

const CourseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    courseDetails: "",
    lessons: [{ title: "", videoURL: "" }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLessons = [...formData.lessons];
    updatedLessons[index][name] = value;

    setFormData({
      ...formData,
      lessons: updatedLessons,
    });
  };

  const handleAddLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: "", videoURL: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend API to create a course
      // Use the gathered data: courseName, courseDetails, lessons
      await axios.post(
        "http://localhost:7000/api/v1/admins/create-teacher-account",
        {
          ...formData,
        }
      );

      // Handle success (show a toast or navigate to a different page)
      toast.success("Course created successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Error creating course. Please try again.");
    }
  };

  return (
    <StyledCreateCourse>
      <h2>Create Course</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledSection>
          <StyledLabel>Course Name:</StyledLabel>
          <StyledInput
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
        </StyledSection>

        <StyledSection>
          <StyledLabel>Course Details:</StyledLabel>
          <StyledInput
            type="text"
            name="courseDetails"
            value={formData.courseDetails}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
        </StyledSection>

        <StyledSection>
          <StyledLabel>Lessons:</StyledLabel>
          {formData.lessons.map((lesson, index) => (
            <div key={index}>
              <StyledLabel>Lesson {index + 1} Title:</StyledLabel>
              <StyledInput
                type="text"
                name="title"
                value={lesson.title}
                onChange={(e) => handleChange(e, index)}
                required
              />

              <StyledLabel>Lesson {index + 1} Video URL:</StyledLabel>
              <StyledInput
                type="text"
                name="videoURL"
                value={lesson.videoURL}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
          ))}
          <StyledButton type="button" onClick={handleAddLesson}>
            Add Lesson
          </StyledButton>
        </StyledSection>

        <StyledButton type="submit">Create Course</StyledButton>
      </StyledForm>
    </StyledCreateCourse>
  );
};

export default CourseForm;
