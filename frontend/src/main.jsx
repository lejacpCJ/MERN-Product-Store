/**
 * Main Entry Point for React Application
 *
 * This file serves as the entry point for the React frontend application.
 * It sets up the root React component with necessary providers and renders
 * the application to the DOM. The app uses Chakra UI for styling and
 * React Router for client-side routing.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Create the root React element and render the application
// The app is wrapped with multiple providers for enhanced functionality:
// - StrictMode: Enables additional development checks and warnings
// - BrowserRouter: Provides client-side routing capabilities
// - ChakraProvider: Supplies Chakra UI theme and components throughout the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
