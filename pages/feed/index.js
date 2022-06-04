import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { AiFillSafetyCertificate, AiTwotoneExperiment } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { GiElectric } from "react-icons/gi";
import { FaRegNewspaper } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Blogs from "../profile/components/Blogs";
import { BsDot } from "react-icons/bs";

function index() {
  return (
    <>
      <Navbar />
      <Box bg={"whiteSmoke"}>
        <Container maxW={"1250"}>
          <Grid templateColumns={"1.8fr 1fr"} pb={"3em"}>
            <GridItem mt={"2rem"}>
              <Flex alignItems={"center"} ml={"1em"}>
                <FaRegNewspaper fontSize={"18px"} />
                <Heading ml={"5px"} fontWeight={500} fontSize={"18px"}>
                  My feed
                </Heading>
              </Flex>

              <Box
                bg={"white"}
                mt="1rem"
                borderRadius={"10px"}
                border={"1px solid #E4E4E7"}
                p={"2em"}
              >
                <Blogs />
              </Box>
            </GridItem>
            <GridItem mt={"4.3rem"} ml={"2em"}>
              <Box
                bg={"#FEFCE8"}
                borderRadius={"10px"}
                border={"1px solid #CA8A03"}
                p={"2em"}
              >
                <Flex alignItems={"center"}>
                  <AiTwotoneExperiment fontSize={"14px"} color={"#CA8A03"} />
                  <Heading fontSize={"16px"} ml={"5px"} color={"#CA8A03"}>
                    Beta Warning!
                  </Heading>
                </Flex>

                <Text mt={"12px"} fontSize={"14px"} color={"#CA8A03"}>
                  Block is still in the beta phase, things may break, please
                  handle us with care.
                </Text>
              </Box>

              <Flex alignItems={"center"} mt="2em">
                <GiElectric
                  fontSize={"18px"}
                  color={"orange"}
                  style={{ transform: "rotate(25deg)" }}
                />
                <Heading ml={"5px"} fontWeight={500} fontSize={"18px"}>
                  Recommended users
                </Heading>
              </Flex>

              <Box
                bg={"white"}
                borderRadius={"10px"}
                border={"1px solid #E4E4E7"}
                p={"2em 2em 1em"}
                mt={"1em"}
              >
                <Grid
                  templateColumns={"7fr 1fr"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mb={"1em"}
                >
                  <Flex flex={2}>
                    <Image
                      src={`/assets/profile.png`}
                      height={35}
                      width={42}
                      style={{ borderRadius: "50%" }}
                    />
                    <Box ml={"10px"}>
                      <Flex alignItems={"center"}>
                        <Flex alignItems={"center"}>
                          <Text
                            fontWeight={600}
                            textTransform={"capitalize"}
                            fontSize={"15px"}
                          >
                            lakshay
                          </Text>
                          <MdVerified
                            style={{ marginLeft: "5px" }}
                            color={"#8B5CF6"}
                          />
                          <AiFillSafetyCertificate
                            style={{ marginLeft: "5px" }}
                            color={"#11B981"}
                          />
                        </Flex>
                      </Flex>
                      <Text fontSize={"13px"} className={"brand"}>
                        {`@lakshay.lens`}
                      </Text>
                    </Box>
                  </Flex>
                  <IconButton
                    color={"rgb(1, 119, 255)"}
                    border={"1px solid rgb(1, 119, 255)"}
                    bg={"transparent"}
                    icon={<HiUserAdd />}
                  />
                </Grid>
              </Box>
              <Flex
                mt={"1.5em"}
                position={"sticky"}
                top={"10px"}
                alignItems={"center"}
                ml={"0.5em"}
              >
                <Heading
                  fontSize={"14px"}
                  fontWeight={600}
                  color={"blackAlpha.600"}
                >
                  &copy; Block
                </Heading>
                <BsDot color={"grey"} />
                <Heading
                  fontSize={"14px"}
                  fontWeight={"400"}
                  fontFamily={"Raleway"}
                  color={"blackAlpha.700"}
                >
                  Build with 💜 by Lakshay
                </Heading>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default index;
