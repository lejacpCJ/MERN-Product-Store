/**
 * Product Card Component
 *
 * This component displays a single product in a card format with an image,
 * name, price, and action buttons for editing and deleting. It includes a modal
 * for updating product information and provides user feedback through toast notifications.
 *
 * Features:
 * - Product display with hover effects
 * - Edit functionality via modal dialog
 * - Delete functionality with confirmation
 * - Toast notifications for success/error feedback
 * - Responsive design with Chakra UI theming
 */

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  Image,
  Text,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  // State for the product being updated in the modal
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Dynamic colors based on current theme (light/dark mode)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  // Zustand store hooks for product operations
  const { deleteProduct, updateProduct } = useProductStore();

  // Toast hook for displaying success/error messages
  const toast = useToast();

  // Modal disclosure hook for controlling update modal visibility
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Handles the deletion of a product
   * @param {string} pid - Product ID to delete
   */
  const handleDeleteProduct = async (pid) => {
    // Call the delete function from the store
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      // Show error toast if deletion failed
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Show success toast if deletion succeeded
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  /**
   * Handles the updating of a product
   * @param {string} pid - Product ID to update
   * @param {Object} updatedProduct - Updated product data
   */
  const handleUpdateProduct = async (pid, updatedProduct) => {
    // Call the update function from the store
    const { success, message } = await updateProduct(pid, updatedProduct);
    // Close the modal after update attempt
    onClose();
    if (!success) {
      // Show error toast if update failed
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Show success toast if update succeeded
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    // Main card container with shadow, rounded corners, and hover effects
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      {/* Product image with responsive sizing */}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      {/* Product details and action buttons container */}
      <Box p={4}>
        {/* Product name heading */}
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        {/* Product price with currency symbol */}
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        {/* Action buttons for edit and delete */}
        <HStack spacing={2}>
          {/* Edit button - opens update modal */}
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          {/* Delete button - triggers delete operation */}
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      {/* Update Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form inputs for updating product details */}
            <VStack spacing={4}>
              {/* Product name input */}
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              {/* Product price input (number type) */}
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              {/* Product image URL input */}
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            {/* Update button - submits the form */}
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            {/* Cancel button - closes modal without saving */}
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
