import React, { useState } from "react";
import CreateTeacher from "../../components/createTeacher/Teacher";
import CreateParent from "../../components/createParent/Parent";
import CreateStudent from "../../components/createStudent/Create";
import CustomModal from "../../components/model/Model";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import { CourseProvider } from "../../CourseContextApi";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white m-0`}
  }
`;

const Container = styled.div`
  ${tw`text-center`}
`;

const Heading = styled.h1`
  ${tw`text-4xl mb-8 font-bold p-4 rounded-md`}
`;

const Button = styled.button`
  ${tw`bg-green-500 text-white px-4 py-2 m-2 rounded hover:bg-green-600 cursor-pointer`}
`;

const AdminPage = () => {
  const [isCreateTeacherModalOpen, setCreateTeacherModalOpen] = useState(false);
  const [isCreateParentModalOpen, setCreateParentModalOpen] = useState(false);
  const [isCreateCourseModalOpen, setCreateCourseModalOpen] = useState(false);
  const [isCreateStudentModalOpen, setCreateStudentModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <CourseProvider>
      <GlobalStyle />
      <Container>
        <Heading>Welcome to the Admin Page</Heading>

        <Button onClick={() => setCreateStudentModalOpen(true)}>
          Create Student
        </Button>
        <Button onClick={() => setCreateTeacherModalOpen(true)}>
          Create Teacher
        </Button>
        <Button onClick={() => setCreateParentModalOpen(true)}>
          Create Parent
        </Button>
        <Button onClick={() => setCreateCourseModalOpen(true)}>
          Create Course
        </Button>

        <CustomModal
          isOpen={isCreateStudentModalOpen}
          onRequestClose={() => setCreateStudentModalOpen(false)}
        >
          <CreateStudent />
        </CustomModal>
        <CustomModal
          isOpen={isCreateTeacherModalOpen}
          onRequestClose={() => setCreateTeacherModalOpen(false)}
        >
          <CreateTeacher />
        </CustomModal>

        <CustomModal
          isOpen={isCreateParentModalOpen}
          onRequestClose={() => setCreateParentModalOpen(false)}
        >
          <CreateParent />
        </CustomModal>

        <CustomModal
          isOpen={isCreateCourseModalOpen}
          onRequestClose={() => setCreateCourseModalOpen(false)}
        >
          <Button onClick={() => navigate("/temp")}>Create Course</Button>
        </CustomModal>
      </Container>
    </CourseProvider>
  );
};

export default AdminPage;
