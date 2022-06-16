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

function Mirror({ mirrorArray }) {
  const toast = useToast();
  console.log(mirrorArray);
  if (mirrorArray?.length == "0") {
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
          No Mirrors
        </Heading>
      </Flex>
    );
  }

  if (mirrorArray) {
    return mirrorArray.map((list, index) => {
      return (
        <Box key={index} mb={"20px"}>
          <Flex mb={"1.5em"} color={" rgb(113,113,122)"} alignItems={"center"}>
            <CgArrowsExchangeAlt fontSize={"18px"} />

            <Text
              ml={"5px"}
              fontWeight={500}
              fontFamily={"Montserrat"}
              fontSize={"14px"}
            >
              <strong>
                <Link href={`/profile/${list?.profile?.handle}`}>
                  {list?.profile?.name
                    ? list?.profile?.name
                    : list?.profile?.handle}
                </Link>
              </strong>
              &nbsp;mirrored the&nbsp;
              <strong>
                <Link
                  isExternal
                  href={`/blog/${list?.profile?.handle}/${list?.id}`}
                >
                  blog
                </Link>
              </strong>
            </Text>
          </Flex>

          <Link href={`/profile/${list?.mirrorOf?.profile?.handle}`}>
            <Flex h={"45px"}>
              <Image
                src={
                  list.mirrorOf?.profile?.picture
                    ? list.mirrorOf?.profile?.picture?.original?.url
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
                      {list.mirrorOf?.profile?.name
                        ? list.mirrorOf?.profile?.name
                        : "Anonymous"}
                    </Text>

                    {verified.includes(list.mirrorOf?.profile?.handle) && (
                      <MdVerified
                        style={{ marginLeft: "5px" }}
                        color={"#8B5CF6"}
                      />
                    )}
                    {staff.includes(list.mirrorOf?.profile?.handle) && (
                      <AiFillSafetyCertificate
                        style={{ marginLeft: "5px" }}
                        color={"#11B981"}
                      />
                    )}
                  </Flex>
                  <BsDot color={"grey"} />
                  <Text mb={"0px"} fontSize={"14px"} color={"grey"}>
                    {moment(new Date(list.mirrorOf?.createdAt)).format(
                      "MMMM DD YYYY"
                    )}
                  </Text>
                </Flex>
                <Text fontSize={"14px"} className={"brand"}>
                  {`@${list.mirrorOf?.profile?.handle}`}
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
                href={`/blog/${list?.mirrorOf?.profile?.handle}/${list.mirrorOf?.id}`}
                isExternal
              >
                <Heading fontWeight={700} fontSize={"20px"}>
                  {list.mirrorOf?.metadata.description}
                </Heading>
                <Text
                  mt="10px"
                  color={"grey"}
                  fontWeight={400}
                  fontSize={"16px"}
                >
                  <GetContent url={list.mirrorOf?.metadata.content} />
                </Text>
              </Link>
              <Flex mt={"20px"} justifyContent={"flex-start"} w={"500px"}>
                <GetTags url={list.mirrorOf?.metadata.content} />
              </Flex>

              <Box mt="20px" ml="20px">
                <Flex alignItems={"center"}>
                  <Button
                    color="#0177FF"
                    variant={"ghost"}
                    leftIcon={<TbMessages />}
                    fontWeight={500}
                    fontSize={"16px"}
                    mr={"20px"}
                  >
                    {list?.mirrorOf?.stats?.totalAmountOfComments}
                  </Button>
                  <Button
                    color="purple.700"
                    variant={"ghost"}
                    leftIcon={<CgArrowsExchangeAlt />}
                    fontWeight={500}
                    fontSize={"16px"}
                    mr={"20px"}
                  >
                    {list?.mirrorOf?.stats?.totalAmountOfMirrors}
                  </Button>
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
                        text={`${process.env.NEXT_PUBLIC_URL}/blog/${list?.mirrorOf?.profile?.handle}/${list.mirrorOf?.id}`}
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
                list.mirrorOf?.metadata.media[0] &&
                list.mirrorOf?.metadata.media[0].original.url
              }
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
            ></Box>
          </Flex>

          {mirrorArray?.length === index + 1 ? null : <Divider my={"20px"} />}
        </Box>
      );
    });
  }
}

export default Mirror;
