// ParentPage.jsx

import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Flex, ChakraProvider, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const ParentPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        position="relative"
        overflow="hidden"
        // Remove the background style using the imported SVG
      >
        <Header />

        <Flex
          as="main"
          flex="1"
          p="6"
          align="center"
          justify="center"
          direction="column"
        >
          <MotionHeading
            mb="6"
            textAlign="center"
            fontSize="5xl"
            fontFamily="Montserrat, sans-serif"
            fontWeight="bold"
            color="Black"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
            _hover={{
              color: "teal.600",
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🚀 Welcome to the Parent Dashboard 🌟
          </MotionHeading>
          <Flex
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap="4"
            justify="center"
          >
            <Link to={`/child/${id}`}>
              <MotionBox
                p="4"
                bg="#3182CE"
                color="white"
                borderRadius="md"
                boxShadow="md"
                whileHover={{ scale: 1.05, backgroundColor: "#2C5282" }}
                whileTap={{ scale: 0.95 }}
              >
                Child Information
              </MotionBox>
            </Link>
            <Link to="/training">
              <MotionBox
                p="4"
                bg="#38A169"
                color="white"
                borderRadius="md"
                boxShadow="md"
                whileHover={{ scale: 1.05, backgroundColor: "#2F855A" }}
                whileTap={{ scale: 0.95 }}
              >
                Training Resources
              </MotionBox>
            </Link>
            <Link to="/support">
              <MotionBox
                p="4"
                bg="#D69E2E"
                color="white"
                borderRadius="md"
                boxShadow="md"
                whileHover={{ scale: 1.05, backgroundColor: "#B7791F" }}
                whileTap={{ scale: 0.95 }}
              >
                Support
              </MotionBox>
            </Link>
          </Flex>
        </Flex>

        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default ParentPage;
