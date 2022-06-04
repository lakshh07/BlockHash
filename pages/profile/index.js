import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";
import ProfileData from "./ProfileData";
import { MdVerified } from "react-icons/md";
import { TbHash, TbWorld } from "react-icons/tb";
import {
  AiFillSafetyCertificate,
  AiOutlineUserAdd,
  AiOutlineTwitter,
} from "react-icons/ai";

function index() {
  return (
    <>
      <Navbar />
      <Box>
        <Box
          bg={"white"}
          w={"100%"}
          h={"300px"}
          backgroundImage={"/assets/cover.jpeg"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        ></Box>
        <Container maxW={"1250px"}>
          <Grid templateColumns={"1fr 2.2fr"}>
            <GridItem>
              <Box
                mt={"-6rem"}
                border={"6px solid white"}
                w={"max-content"}
                h={180}
                borderRadius={"10px"}
              >
                <Image
                  src={"/assets/profile.png"}
                  height={170}
                  width={170}
                  alt={"cover"}
                  priority
                  style={{ borderRadius: "5px" }}
                />
              </Box>
              <Box pl="1px">
                <Flex alignItems={"baseline"}>
                  <Heading
                    textTransform={"capitalize"}
                    fontSize={"25px"}
                    fontWeight={700}
                    pt={"0.5em"}
                  >
                    lakshay maini
                  </Heading>

                  <Tooltip
                    hasArrow
                    placement={"right"}
                    label="Verified"
                    borderRadius={"4px"}
                  >
                    <Box>
                      <MdVerified
                        style={{ marginLeft: "10px" }}
                        fontSize={"20px"}
                        color={"#8B5CF6"}
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label="Staff"
                    placement={"right"}
                    borderRadius={"4px"}
                  >
                    <Box>
                      <AiFillSafetyCertificate
                        style={{ marginLeft: "10px" }}
                        fontSize={"20px"}
                        color={"#11B981"}
                      />
                    </Box>
                  </Tooltip>
                </Flex>

                <Text
                  pt={"0.5em"}
                  fontSize={"16px"}
                  className={"brand"}
                  fontFamily={"Miriam Libre"}
                >
                  @lakshay.lens
                </Text>
                <Flex pt={"1.4em"} alignItems={"center"}>
                  <Box>
                    <Text
                      fontWeight={500}
                      fontFamily={"Raleway"}
                      fontSize={"20px"}
                    >
                      103
                    </Text>
                    <Text color={"gray.500"} fontWeight={600} fontSize={"15px"}>
                      Following
                    </Text>
                  </Box>
                  <Box ml={"20px"}>
                    <Text
                      fontFamily={"Raleway"}
                      fontWeight={500}
                      fontSize={"20px"}
                    >
                      103
                    </Text>
                    <Text color={"gray.500"} fontWeight={600} fontSize={"15px"}>
                      Followers
                    </Text>
                  </Box>
                </Flex>

                <Button
                  leftIcon={<AiOutlineUserAdd />}
                  my={"1.5em"}
                  color={"rgb(1, 119, 255)"}
                  border={"1px solid rgb(1, 119, 255)"}
                  bg={"transparent"}
                >
                  Follow
                </Button>

                <Text fontSize={"16px"}>
                  Stay curious 🌎 // Building the Future at Lens 🌿 / Head of
                  Growth // Prev music + NFTs TikTok / Bytedance (before it was
                  on your 📱)
                </Text>

                <Divider my={"2em"} w={"85%"} />

                <Stack fontSize={"16px"}>
                  <Flex alignItems={"center"}>
                    <TbHash color={"black"} />
                    <Text ml={"10px"}>0x8e</Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <TbWorld color={"grey"} />
                    <Text ml={"10px"}>chrissyb.eth</Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <AiOutlineTwitter color={"#188CD8"} />
                    <Text ml={"10px"}>0xchristina</Text>
                  </Flex>
                </Stack>
              </Box>
            </GridItem>
            <GridItem ml="6em">
              <ProfileData />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default index;
