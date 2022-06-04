import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Tag,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdVerified } from "react-icons/md";

function Blogs() {
  const [data, setData] = useState(true);
  const blogList = [
    {
      profileImage: "profile.png",
      name: "lakshay maini",
      ens: "lakshay.lens",
      time: "9 hours",
      title: "How to prevent Cumulative Layout Shift for responsive images",
      discription:
        "Are you seeing this message warning in your Lighthouse report? Image elements do not have explicit width and height. If you're not sure how to resolve the problem to reduce potential CLS (Cumulative…",
      coverPicture: "cover.jpeg",
      tags: ["programming", "productivity"],
    },
    {
      profileImage: "profile.png",
      name: "lakshay maini",
      ens: "lakshay.lens",
      time: "9 hours",
      title: "How to prevent Cumulative Layout Shift for responsive images",
      discription:
        "Are you seeing this message warning in your Lighthouse report? Image elements do not have explicit width and height. If you're not sure how to resolve the problem to reduce potential CLS (Cumulative…",
      coverPicture: "cover.jpeg",
      tags: ["programming", "productivity"],
    },
    {
      profileImage: "profile.png",
      name: "lakshay maini",
      ens: "lakshay.lens",
      time: "9 hours",
      title: "How to prevent Cumulative Layout Shift for responsive images",
      discription:
        "Are you seeing this message warning in your Lighthouse report? Image elements do not have explicit width and height. If you're not sure how to resolve the problem to reduce potential CLS (Cumulative…",
      coverPicture: "cover.jpeg",
      tags: ["programming", "productivity"],
    },
    {
      profileImage: "profile.png",
      name: "lakshay maini",
      ens: "lakshay.lens",
      time: "9 hours",
      title: "How to prevent Cumulative Layout Shift for responsive images",
      discription:
        "Are you seeing this message warning in your Lighthouse report? Image elements do not have explicit width and height. If you're not sure how to resolve the problem to reduce potential CLS (Cumulative…",
      coverPicture: "cover.jpeg",
      tags: ["programming", "productivity"],
    },
  ];
  return (
    <>
      {data ? (
        blogList.map((list, index) => {
          return (
            <Box key={index}>
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
              <Grid
                mt="20px"
                templateColumns={"2.5fr 1fr"}
                alignItems={"center"}
              >
                <Box>
                  <Heading fontWeight={500} fontSize={"20px"}>
                    {list.title}
                  </Heading>
                  <Text mt="10px" color={"grey"} fontSize={"16px"}>
                    {list.discription}
                  </Text>
                </Box>
                <Box
                  bg={"white"}
                  w={"200px"}
                  h={"100px"}
                  ml={"25px"}
                  borderRadius={"10px"}
                  backgroundImage={`/assets/${list.coverPicture}`}
                  backgroundPosition={"center"}
                  backgroundRepeat={"no-repeat"}
                  backgroundSize={"cover"}
                ></Box>
              </Grid>

              <Flex mt={"20px"}>
                {list.tags.map((tagList, index) => {
                  return (
                    <Tag
                      key={index}
                      mr={"10px"}
                      color={"blackAlpha.700"}
                    >{`#${tagList}`}</Tag>
                  );
                })}
              </Flex>

              <Divider my={"30px"} />

              {/* <Box mt="20px" ml="20px">
              <Flex alignItems={"center"}>
                <IconButton
                  isRound
                  bg={"purple.50"}
                  icon={
                    <TbMessages
                      style={{
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      color="purple"
                    />
                  }
                />
              </Flex>
            </Box> */}
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

export default Blogs;
