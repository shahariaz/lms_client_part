import React from "react";
import Modal from "react-modal";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

Modal.setAppElement("#root"); // Set the root element for accessibility

const StyledModal = styled(animated(Modal))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: linear-gradient(to right, #111, #333);
  overflow: auto;
  border-radius: 8px;
  outline: none;
  padding: 20px;
  max-width: 1000px; /* Adjust the max-width as needed */
  max-height: 80vh;
`;

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(0.8)",
  });

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Modal"
      style={modalAnimation}
    >
      {children}
    </StyledModal>
  );
};

export default CustomModal;
