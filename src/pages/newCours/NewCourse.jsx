import React, { useState } from "react";
import {
  Button,
  Input,
  VStack,
  Box,
  Heading,
  Spacer,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { FaPlus, FaSave } from "react-icons/fa";

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    sections: [
      {
        title: "",
        units: [
          {
            title: "",
            lessons: [{ title: "", content: "" }],
          },
        ],
      },
    ],
  });

  // Generalized function to update nested fields
  const updateField = (path, value) => {
    setCourseData((prevData) => {
      // Use a copy of the previous data
      const newData = { ...prevData };

      // Use a reference to navigate through the nested structure
      let currentLevel = newData;
      path.forEach((key, index) => {
        // Check if we're at the last level
        if (index === path.length - 1) {
          // Update the value at the last level
          currentLevel[key] = value;
        } else {
          // Move to the next level
          currentLevel = currentLevel[key];
        }
      });

      return newData;
    });
  };

  const handleInputChange = (path, value) => {
    // Call the generalized update function
    updateField(path, value);
  };

  const addSection = () => {
    updateField(
      ["sections"],
      [...courseData.sections, { title: "", units: [] }]
    );
  };

  const removeSection = (sectionIndex) => {
    updateField(
      ["sections"],
      courseData.sections.filter((_, index) => index !== sectionIndex)
    );
  };

  const addUnit = (sectionIndex) => {
    updateField(
      ["sections", sectionIndex, "units"],
      [
        ...courseData.sections[sectionIndex].units,
        { title: "", lessons: [{ title: "", content: "" }] },
      ]
    );
  };

  const removeUnit = (sectionIndex, unitIndex) => {
    updateField(
      ["sections", sectionIndex, "units"],
      courseData.sections[sectionIndex].units.filter(
        (_, index) => index !== unitIndex
      )
    );
  };

  const addLesson = (sectionIndex, unitIndex) => {
    updateField(
      ["sections", sectionIndex, "units", unitIndex, "lessons"],
      [
        ...courseData.sections[sectionIndex].units[unitIndex].lessons,
        { title: "", content: "" },
      ]
    );
  };

  const removeLesson = (sectionIndex, unitIndex, lessonIndex) => {
    updateField(
      ["sections", sectionIndex, "units", unitIndex, "lessons"],
      courseData.sections[sectionIndex].units[unitIndex].lessons.filter(
        (_, index) => index !== lessonIndex
      )
    );
  };

  const saveCourse = async () => {
    try {
      console.log(courseData);
      const response = await fetch("http://localhost:7000/api/v1/new-courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const savedCourse = await response.json();
        console.log("Course saved successfully:", savedCourse);
        // You can add any additional logic here after the course is saved
      } else {
        console.error("Error saving course:", response.status);
        // You can handle the error appropriately, e.g., show an error message
      }
    } catch (error) {
      console.error("Error saving course:", error);
      // You can handle the error appropriately, e.g., show an error message
    }
  };

  return (
    <VStack p={8} spacing={4} align="stretch" maxW="800px" mx="auto">
      <Heading mb={4}>Create a New Course</Heading>
      <Input
        placeholder="Title"
        value={courseData.title}
        onChange={(e) => handleInputChange(["title"], e.target.value)}
      />
      <Input
        placeholder="Description"
        value={courseData.description}
        onChange={(e) => handleInputChange(["description"], e.target.value)}
      />

      {courseData.sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} p={4} borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={2}>
            Section Title
          </Heading>
          <Input
            placeholder="Section Title"
            value={section.title}
            onChange={(e) =>
              handleInputChange(
                ["sections", sectionIndex, "title"],
                e.target.value
              )
            }
          />
          <Spacer />
          <IconButton
            icon={<CloseButton />}
            colorScheme="red"
            onClick={() => removeSection(sectionIndex)}
          />
          <Box mt={4}>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="green"
              onClick={() => addUnit(sectionIndex)}
            >
              Add Unit
            </Button>
          </Box>
          {section.units.map((unit, unitIndex) => (
            <Box key={unitIndex} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="sm" mb={2}>
                Unit Title
              </Heading>
              <Input
                placeholder="Unit Title"
                value={unit.title}
                onChange={(e) =>
                  handleInputChange(
                    ["sections", sectionIndex, "units", unitIndex, "title"],
                    e.target.value
                  )
                }
              />
              <Spacer />
              <IconButton
                icon={<CloseButton />}
                colorScheme="red"
                onClick={() => removeUnit(sectionIndex, unitIndex)}
              />
              <Box mt={4}>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme="green"
                  onClick={() => addLesson(sectionIndex, unitIndex)}
                >
                  Add Lesson
                </Button>
              </Box>
              {unit.lessons.map((lesson, lessonIndex) => (
                <Box
                  key={lessonIndex}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Heading size="xs" mb={2}>
                    Lesson Title
                  </Heading>
                  <Input
                    placeholder="Lesson Title"
                    value={lesson.title}
                    onChange={(e) =>
                      handleInputChange(
                        [
                          "sections",
                          sectionIndex,
                          "units",
                          unitIndex,
                          "lessons",
                          lessonIndex,
                          "title",
                        ],
                        e.target.value
                      )
                    }
                  />
                  <Spacer />
                  <IconButton
                    icon={<CloseButton />}
                    colorScheme="red"
                    onClick={() =>
                      removeLesson(sectionIndex, unitIndex, lessonIndex)
                    }
                  />
                  <Box mt={4}>
                    <Heading size="xs" mb={2}>
                      Lesson Content (HTML)
                    </Heading>
                    <textarea
                      placeholder="Lesson Content"
                      value={lesson.content}
                      onChange={(e) =>
                        handleInputChange(
                          [
                            "sections",
                            sectionIndex,
                            "units",
                            unitIndex,
                            "lessons",
                            lessonIndex,
                            "content",
                          ],
                          e.target.value
                        )
                      }
                      rows={5}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ))}

      <Button onClick={addSection} colorScheme="pink">
        Add Section
      </Button>
      <Button onClick={saveCourse} colorScheme="pink" leftIcon={<FaSave />}>
        Save Course
      </Button>
    </VStack>
  );
};

export default CourseForm;
