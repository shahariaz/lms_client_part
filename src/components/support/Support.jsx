import React from "react";
import { Box, Heading, Button, ChakraProvider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

const MotionBox = motion(Box);

const SupportPage = () => {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bg="gray.100"
        position="relative"
      >
        <Header />

        <Box
          as="main"
          flex="1"
          p="6"
          display="flex"
          flexDirection="column"
          align="center"
          justify="center"
        >
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              mb="6"
              textAlign="center"
              fontSize="4xl"
              fontFamily="Montserrat, sans-serif"
              fontWeight="bold"
              color="teal.500"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
              _hover={{
                color: "teal.600",
              }}
            >
              🤝 Welcome to Support Page 🌟
            </Heading>
            <Box>
              <p>
                If you need help or have any questions, please reach out to our
                support team. You can also visit ClassDojo for additional
                resources.
              </p>
              <Button
                mt="4"
                colorScheme="teal"
                size="lg"
                onClick={() =>
                  window.open("https://www.classdojo.com/", "_blank")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit ClassDojo
              </Button>
            </Box>
          </MotionBox>
        </Box>

        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default SupportPage;
