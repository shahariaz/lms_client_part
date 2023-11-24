import React, { useState } from "react";
import Modal from "react-modal";

// Component for the Lesson with a Video
const Lesson = ({ title, videoUrl, details }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <h3>{title}</h3>
      <p>{details}</p>
      {videoUrl && <button onClick={openModal}>View Video</button>}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {videoUrl && (
          <div>
            <iframe
              title={title}
              src={videoUrl}
              frameBorder="0"
              allowFullScreen
              style={{ width: "100%", height: "60vh" }}
            ></iframe>
            <button onClick={closeModal}>Close Video</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Component for a Unit containing Lessons
const Unit = ({ title, lessons }) => {
  return (
    <div>
      <h2>{title}</h2>
      {lessons?.map((lesson, index) => (
        <Lesson key={index} {...lesson} />
      ))}
    </div>
  );
};

// Component for a Section containing Units
const Section = ({ title, units }) => {
  return (
    <div>
      <h1>{title}</h1>
      {units?.map((unit, index) => (
        <Unit key={index} {...unit} />
      ))}
    </div>
  );
};

// Component for a Course containing Sections
const Course = () => {
  // Dummy data for demonstration
  const demoCourse = [
    {
      title: "React Basics",
      sections: [
        {
          title: "Introduction",
          units: [
            {
              title: "Getting Started",
              lessons: [
                {
                  title: "Setting Up Your Environment",
                  videoUrl: "https://www.youtube.com/embed/your-video-id",
                  details: "Learn how to set up your development environment.",
                },
                // Add more lessons...
              ],
            },
          ],
        },
        // Add more sections...
      ],
    },
    // Add more courses...
  ];

  return (
    <div>
      {demoCourse?.map((course, index) => (
        <Section key={index} {...course} />
      ))}
    </div>
  );
};

export default Course;
