/**
 * Product Routes Module
 *
 * This module defines the Express routes for handling product-related HTTP requests.
 * It maps URL endpoints to controller functions that perform CRUD operations on products.
 *
 * Routes:
 * - GET /: Retrieve all products
 * - POST /: Create a new product
 * - PUT /:id: Update an existing product by ID
 * - DELETE /:id: Delete a product by ID
 */

import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

// Create an Express router instance to handle product-related routes
const router = express.Router();

// Route to get all products
// Method: GET
// Endpoint: /
// Description: Retrieves a list of all products from the database
// Response: Array of product objects
router.get("/", getProducts);

// Route to create a new product
// Method: POST
// Endpoint: /
// Description: Creates a new product with the data provided in the request body
// Request Body: { name: string, price: number, image: string }
// Response: The created product object
router.post("/", createProduct);

// Route to update an existing product
// Method: PUT
// Endpoint: /:id
// Description: Updates a product identified by the ID parameter with new data
// Request Body: { name?: string, price?: number, image?: string }
// Response: The updated product object
router.put("/:id", updateProduct);

// Route to delete a product
// Method: DELETE
// Endpoint: /:id
// Description: Deletes a product identified by the ID parameter
// Response: Success message or the deleted product object
router.delete("/:id", deleteProduct);

// Export the router to be used in the main application
export default router;
