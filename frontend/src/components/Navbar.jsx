/**
 * Navigation Bar Component
 *
 * This component renders the main navigation bar for the product store application.
 * It includes the app title, a link to create new products, and a theme toggle button
 * for switching between light and dark modes. The navbar is responsive and adapts
 * to different screen sizes.
 */

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
