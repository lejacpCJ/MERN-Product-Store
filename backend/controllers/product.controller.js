/**
 * Product Controller Module
 *
 * This module contains the controller functions for handling product-related business logic.
 * Each function corresponds to a CRUD operation and interacts with the Product model
 * to perform database operations using Mongoose.
 */

import Product from "../models/product.model.js";
import mongoose from "mongoose";

/**
 * Get all products from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success status and product data array
 */
export const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database using Mongoose find method
    const products = await Product.find({});
    // Return success response with products data
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Log error to console for debugging
    console.error("Error in Get Products:", error.message);
    // Return error response with server error message
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Create a new product in the database
 * @param {Object} req - Express request object containing product data in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success status and created product data
 */
export const createProduct = async (req, res) => {
  // Extract product data from request body
  const product = req.body;

  // Validate required fields: name, price, and image
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Create a new Product instance with the provided data
  const newProduct = new Product(product);

  try {
    // Save the new product to the database
    await newProduct.save();
    // Return success response with the created product
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    // Log error to console for debugging
    console.error("Error in Create Product:", error.message);
    // Return error response with server error message
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Update an existing product in the database
 * @param {Object} req - Express request object with product ID in params and update data in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success status and updated product data
 */
export const updateProduct = async (req, res) => {
  // Extract product ID from URL parameters
  const { id } = req.params;
  // Extract update data from request body
  const product = req.body;

  // Validate that the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    // Find the product by ID and update it with new data, returning the updated document
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    // Return success response with the updated product
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    // Log error to console for debugging
    console.error("Error in Update Product:", error.message);
    // Return error response with server error message
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Delete a product from the database
 * @param {Object} req - Express request object with product ID in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success status and confirmation message
 */
export const deleteProduct = async (req, res) => {
  // Extract product ID from URL parameters
  const { id } = req.params;
  // Log the ID being deleted for debugging purposes
  console.log("Delete Product ID:", id);

  // Validate that the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    // Find the product by ID and delete it from the database
    await Product.findByIdAndDelete(id);
    // Return success response with confirmation message
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    // Log error to console for debugging
    console.error("Error in Delete Product:", error.message);
    // Return error response with server error message
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
