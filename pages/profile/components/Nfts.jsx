import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import React from "react";

function Nfts({ nfts }) {
  return (
    <>
      {nfts?.data?.nfts?.items?.length ? (
        <Wrap spacing={"40px"} p="20px 30px">
          {nfts?.data?.nfts?.items.map((list, index) => {
            return (
              <Link
                href={`https://testnets.opensea.io/assets/mumbai/${list.contractAddress}/${list.tokenId}`}
                key={index}
                isExternal
              >
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
                      backgroundImage={
                        list.originalContent?.uri
                          ? list.originalContent?.uri
                          : "/assets/bright-squares.png"
                      }
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
                      {list.collectionName
                        ? list.collectionName
                        : list.contractAddress}
                    </Text>
                    <Text
                      textAlign={"left"}
                      mt="5px"
                      fontWeight={700}
                      fontSize={"16px"}
                    >
                      {list.name ? list.name : list.tokenId}
                    </Text>
                  </Box>
                </WrapItem>
              </Link>
            );
          })}
        </Wrap>
      ) : (
        <Flex
          mt="5em"
          ml={"-20%"}
          justifyContent="center"
          flexDir="column"
          alignItems="center"
        >
          <Image src={"/assets/no-results.png"} height={100} width={100} />
          <Heading fontSize="1.5em" fontFamily={"Miriam Libre"} pt="1em">
            No NFTs
          </Heading>
        </Flex>
      )}
    </>
  );
}

export default Nfts;
