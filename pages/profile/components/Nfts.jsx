import {
  Box,
  Flex,
  Heading,
  Link,
  SkeletonCircle,
  SkeletonText,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Nfts() {
  const [dataLoading, setDataLoading] = useState(true);
  const nftData = [
    {
      name: "Ethereum Name Service",
      title: "Polygon Buidlit",
      image: "profile.png",
    },
    {
      name: "Ethereum Name Service",
      title: "wongmjane.lens's follower NFT",
      image: "profile.png",
    },
    {
      name: "Ethereum Name Service",
      title: "2021 Championship Chain",
      image: "profile.png",
    },
    {
      name: "Ethereum Name Service",
      title: "Polygon Buidlit",
      image: "profile.png",
    },
    {
      name: "Ethereum Name Service",
      title: "2021 Championship Chain",
      image: "profile.png",
    },
  ];

  return (
    <>
      {dataLoading ? (
        <Wrap spacing={"40px"} p="20px 30px">
          {nftData.map((list, index) => {
            return (
              <Link href="#" key={index} isExternal>
                <WrapItem key={index}>
                  <Box
                    px="25px"
                    py={"30px"}
                    maxW={"270px"}
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    align={"center"}
                    borderRadius={"10px"}
                  >
                    <Box
                      bg={"white"}
                      w={"220px"}
                      h={"220px"}
                      borderRadius={"10px"}
                      backgroundImage={`/assets/${list.image}`}
                      backgroundPosition={"center"}
                      backgroundRepeat={"no-repeat"}
                      backgroundSize={"cover"}
                      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    ></Box>
                    <Text
                      mt="20px"
                      fontWeight={500}
                      fontSize={"14px"}
                      color={"grey"}
                      textAlign={"left"}
                    >
                      {list.name}
                    </Text>
                    <Text
                      textAlign={"left"}
                      mt="5px"
                      fontWeight={700}
                      fontSize={"16px"}
                    >
                      {list.title}
                    </Text>
                  </Box>
                </WrapItem>
              </Link>
            );
          })}
        </Wrap>
      ) : (
        <Flex>
          <Box
            padding="6"
            maxW={"270px"}
            align={"center"}
            boxShadow="lg"
            bg="white"
            mr="40px"
          >
            <SkeletonCircle size="40" />
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
          </Box>
          <Box
            padding="6"
            maxW={"270px"}
            align={"center"}
            boxShadow="lg"
            bg="white"
          >
            <SkeletonCircle size="40" />
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Nfts;
