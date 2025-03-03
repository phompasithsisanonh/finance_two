import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // สถานะสำหรับเมนู hamburger
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");


  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={bgColor}
      color={textColor}
      borderBottomWidth="1px"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      {/* Logo */}
      <Box>
        <Text fontWeight="bold" fontSize="xl">
          FinanceCalc
        </Text>
      </Box>

      {/* Desktop Menu */}
      <HStack spacing={6} display={{ base: "none", md: "flex" }}>
        <Button variant="ghost" onClick={() => navigate("/loanMoney")}>
          ຄຳນວນເງິນກູ້
        </Button>
        <Button variant="ghost" onClick={() => navigate("/loanMoneyFloting")}>
          ຄຳນວນຫຼຸດຕົ້ນຫຼຸດດອກເບ້ຍ
        </Button>
        <Button variant="ghost" onClick={() => navigate("/daily")}>
          ຄຳນວນເງິນຈ່າຍຕໍ່ມື້
        </Button>
        <Button variant="ghost" onClick={() => navigate("/income")}>
          ບັນທຶກລາຍຮັບ-ລາຍຈ່າຍ
        </Button>
        <Button variant="ghost">About</Button>
      </HStack>

      {/* Mobile Menu Toggle */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
        variant="outline"
      />

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg={bgColor}
          borderTopWidth="1px"
          boxShadow="md"
          p={4}
        >
          <Stack spacing={4}>
            <Button
              variant="ghost"
              w="full"
              onClick={() => {
                navigate("/loanMoney");
                setIsOpen(false);
              }}
            >
              ຄຳນວນເງິນກູ້
            </Button>
            <Button
              variant="ghost"
              w="full"
              onClick={() => {
                navigate("/loanMoney");
                setIsOpen(false);
              }}
            >
              ຄຳນວນຫຼຸດຕົ້ນຫຼຸດດອກເບ້ຍ
            </Button>
            <Button
              variant="ghost"
              w="full"
              onClick={() => {
                navigate("/loanMoney");
                setIsOpen(false);
              }}
            >
              ບັນທຶກລາຍຮັບ-ລາຍຈ່າຍ
            </Button>
            <Button variant="ghost" w="full">
              About
            </Button>
          </Stack>
        </Box>
      )}
    </Flex>
  );
};

export default Navigation;
