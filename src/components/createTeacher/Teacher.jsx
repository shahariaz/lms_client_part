// src/components/CreateTeacher.js
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../model/Model";
import styled from "styled-components";

const StyledCreateTeacher = styled.div`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: white; /* Set label text color to white */
`;

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black; /* Set text color to white */
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #4caf50;
  }
`;

const StyledEyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #777;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const StyledFileInput = styled.input`
  margin-bottom: 10px;
`;

const CreateTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilePic: formData.profilePic,
      };

      const response = await axios.post(
        "http://localhost:7000/api/v1/admins/create-teacher-account",
        requestData
      );

      if (response.status === 201) {
        toast.success("Teacher created successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Error creating teacher. Please try again.");
      }
    } catch (error) {
      console.error("Error creating teacher:", error);
      toast.error("Error creating teacher. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledCreateTeacher>
      <h2>Create Teacher</h2>
      <StyledButton onClick={() => setIsModalOpen(true)}>
        Create Teacher
      </StyledButton>

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Name:</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <StyledLabel>Email:</StyledLabel>
          <StyledInput
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <StyledLabel>Password:</StyledLabel>
          <StyledInputContainer>
            <StyledInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <StyledEyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </StyledEyeIcon>
          </StyledInputContainer>

          <StyledLabel>Profile Picture:</StyledLabel>
          <StyledFileInput
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />

          <StyledButton type="submit">Create Teacher</StyledButton>
        </StyledForm>
      </CustomModal>
    </StyledCreateTeacher>
  );
};

export default CreateTeacher;
