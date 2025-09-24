/**
 * Create Product Page Component
 *
 * This page component provides a form interface for users to create new products.
 * It includes input fields for product name, price, and image URL, with validation
 * and user feedback through toast notifications. The form integrates with the
 * global product store for state management.
 */

import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  // State for the new product being created
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Toast hook for displaying success/error messages
  const toast = useToast();

  // Extract createProduct function from the Zustand store
  const { createProduct } = useProductStore();

  /**
   * Handles the submission of the new product form
   * Calls the createProduct store function and shows appropriate feedback
   */
  const handleAddProduct = async () => {
    // Attempt to create the product via the store
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      // Show error toast if creation failed
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      // Show success toast if creation succeeded
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    // Reset the form after submission (success or failure)
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    // Container with responsive max width
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        {/* Page heading */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        {/* Form container with themed background and styling */}
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            {/* Product name input field */}
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* Product price input field (number type) */}
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* Product image URL input field */}
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            {/* Submit button - full width */}
            <Button colorScheme={"blue"} onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
