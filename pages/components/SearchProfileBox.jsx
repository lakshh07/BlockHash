import { Box, Flex, Spinner, Text, Link, Image } from "@chakra-ui/react";
import React from "react";
import { searchProfiles } from "../api";
import { useQuery } from "urql";

function SearchProfileBox({ query }) {
  const [result] = useQuery({
    query: searchProfiles,
    variables: {
      request: {
        query,
        type: "PROFILE",
        limit: 10,
      },
    },
  });
  // console.log(result?.data?.search?.items[0]?.name);

  if (!result?.data?.search?.items?.length && query?.length) {
    return (
      <Box
        mt={"5px"}
        left={"30px"}
        position={"absolute"}
        // h={"auto"}
        w={"130%"}
        p={"1em"}
        bg={"white"}
        border={"1px solid #E4E4E7"}
        borderRadius={"10px"}
        maxH={"300px"}
        overflow={"scroll"}
      >
        <Text fontSize={"14px"}>No Profile Found</Text>
      </Box>
    );
  }

  if (result?.data?.search?.items?.length) {
    return (
      <>
        <Box
          mt={"5px"}
          left={"30px"}
          position={"absolute"}
          // h={"auto"}
          w={"130%"}
          zIndex={"99"}
          p={"1em"}
          bg={"white"}
          border={"1px solid #E4E4E7"}
          borderRadius={"10px"}
          maxH={"300px"}
          overflow={"scroll"}
        >
          {result?.fetching ? (
            <Box align={"center"}>
              <Spinner color="#0177FF" />
            </Box>
          ) : result ? (
            result?.data?.search?.items?.map((list, index) => {
              return (
                <Link key={index} href={`/profile/${list?.handle}`}>
                  <Box
                    borderRadius={"10px"}
                    p={"1em"}
                    _hover={{ backgroundColor: "whitesmoke" }}
                  >
                    <Flex alignItems={"center"}>
                      <Image
                        src={
                          list.picture
                            ? list.picture?.original?.url
                            : `/assets/man.png`
                        }
                        height={"40px"}
                        width={"40px"}
                        style={{ borderRadius: "50%" }}
                      />
                      <Box ml={"10px"} flex={1}>
                        <Flex alignItems={"center"}>
                          <Flex alignItems={"center"}>
                            <Text
                              fontWeight={600}
                              textTransform={"capitalize"}
                              fontSize={"14px"}
                              textAlign={"left"}
                            >
                              {list.name ? list.name : "Anonymous"}
                            </Text>
                          </Flex>
                        </Flex>
                        <Text
                          textAlign={"left"}
                          fontSize={"13px"}
                          className={"brand"}
                          fontWeight={500}
                        >
                          {`@${list.handle}`}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Link>
              );
            })
          ) : null}
        </Box>
      </>
    );
  }
}

export default SearchProfileBox;
