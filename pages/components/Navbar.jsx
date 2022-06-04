import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import LensLogo from "./LensLogo";

function Navbar() {
  const router = useRouter();
  return (
    <>
      <Box py={"0.9em"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"1250px"}
          fontWeight={500}
          mx={"auto"}
        >
          <Flex alignItems={"center"}>
            <Heading
              fontFamily={"Philosopher"}
              fontSize={"2em"}
              fontWeight={"500"}
              mr={"10px"}
              cursor={"pointer"}
              on
              onClick={() => router.push("/")}
            >
              Block
            </Heading>
            <Input
              variant={"filled"}
              size={"md"}
              mx="20px"
              placeholder="Search"
            />
            <Button
              variant={"ghost"}
              fontWeight={500}
              _hover={{
                filter: "drop-shadow(rgba(1, 119, 255, 0.4) 0px 5px 3px)",
                textDecor: "underline",
              }}
              onClick={() => router.push("/feed")}
            >
              Home
            </Button>
          </Flex>

          <Box>
            <Button
              leftIcon={<RiEdit2Fill />}
              boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
              rounded="20px"
              p="1.2em"
              bg="#0177FF"
              color="white"
              _hover={{
                bg: "#0177FF",
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              mr="20px"
            >
              Write
            </Button>

            <Button
              leftIcon={<LensLogo size={30} color="white" />}
              iconSpacing={["marginTop"]}
              alignItems={"center"}
              boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
              rounded="20px"
              p="1.2em"
              bg="#0177FF"
              color="white"
              _hover={{
                bg: "#0177FF",
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              Login
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
