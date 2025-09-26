# 完成 HomePage / Finishing HomePage

- [中文版](#zh)
- [English](#en)

---

<a name="zh"></a>

## 中文版 - 完成 `HomePage`

### 目標

- 在 `HomePage` 上，實作 `ProductCard` 元件
- `ProductCard` 能夠顯示商品資訊，並支援更新與刪除操作

### 實作 `HomePage.jsx`

- 實作有商品時的 UI 介面
- 實作無商品時的 UI 介面

`HomePage.jsx`

```jsx
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const HomePage = () => {
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
        ></SimpleGrid>

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
```

### 在 `product.js` 中實作 `fetchProducts`

- 實作 `fetchProducts` 方法

`product.js`

```js
  fetchProducts: async () => {
    // Make GET request to fetch all products
    const res = await fetch("/api/products");
    const data = await res.json();

    // Update the products state with fetched data
    set({ products: data.data });
  },
```

- 在 `HomePage.jsx` 中使用 `fetchProducts`

`HomePage.jsx`

```jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";

const HomePage = () => {
  // Extract products data and fetch function from Zustand store
  const { fetchProducts, products } = useProductStore();

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debug log for development (can be removed in production)
  console.log(products);
};

export default HomePage;
```

### 實作 `ProductCard.jsx`

- 在 `HomePage.jsx` 的 `SimpleGrid` 元件中加入 `ProductCard`

`HomePage.jsx`

```jsx
const HomePage = () => {
  return (
    // ... existing code

        {/* Responsive grid layout for product cards */}
        <SimpleGrid
          // ... existing code
        >
          {/* Render a ProductCard for each product */}
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </SimpleGrid>

    // ... existing code

  );
};

```

- 在 `/components` 資料夾下建立 `ProductCard.jsx`
- 實作基本 UI 版型

`ProductCard.jsx`

```jsx
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {

	// Dynamic colors based on current theme (light/dark mode)
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bgColor = useColorModeValue("white", "gray.800");
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
)}
```

### 在 `product.js` 增加 `deleteProduct` 方法

`product.js`

```js

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
```

### 在 `product.js` 增加 `updateProduct` 方法

`product.js`

```js
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
```

### 在 `ProductCard.jsx` 實作更新與刪除功能

- 實作 `handleDeleteProduct` 方法
- 實作 `handleUpdateProduct` 方法

`ProductCard.jsx`

```jsx
const ProductCard = ({ product }) => {
  // ... existing code

  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Zustand store hooks for product operations
  const { deleteProduct, updateProduct } = useProductStore();

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

  // ... existing code
};
```

### 在 `ProductCard.jsx` 實作 `Modal` 元件以顯示更新介面

`ProductCard.jsx`

```jsx
const ProductCard = ({ product }) => {
  // ... existing code

  // Modal disclosure hook for controlling update modal visibility
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ... existing code

	return (

  		// ... existing code

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

```

---

<a name="en"></a>

## English Version - Finishing HomePage

### Goal

- On the `HomePage`, implement the `ProductCard` component
- `ProductCard` should display product information and support update and delete operations

### Implement `HomePage.jsx`

- Implement the UI for when there are products
- Implement the UI for when there are no products

`HomePage.jsx`

```jsx
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const HomePage = () => {
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
        ></SimpleGrid>

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
```

### Implement `fetchProducts` in `product.js`

- Implement the `fetchProducts` method

`product.js`

```js
  fetchProducts: async () => {
    // Make GET request to fetch all products
    const res = await fetch("/api/products");
    const data = await res.json();

    // Update the products state with fetched data
    set({ products: data.data });
  },
```

- Use `fetchProducts` in `HomePage.jsx`

`HomePage.jsx`

```jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";

const HomePage = () => {
  // Extract products data and fetch function from Zustand store
  const { fetchProducts, products } = useProductStore();

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debug log for development (can be removed in production)
  console.log(products);
};

export default HomePage;
```

### Implement `ProductCard.jsx`

- Add `ProductCard` into the `SimpleGrid` component in `HomePage.jsx`

`HomePage.jsx`

```jsx
const HomePage = () => {
  return (
    // ... existing code

        {/* Responsive grid layout for product cards */}
        <SimpleGrid
          // ... existing code
        >
          {/* Render a ProductCard for each product */}
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </SimpleGrid>

    // ... existing code

  );
};

```

- Create `ProductCard.jsx` under the `/components` folder
- Implement the basic UI layout

`ProductCard.jsx`

```jsx
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {

	// Dynamic colors based on current theme (light/dark mode)
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bgColor = useColorModeValue("white", "gray.800");
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
)}
```

### Add `deleteProduct` method in `product.js`

`product.js`

```js
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
```

### Add `updateProduct` method in `product.js`

`product.js`

```js
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
```

### Implement update and delete functionality in `ProductCard.jsx`

- Implement the `handleDeleteProduct` method
- Implement the `handleUpdateProduct` method

`ProductCard.jsx`

```jsx
const ProductCard = ({ product }) => {
  // ... existing code

  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Zustand store hooks for product operations
  const { deleteProduct, updateProduct } = useProductStore();

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

  // ... existing code
};
```

### Implement the `Modal` in `ProductCard.jsx` to show the update UI

`ProductCard.jsx`

```jsx
const ProductCard = ({ product }) => {
  // ... existing code

  // Modal disclosure hook for controlling update modal visibility
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ... existing code

	return (

  		// ... existing code

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
```
