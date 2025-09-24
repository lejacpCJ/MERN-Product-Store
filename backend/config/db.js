/**
 * Database Configuration Module
 *
 * This module handles the connection to the MongoDB database using Mongoose.
 * It provides a function to establish a connection and handles connection errors gracefully.
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 *
 * This function establishes a connection to the MongoDB database using the connection string
 * provided in the MONGO_URI environment variable. It logs the connection status and handles
 * any connection errors by logging them and exiting the process.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when connection is successful, exits process on failure
 * @throws {Error} If connection fails, logs error and exits with code 1
 */
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log successful connection with the host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the connection error message
    console.error(`Error: ${error.message}`);
    // Exit the process with failure code (1) to indicate an error occurred
    process.exit(1); // 1 code means failure, 0 code means success
  }
};
