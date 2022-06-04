import {
  Box,
  Divider,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

function Comments() {
  const [dataLoading, setDataLoading] = useState(true);
  const commentsData = [
    {
      profileImage: "profile.png",
      name: "lakshay maini",
      time: "9 hours",
      ens: "lakshay.lens",

      content1: "hi friendss",
    },
  ];
  return (
    <>
      {dataLoading ? (
        commentsData.map((list, index) => {
          return (
            <Box key={index} position={"relative"}>
              <Box>
                <Flex>
                  <Image
                    src={`/assets/${list.profileImage}`}
                    height={45}
                    width={45}
                    style={{ borderRadius: "50%" }}
                  />
                  <Box ml={"20px"}>
                    <Flex alignItems={"center"}>
                      <Flex alignItems={"center"}>
                        <Text
                          fontWeight={600}
                          textTransform={"capitalize"}
                          fontSize={"16px"}
                        >
                          {list.name}
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
                      <BsDot color={"grey"} />
                      <Text fontSize={"14px"} color={"grey"}>
                        {list.time}
                      </Text>
                    </Flex>
                    <Text fontSize={"14px"} className={"brand"}>
                      {`@${list.ens}`}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  ml={"3.5em"}
                  mt={"1em"}
                  fontWeight={500}
                  fontSize={"18px"}
                >
                  {list.content1}
                </Text>
              </Box>
              <Divider
                mt={"-34px"}
                ml={"1.4em"}
                orientation="vertical"
                h="60px"
                borderColor={"blackAlpha.600"}
              />
              <Box mt="10px">
                <Flex>
                  <Image
                    src={`/assets/${list.profileImage}`}
                    height={45}
                    width={45}
                    style={{ borderRadius: "50%" }}
                  />
                  <Box ml={"20px"}>
                    <Flex alignItems={"center"}>
                      <Flex alignItems={"center"}>
                        <Text
                          fontWeight={600}
                          textTransform={"capitalize"}
                          fontSize={"16px"}
                        >
                          {list.name}
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
                      <BsDot color={"grey"} />
                      <Text fontSize={"14px"} color={"grey"}>
                        {list.time}
                      </Text>
                    </Flex>
                    <Text fontSize={"14px"} className={"brand"}>
                      {`@${list.ens}`}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  ml={"3.5em"}
                  mt={"1em"}
                  fontWeight={500}
                  fontSize={"18px"}
                >
                  {list.content1}
                </Text>
              </Box>
            </Box>
          );
        })
      ) : (
        <>
          <Box padding={"6"} boxShadow={"lg"} bg={"white"}>
            <SkeletonCircle size={"10"} />
            <SkeletonText mt={"4"} noOfLines={4} spacing={"4"} />
          </Box>
          <Box padding={"6"} mt={"30px"} boxShadow="lg" bg={"white"}>
            <SkeletonCircle size={"10"} />
            <SkeletonText mt={"4"} noOfLines={4} spacing={"4"} />
          </Box>
        </>
      )}
    </>
  );
}

export default Comments;
