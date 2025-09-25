# 實作 Navbar 與 CreatePage / Implementing Navbar and CreatePage

- [中文版](#zh)
- [English](#en)

---

<a name="zh"></a>

## 中文版 - 實作 Navbar 與 CreatePage

### 目標

- 設置 `react-router-dom`
- 實作 `Navbar` 與 `CreatePage`

### 安裝 `react-router-dom`

- 於 `frontend` 資料夾中安裝 `react-router-dom`
- 於 `main.jsx` 檔案中，導入 `BrowserRouter` 並以其包覆 `ChakraProvider`

```jsx
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
```

```bash
npm i react-router-dom
```

### 建立 `Navbar`、`HomePage`、`CreatePage`

- 於 `src` 資料夾下建立 `components` 與 `pages` 資料夾
- 於 `components` 資料夾中建立 `Navbar.jsx`
- 於 `pages` 資料夾中建立 `HomePage.jsx`、`CreatePage.jsx`

`HomePage.jsx`

```jsx
const HomePage = () => {
    return <div>HomePage<div/>;
};
export default HomePage;
```

`CreatePage.jsx`

```jsx
const CreatePage = () => {
    return <div>CreatePage<div/>;
};
export default CreatePage;
```

`Navbar.jsx`

```jsx
const Navbar = () => {
    return <div>Navbar<div/>;
};
export default Navbar;
```

### 於 `App.jsx` 中使用 `pages` 元件

- 設置 `Navbar` 元件
- 於 `Navbar` 元件中，使用 `Routes` 包覆 `HomePage` 與 `CreatePage`
- 設置所需的 `import`

`App.jsx`

```jsx
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}
export default App;
```

### 實作 `Navbar.jsx`

```jsx
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  // Hook to access and toggle the current color mode (light/dark theme)
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // Container limits the max width and provides horizontal padding
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16} // Fixed height of 16 units (64px)
        alignItems={"center"} // Vertically center all children
        justifyContent={"space-between"} // Space items apart
        flexDir={{
          base: "column", // Stack vertically on small screens
          sm: "row", // Horizontal layout on small screens and up
        }}
      >
        {/* Application title with gradient text effect */}
        <Text
          fontSize={{ base: "22", sm: "28" }} // Responsive font size
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // Cyan to blue gradient
          bgClip={"text"} // Clip background to text
        >
          {/* Link to home page */}
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        {/* Horizontal stack for action buttons */}
        <HStack spacing={2} alignItems={"center"}>
          {/* Button to navigate to create product page */}
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          {/* Button to toggle between light and dark themes */}
          <Button onClick={toggleColorMode}>
            {/* Show moon icon in light mode, sun icon in dark mode */}
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
```

### 實作 `CreatePage.jsx`

```jsx
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
```

---

<a name="en"></a>

## English Version - Title

### Goal

- Set up `react-router-dom`
- Implement `Navbar` and `CreatePage`

### Install `react-router-dom`

- Install `react-router-dom` in the `/frontend` folder.
- In `main.jsx`, import `BrowserRouter` and wrap `ChakraProvider` with it.

```jsx
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
```

```bash
npm i react-router-dom
```

### Create `Navbar`, `HomePage`, `CreatePage`

- Under `/src`, create `/components` and `/pages` folders.
- In `/components`, create `Navbar.jsx`.
- In `/pages`, create `HomePage.jsx` and `CreatePage.jsx`.

`HomePage.jsx`

```jsx
const HomePage = () => {
    return <div>HomePage<div/>;
};
export default HomePage;
```

`CreatePage.jsx`

```jsx
const CreatePage = () => {
    return <div>CreatePage<div/>;
};
export default CreatePage;
```

`Navbar.jsx`

```jsx
const Navbar = () => {
    return <div>Navbar<div/>;
};
export default Navbar;
```

### Use the pages in `App.jsx`

- Add the `Navbar` component.
- Wrap `HomePage` and `CreatePage` with `Routes`.
- Add the required imports.

`App.jsx`

```jsx
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}
export default App;
```

### Implement `Navbar.jsx`

```jsx
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  // Hook to access and toggle the current color mode (light/dark theme)
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // Container limits the max width and provides horizontal padding
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16} // Fixed height of 16 units (64px)
        alignItems={"center"} // Vertically center all children
        justifyContent={"space-between"} // Space items apart
        flexDir={{
          base: "column", // Stack vertically on small screens
          sm: "row", // Horizontal layout on small screens and up
        }}
      >
        {/* Application title with gradient text effect */}
        <Text
          fontSize={{ base: "22", sm: "28" }} // Responsive font size
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // Cyan to blue gradient
          bgClip={"text"} // Clip background to text
        >
          {/* Link to home page */}
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        {/* Horizontal stack for action buttons */}
        <HStack spacing={2} alignItems={"center"}>
          {/* Button to navigate to create product page */}
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          {/* Button to toggle between light and dark themes */}
          <Button onClick={toggleColorMode}>
            {/* Show moon icon in light mode, sun icon in dark mode */}
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
```

### Implement `CreatePage.jsx`

```jsx
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
```
