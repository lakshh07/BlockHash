import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import Navbar from "../components/Navbar";

function view() {
  return (
    <>
      <Navbar />
      <Box
        py={"2em"}
        justifyContent={"center"}
        align={"center"}
        bg={"rgb(250,250,250)"}
        mx={"center"}
      >
        <Box
          bg={"white"}
          w={"900px"}
          h={"400px"}
          mx={"auto"}
          borderRadius={"10px"}
          backgroundImage={`/assets/cover.jpeg`}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        ></Box>

        <Heading
          w={"55%"}
          mt={"1em"}
          fontSize={"48px"}
          fontWeight={700}
          textAlign={"center"}
        >
          Portfolio Ideas - An open-source repository for inspiration
        </Heading>

        <Flex justifyContent={"center"} mt={"1.5em"} alignItems={"center"}>
          <Image
            src={`/assets/profile.png`}
            height={45}
            width={45}
            style={{ borderRadius: "50%" }}
          />
          <Box ml={"10px"}>
            <Flex alignItems={"center"}>
              <Flex alignItems={"center"}>
                <Text
                  fontWeight={600}
                  textTransform={"capitalize"}
                  fontSize={"16px"}
                  textAlign={"left"}
                >
                  Lakshay maini
                </Text>
                <MdVerified style={{ marginLeft: "5px" }} color={"#8B5CF6"} />
                <AiFillSafetyCertificate
                  style={{ marginLeft: "5px" }}
                  color={"#11B981"}
                />
              </Flex>
            </Flex>
            <Text textAlign={"left"} fontSize={"14px"} className={"brand"}>
              {`@$lakshay.lens`}
            </Text>
          </Box>
          <BsDot style={{ marginRight: "0.5em", marginLeft: "0.5em" }} />
          <Text fontSize={"18px"}>9 hours</Text>
        </Flex>

        <Box mx={"auto"} mt={"3em"} maxW={"1000px"}>
          <Text fontSize={"20px"}>
            when building their portfolio website is not knowing what to put in
            it or what it would look like, at least this was my own experience.
            Edidiong Asikpo's article: 30 web developer ideas to inspire you was
            very helpful and I thought it would be a good idea to have a similar
            list but, one that could be updated, and people can add to.
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default view;
