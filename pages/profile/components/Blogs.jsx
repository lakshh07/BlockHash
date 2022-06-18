import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { TbMessages, TbDots } from "react-icons/tb";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GetContent, { GetTags } from "./GetContent";
import { staff, verified } from "../../../utils/recognition";
import Clap from "../../components/Clap";

function Blogs({ publications }) {
  const toast = useToast();

  if (publications?.length == "0") {
    return (
      <Flex
        mt="5em"
        ml={"-20%"}
        justifyContent="center"
        flexDir="column"
        alignItems="center"
      >
        <Image src={"/assets/no-results.png"} height={100} width={100} />
        <Heading fontSize="1.5em" fontFamily={"Miriam Libre"} pt="1em">
          No Blogs
        </Heading>
      </Flex>
    );
  }

  if (publications) {
    return publications.map((list, index) => {
      return (
        <Box key={index} mb={"20px"}>
          <Link href={`/profile/${list?.profile?.handle}`}>
            <Flex h={"45px"}>
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
              <Box ml={"20px"} flex={1}>
                <Flex alignItems={"center"}>
                  <Flex alignItems={"center"}>
                    <Text
                      fontWeight={600}
                      textTransform={"capitalize"}
                      fontSize={"16px"}
                      mb={"0px"}
                    >
                      {list.profile?.name ? list.profile?.name : "Anonymous"}
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
                  <Text mb={"0px"} fontSize={"14px"} color={"grey"}>
                    {moment(new Date(list.createdAt)).format("MMMM DD YYYY")}
                  </Text>
                </Flex>
                <Text fontSize={"14px"} className={"brand"}>
                  {`@${list.profile?.handle}`}
                </Text>
              </Box>
            </Flex>
          </Link>
          <Flex
            mt="25px"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box w={"550px"}>
              <Link
                href={`/blog/${list?.profile?.handle}/${list.id}`}
                isExternal
              >
                <Heading fontWeight={700} fontSize={"20px"}>
                  {list.metadata.description}
                </Heading>
                <Text
                  mt="10px"
                  color={"grey"}
                  fontWeight={400}
                  fontSize={"16px"}
                >
                  <GetContent url={list.metadata.content} />
                </Text>
              </Link>
              <Flex mt={"20px"} justifyContent={"flex-start"} w={"500px"}>
                <GetTags url={list.metadata.content} />
              </Flex>

              <Box mt="20px" ml="20px">
                <Flex alignItems={"center"}>
                  <IconButton
                    color="purple.700"
                    variant={"ghost"}
                    icon={<Clap size={20} color={"#553C9A"} />}
                    fontWeight={500}
                    fontSize={"16px"}
                    mr={"40px"}
                    pointerEvents={"none"}
                  />
                  <IconButton
                    color="#0177FF"
                    variant={"ghost"}
                    icon={<TbMessages />}
                    fontWeight={500}
                    fontSize={"18px"}
                    mr={"40px"}
                    pointerEvents={"none"}
                  />
                  <IconButton
                    color="orange"
                    variant={"ghost"}
                    icon={<CgArrowsExchangeAlt />}
                    fontWeight={500}
                    fontSize={"18px"}
                    mr={"40px"}
                    pointerEvents={"none"}
                  />

                  <Menu autoSelect={false}>
                    <MenuButton>
                      <IconButton
                        ml={"10px"}
                        mr={"20px"}
                        variant={"ghost"}
                        icon={<TbDots color="grey" />}
                      ></IconButton>
                    </MenuButton>
                    <MenuList>
                      <CopyToClipboard
                        text={`${process.env.NEXT_PUBLIC_URL}/blog/${list?.profile?.handle}/${list.id}`}
                        onCopy={() =>
                          toast({
                            title: "Copied 👍🏻",
                            status: "success",
                            duration: 4000,
                            isClosable: false,
                            position: "top",
                          })
                        }
                      >
                        <MenuItem icon={<HiOutlineClipboardCopy />}>
                          Permalink
                        </MenuItem>
                      </CopyToClipboard>
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>
            </Box>

            <Box
              mr={"12px"}
              bg={"white"}
              w={"270px"}
              h={"170px"}
              ml={"25px"}
              borderRadius={"5px"}
              backgroundImage={
                list.metadata.media[0] && list.metadata.media[0].original.url
              }
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
            ></Box>
          </Flex>

          {publications?.length === index + 1 ? null : <Divider my={"20px"} />}
        </Box>
      );
    });
  }
}

export default Blogs;
