/**
 * Product Model
 *
 * This module defines the Mongoose schema and model for Product documents in MongoDB.
 * The Product model represents items available in the store with their basic information
 * including name, price, and image. All fields are required to ensure data integrity.
 */

import mongoose from "mongoose";

// Define the schema for Product documents
const productSchema = new mongoose.Schema(
  {
    // Product name - required string field
    name: {
      type: String,
      required: true,
    },
    // Product price - required number field (can be decimal)
    price: {
      type: Number,
      required: true,
    },
    // Product image URL - required string field
    image: {
      type: String,
      required: true,
    },
  },
  {
    // Enable automatic timestamps (createdAt and updatedAt fields)
    timestamps: true, // createdAt and updatedAt
  }
);

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema);

// Export the Product model for use in other modules
export default Product;
