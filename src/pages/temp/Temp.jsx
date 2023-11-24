import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(45deg, #001f3f, #003366);
    color: #000; /* Set text color to black */
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#4a90e2"};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: ${(props) => props.marginRight || 0};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#357ae8"};
  }
`;

const CourseForm = () => {
  const [course, setCourse] = useState({
    title: "",
    details: "",
    units: [],
  });

  const navigate = useNavigate();

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleUnitAdd = () => {
    setCourse({
      ...course,
      units: [...course.units, { title: "", details: "", lessons: [] }],
    });
  };

  const handleUnitChange = (e, unitIndex) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => {
      const updatedUnits = [...prevCourse.units];
      updatedUnits[unitIndex][name] = value;
      return { ...prevCourse, units: updatedUnits };
    });
  };

  const handleUnitDelete = (unitIndex) => {
    setCourse((prevCourse) => {
      const updatedUnits = [...prevCourse.units];
      updatedUnits.splice(unitIndex, 1);
      return { ...prevCourse, units: updatedUnits };
    });
  };

  const handleLessonAdd = (unitIndex) => {
    setCourse((prevCourse) => {
      const updatedUnits = [...prevCourse.units];
      updatedUnits[unitIndex].lessons.push({
        title: "",
        details: "",
        videoURL: "",
      });
      return { ...prevCourse, units: updatedUnits };
    });
  };

  const handleLessonChange = (e, unitIndex, lessonIndex) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => {
      const updatedUnits = [...prevCourse.units];
      updatedUnits[unitIndex].lessons[lessonIndex][name] = value;
      return { ...prevCourse, units: updatedUnits };
    });
  };

  const handleLessonDelete = (unitIndex, lessonIndex) => {
    setCourse((prevCourse) => {
      const updatedUnits = [...prevCourse.units];
      updatedUnits[unitIndex].lessons.splice(lessonIndex, 1);
      return { ...prevCourse, units: updatedUnits };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(course);
      const response = await axios.post(
        "http://localhost:7000/api/v1/admins/create-course", // Replace with your actual backend URL
        course
      );

      console.log("Server response:", response.data);

      if (response.data.success) {
        // Redirect to a success page or perform other actions
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting the form:", error.message);
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <>
      <GlobalStyle />
      <FormContainer>
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#000" }}
        >
          Course Form
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Course Title:</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleCourseChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2">Course Details:</label>
          <textarea
            name="details"
            value={course.details}
            onChange={handleCourseChange}
            className="w-full p-2 mb-4 border rounded"
          ></textarea>

          {course.units.map((unit, unitIndex) => (
            <div key={unitIndex} className="mb-4 bg-white rounded p-4 shadow">
              <h3 className="text-xl font-bold mb-2">Unit {unitIndex + 1}</h3>
              <label className="block mb-2">Unit Title:</label>
              <input
                type="text"
                value={unit.title}
                onChange={(e) => handleUnitChange(e, unitIndex)}
                name="title"
                className="w-full p-2 mb-2 border rounded"
              />

              <label className="block mb-2">Unit Details:</label>
              <textarea
                value={unit.details}
                onChange={(e) => handleUnitChange(e, unitIndex)}
                name="details"
                className="w-full p-2 mb-4 border rounded"
              ></textarea>

              <Button
                onClick={() => handleLessonAdd(unitIndex)}
                type="button"
                bgColor="#6bbdff" // Use a light blue color for Unit buttons
                hoverColor="#8cc5ff"
                className="mb-2"
              >
                Add Lesson
              </Button>

              <Button
                onClick={() => handleUnitDelete(unitIndex)}
                type="button"
                bgColor="#e74c3c"
                hoverColor="#ff6666"
                className="mb-2 ml-2"
              >
                Delete Unit
              </Button>

              {unit.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="mb-4 bg-gray-200 rounded p-4 shadow"
                >
                  <h4 className="text-lg font-bold mb-2">
                    Lesson {lessonIndex + 1}
                  </h4>

                  <label className="block mb-2">Lesson Title:</label>
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) =>
                      handleLessonChange(e, unitIndex, lessonIndex)
                    }
                    name="title"
                    className="w-full p-2 mb-2 border rounded"
                  />

                  <label className="block mb-2">Lesson Details:</label>
                  <textarea
                    value={lesson.details}
                    onChange={(e) =>
                      handleLessonChange(e, unitIndex, lessonIndex)
                    }
                    name="details"
                    className="w-full p-2 mb-2 border rounded"
                  ></textarea>

                  <label className="block mb-2">Lesson Video URL:</label>
                  <input
                    type="text"
                    value={lesson.videoURL}
                    onChange={(e) =>
                      handleLessonChange(e, unitIndex, lessonIndex)
                    }
                    name="videoURL"
                    className="w-full p-2 mb-4 border rounded"
                  />

                  <Button
                    onClick={() => handleLessonDelete(unitIndex, lessonIndex)}
                    type="button"
                    bgColor="#e74c3c"
                    hoverColor="#ff6666"
                    className="mb-2 ml-2"
                  >
                    Delete Lesson
                  </Button>
                </div>
              ))}
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={handleUnitAdd}
              type="button"
              bgColor="#6bbdff"
              hoverColor="#8cc5ff"
            >
              Add Unit
            </Button>
            <div>
              <Button
                type="submit"
                bgColor="#4caf50"
                marginRight="10px"
                hoverColor="#45a049"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                bgColor="#e74c3c"
                hoverColor="#ff6666"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default CourseForm;
