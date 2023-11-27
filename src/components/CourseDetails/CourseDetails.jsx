import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../../CourseContextApi";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { courses } = useCourseContext();
  const course = courses.find((c) => c._id === courseId);

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleSectionClick = (index) => {
    setSelectedSection((prev) => (prev === index ? null : index));
    setSelectedUnit(null); // Reset selected unit when a new section is clicked
  };

  const handleUnitClick = (index) => {
    setSelectedUnit((prev) => (prev === index ? null : index));
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          <ul>
            {course.sections.map((section, index) => (
              <li key={index} className="mb-4">
                <div
                  className={`cursor-pointer border p-4 ${
                    selectedSection === index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSectionClick(index)}
                >
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-gray-600">{`${section.units.length} Units`}</p>
                </div>
                {selectedSection === index && (
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleUnitClick(index)}
                  >
                    Enter Section
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Unit and Lesson List */}
        {selectedSection !== null && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Units</h2>
            <ul>
              {course.sections[selectedSection].units.map((unit, index) => (
                <li key={index} className="mb-4">
                  <div
                    className={`cursor-pointer border p-4 ${
                      selectedUnit === index ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleUnitClick(index)}
                  >
                    <h3 className="text-lg font-semibold">{unit.title}</h3>
                    <p className="text-gray-600">{`${unit.lessons.length} Lessons`}</p>
                  </div>
                  {selectedUnit === index && (
                    <div className="mt-2">
                      <h2 className="text-xl font-semibold mb-4">Lessons</h2>
                      <ul>
                        {unit.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="ml-4">
                            {lesson.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
