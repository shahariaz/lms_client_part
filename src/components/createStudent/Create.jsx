// src/components/CreateUser.js
import React, { useState } from "react";
import axios from "axios";
import CustomModal from "../model/Model";
import styled from "styled-components";

const StyledCreateUser = styled.div`
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
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const CreateUser = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // Add other fields as needed
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual backend API endpoint
      await axios.post(`YOUR_API_ENDPOINT/${userType}`, formData);
      alert(`${userType} created successfully!`);
      setIsModalOpen(false); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <StyledCreateUser>
      <h2>Create {userType}</h2>
      <StyledButton onClick={() => setIsModalOpen(true)}>
        Create {userType}
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Add other input fields as needed */}

          <StyledButton type="submit">Create {userType}</StyledButton>
        </StyledForm>
      </CustomModal>
    </StyledCreateUser>
  );
};

export default CreateUser;
