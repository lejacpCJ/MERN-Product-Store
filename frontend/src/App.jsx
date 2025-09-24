/**
 * Main Application Component
 *
 * This is the root component of the React application. It sets up the overall
 * layout and routing structure for the product store application. The app
 * includes a navigation bar and routes for viewing products and creating new ones.
 */

import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    // Main container with full viewport height and dynamic background color
    // Uses Chakra UI's color mode hook to switch between light and dark themes
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Navigation bar component displayed at the top of the application */}
      <Navbar />
      {/* Routes component defines the client-side routing structure */}
      <Routes>
        {/* Route for the home page - displays the list of products */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the create page - allows users to add new products */}
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
