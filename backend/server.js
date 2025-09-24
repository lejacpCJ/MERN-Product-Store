// This file sets up the Express server for the MERN Product Store backend.
// It configures middleware, routes, and serves the frontend in production.
// Dependencies: Express for server, dotenv for environment variables,
// path for file paths, and custom modules for DB and routes.

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load environment variables from .env file into process.env
// This allows configuration of sensitive data like database URIs and ports
dotenv.config();

// Initialize Express application instance
// This creates the main server object that will handle HTTP requests
const app = express();

// Set the port from environment variable or default to 5000
// Allows flexibility for deployment environments
const PORT = process.env.PORT || 5000;

// Resolve the current directory path for file operations
// Necessary for serving static files in production
const __dirname = path.resolve();

// Middleware to parse incoming JSON payloads in request bodies
// Essential for handling POST/PUT requests with JSON data from the frontend
app.use(express.json()); // allows us to accept JSON data in the req.body

// Mount product routes under /api/products endpoint
// Handles all CRUD operations for products via RESTful API
app.use("/api/products", productRoutes);

// In production, serve the built frontend static files from /frontend/dist
// This allows the Express server to handle both API and client-side routing
// The catch-all route (*) serves index.html for client-side routing (SPA)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server and establish database connection
// The server listens on the specified PORT and logs the startup message
// Database connection is initiated here to ensure it's ready before handling requests
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
