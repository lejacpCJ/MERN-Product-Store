/**
 * Home Page Component
 *
 * This is the main page of the product store application. It displays a grid
 * of all available products using ProductCard components. The page fetches
 * products on initial load and handles both populated and empty states.
 * Users can navigate to create new products when no products exist.
 */

import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  // Extract products data and fetch function from Zustand store
  const { fetchProducts, products } = useProductStore();

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debug log for development (can be removed in production)
  console.log(products);

  return (
    // Main container with responsive max width and vertical padding
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        {/* Page heading with gradient text effect */}
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Product 🚀
        </Text>

        {/* Responsive grid layout for product cards */}
        <SimpleGrid
          columns={{
            base: 1, // 1 column on mobile
            md: 2, // 2 columns on medium screens
            lg: 3, // 3 columns on large screens
          }}
          spacing={10}
          w={"full"}
        >
          {/* Render a ProductCard for each product */}
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </SimpleGrid>

        {/* Empty state message when no products exist */}
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            {/* Link to create page for adding first product */}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
