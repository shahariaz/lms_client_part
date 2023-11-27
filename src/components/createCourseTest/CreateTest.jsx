// CreateCourse.js
import React, { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    sections: [
      {
        name: "",
        units: [
          {
            name: "",
            id: "",
            lessons: [{ title: "", content: "", type: "" }],
          },
        ],
      },
    ],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e, sectionIndex, unitIndex, lessonIndex) => {
    const { name, value } = e.target;

    if (typeof lessonIndex !== "undefined") {
      // Update lesson data
      const updatedSections = [...courseData.sections];
      updatedSections[sectionIndex].units[unitIndex].lessons[lessonIndex][
        name
      ] = value;
      setCourseData({ ...courseData, sections: updatedSections });
    } else if (typeof unitIndex !== "undefined") {
      // Update unit data
      const updatedSections = [...courseData.sections];
      updatedSections[sectionIndex].units[unitIndex][name] = value;
      setCourseData({ ...courseData, sections: updatedSections });
    } else if (typeof sectionIndex !== "undefined") {
      // Update section data
      const updatedSections = [...courseData.sections];
      updatedSections[sectionIndex][name] = value;
      setCourseData({ ...courseData, sections: updatedSections });
    } else {
      // Update course name
      setCourseData({ ...courseData, [name]: value });
    }
  };

  const handleAddSection = () => {
    setCourseData({
      ...courseData,
      sections: [
        ...courseData.sections,
        {
          name: "",
          units: [
            {
              name: "",
              id: "",
              lessons: [{ title: "", content: "", type: "" }],
            },
          ],
        },
      ],
    });
  };

  const handleAddUnit = (sectionIndex) => {
    const updatedSections = [...courseData.sections];
    updatedSections[sectionIndex].units.push({
      name: "",
      id: "",
      lessons: [{ title: "", content: "", type: "" }],
    });
    setCourseData({ ...courseData, sections: updatedSections });
  };

  const handleAddLesson = (sectionIndex, unitIndex) => {
    const updatedSections = [...courseData.sections];
    updatedSections[sectionIndex].units[unitIndex].lessons.push({
      title: "",
      content: "",
      type: "",
    });
    setCourseData({ ...courseData, sections: updatedSections });
  };

  const handleDeleteSection = (sectionIndex) => {
    const updatedSections = [...courseData.sections];
    updatedSections.splice(sectionIndex, 1);
    setCourseData({ ...courseData, sections: updatedSections });
  };

  const handleDeleteUnit = (sectionIndex, unitIndex) => {
    const updatedSections = [...courseData.sections];
    updatedSections[sectionIndex].units.splice(unitIndex, 1);
    setCourseData({ ...courseData, sections: updatedSections });
  };

  const handleDeleteLesson = (sectionIndex, unitIndex, lessonIndex) => {
    const updatedSections = [...courseData.sections];
    updatedSections[sectionIndex].units[unitIndex].lessons.splice(
      lessonIndex,
      1
    );
    setCourseData({ ...courseData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/courses",
        courseData
      );
      setSuccessMessage("Course created successfully!");
      setErrorMessage("");
      console.log("Response:", response.data);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error creating course. Please try again.");
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Create Course</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <label className="block mb-2">
          Course Name:
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border rounded"
          />
        </label>

        {courseData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border p-4 mb-4 rounded">
            <label className="block mb-2">
              Section Name:
              <input
                type="text"
                name="name"
                value={section.name}
                onChange={(e) => handleInputChange(e, sectionIndex)}
                className="w-full p-2 border rounded"
              />
            </label>

            {section.units.map((unit, unitIndex) => (
              <div key={unitIndex} className="border p-4 mb-4 rounded">
                <label className="block mb-2">
                  Unit Name:
                  <input
                    type="text"
                    name="name"
                    value={unit.name}
                    onChange={(e) =>
                      handleInputChange(e, sectionIndex, unitIndex)
                    }
                    className="w-full p-2 border rounded"
                  />
                </label>

                {unit.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="border p-4 mb-4 rounded">
                    <label className="block mb-2">
                      Lesson Title:
                      <input
                        type="text"
                        name="title"
                        value={lesson.title}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            sectionIndex,
                            unitIndex,
                            lessonIndex
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </label>

                    <label className="block mb-2">
                      Lesson Content:
                      <textarea
                        name="content"
                        value={lesson.content}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            sectionIndex,
                            unitIndex,
                            lessonIndex
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </label>

                    <label className="block mb-2">
                      Lesson Type:
                      <input
                        type="text"
                        name="type"
                        value={lesson.type}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            sectionIndex,
                            unitIndex,
                            lessonIndex
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteLesson(sectionIndex, unitIndex, lessonIndex)
                      }
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete Lesson
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddLesson(sectionIndex, unitIndex)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Add Lesson
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteUnit(sectionIndex, unitIndex)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete Unit
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddUnit(sectionIndex)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Unit
            </button>

            <button
              type="button"
              onClick={() => handleDeleteSection(sectionIndex)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete Section
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Section
        </button>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
