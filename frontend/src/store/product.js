/**
 * Product Store - Zustand State Management
 *
 * This store manages the global state for products in the application using Zustand.
 * It handles CRUD operations by making API calls to the backend and updating the
 * local state optimistically for better user experience. The store provides
 * actions for creating, reading, updating, and deleting products.
 */

import { create } from "zustand";

export const useProductStore = create((set) => ({
  // State: Array of products fetched from the API
  products: [],

  /**
   * Sets the products array in state
   * @param {Array} products - Array of product objects
   */
  setProducts: (products) => set({ products }),

  /**
   * Creates a new product by making a POST request to the API
   * @param {Object} newProduct - Product object with name, price, and image
   * @returns {Object} Result object with success status and message
   */
  createProduct: async (newProduct) => {
    // Client-side validation for required fields
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    // Make POST request to create product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    // Add the new product to the local state
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully." };
  },

  /**
   * Fetches all products from the API and updates the state
   */
  fetchProducts: async () => {
    // Make GET request to fetch all products
    const res = await fetch("/api/products");
    const data = await res.json();

    // Update the products state with fetched data
    set({ products: data.data });
  },

  /**
   * Deletes a product by making a DELETE request to the API
   * @param {string} pid - Product ID to delete
   * @returns {Object} Result object with success status and message
   */
  deleteProduct: async (pid) => {
    // Make DELETE request to remove product
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    // Return error if API call failed
    if (!data.success) return { success: false, message: data.message };

    // Optimistic UI update: Remove product from local state immediately
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message };
  },

  /**
   * Updates a product by making a PUT request to the API
   * @param {string} pid - Product ID to update
   * @param {Object} updatedProduct - Updated product data
   * @returns {Object} Result object with success status and message
   */
  updateProduct: async (pid, updatedProduct) => {
    // Make PUT request to update product
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    // Return error if API call failed
    if (!data.success) return { success: false, message: data.message };

    // Optimistic UI update: Update product in local state immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
