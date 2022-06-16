import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import moment from "moment";
import Blog from "./Blog";
import { staff, verified } from "../../../utils/recognition";

function Comments({ commentsArray }) {
  return (
    <>
      {commentsArray?.length ? (
        commentsArray?.map((list, index) => {
          return (
            <Box key={index} position={"relative"}>
              <Box position={"relative"}>
                <Box>
                  <Link href={`/profile/${list?.mainPost?.profile?.handle}`}>
                    <Flex>
                      <Image
                        src={
                          list?.mainPost?.profile?.picture
                            ? list?.mainPost?.profile?.picture?.original?.url
                            : `/assets/man.png`
                        }
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
                              {list?.mainPost?.profile?.name
                                ? list?.mainPost?.profile?.name
                                : "Anonymous"}
                            </Text>
                            {verified.includes(
                              list?.mainPost?.profile?.handle
                            ) && (
                              <MdVerified
                                style={{ marginLeft: "5px" }}
                                color={"#8B5CF6"}
                              />
                            )}
                            {staff.includes(
                              list?.mainPost?.profile?.handle
                            ) && (
                              <AiFillSafetyCertificate
                                style={{ marginLeft: "5px" }}
                                color={"#11B981"}
                              />
                            )}
                          </Flex>
                          <BsDot color={"grey"} />
                          <Text fontSize={"14px"} color={"grey"}>
                            {moment(new Date(list?.mainPost?.createdAt)).format(
                              "MMMM DD YYYY"
                            )}
                          </Text>
                        </Flex>
                        <Text fontSize={"14px"} className={"brand"}>
                          {`@${list?.mainPost?.profile?.handle}`}
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                  <Box
                    mt={"1em"}
                    ml={"4em"}
                    bg={"white"}
                    borderRadius={"10px"}
                    border={"1px solid #E4E4E7"}
                    p={"1em"}
                    w={"90%"}
                  >
                    <Blog list={list?.mainPost} />
                  </Box>
                </Box>
                <Divider
                  position={"absolute"}
                  bottom={"-26px"}
                  ml={"1.5em"}
                  orientation="vertical"
                  h="165px"
                  w={"min-content"}
                  borderColor={"blackAlpha.600"}
                />
              </Box>
              <Box mt="30px">
                <Link href={`/profile/${list?.profile?.handle}`}>
                  <Flex>
                    <Image
                      src={
                        list.profile?.picture
                          ? list.profile?.picture?.original?.url
                          : `/assets/man.png`
                      }
                      height={45}
                      width={45}
                      style={{ borderRadius: "50%" }}
                    />
                    <Box flex={1} ml={"20px"}>
                      <Flex alignItems={"center"}>
                        <Flex alignItems={"center"}>
                          <Text
                            fontWeight={600}
                            textTransform={"capitalize"}
                            fontSize={"16px"}
                          >
                            {list.profile?.name
                              ? list.profile?.name
                              : "Anonymous"}
                          </Text>
                          {verified.includes(list.profile?.handle) && (
                            <MdVerified
                              style={{ marginLeft: "5px" }}
                              color={"#8B5CF6"}
                            />
                          )}
                          {staff.includes(list.profile?.handle) && (
                            <AiFillSafetyCertificate
                              style={{ marginLeft: "5px" }}
                              color={"#11B981"}
                            />
                          )}
                        </Flex>
                        <BsDot color={"grey"} />
                        <Text fontSize={"14px"} color={"grey"}>
                          {moment(new Date(list.createdAt)).fromNow()}
                        </Text>
                      </Flex>
                      <Text fontSize={"14px"} className={"brand"}>
                        {`@${list.profile?.handle}`}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
                <Text
                  ml={"3.5em"}
                  mt={"1em"}
                  fontWeight={500}
                  fontSize={"18px"}
                >
                  {list?.metadata?.content}
                </Text>
              </Box>
            </Box>
          );
        })
      ) : (
        <>
          <Flex
            mt="5em"
            ml={"-20%"}
            justifyContent="center"
            flexDir="column"
            alignItems="center"
          >
            <Image src={"/assets/no-results.png"} height={100} width={100} />
            <Heading fontSize="1.5em" fontFamily={"Miriam Libre"} pt="1em">
              No Comments
            </Heading>
          </Flex>
        </>
      )}
    </>
  );
}

export default Comments;
