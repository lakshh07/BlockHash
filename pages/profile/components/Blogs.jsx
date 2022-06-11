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
  Tag,
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
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Blogs({ publications }) {
  const [data, setData] = useState(true);
  const [content, setContent] = useState();
  const toast = useToast();

  function fetchContent(url) {
    axios(url, { crossdomain: true })
      .then((response) => {
        // console.log(response.data);
        setContent(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };

  if (publications?.length == "0") {
    return (
      <Flex
        mt="5em"
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
            <Box ml={"20px"}>
              <Flex alignItems={"center"}>
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={600}
                    textTransform={"capitalize"}
                    fontSize={"16px"}
                  >
                    {list.profile?.name ? list.profile?.name : "Anonymous"}
                  </Text>
                  <MdVerified style={{ marginLeft: "5px" }} color={"#8B5CF6"} />
                  <AiFillSafetyCertificate
                    style={{ marginLeft: "5px" }}
                    color={"#11B981"}
                  />
                </Flex>
                <BsDot color={"grey"} />
                <Text fontSize={"14px"} color={"grey"}>
                  {moment(list.createdAt).fromNow()}
                </Text>
              </Flex>
              <Text fontSize={"14px"} className={"brand"}>
                {`@${list.profile?.handle}`}
              </Text>
            </Box>
          </Flex>
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
                  {fetchContent(list.metadata.content)}
                  {content?.description
                    ? `${htmlFrom(content?.description?.substring(0, 200))}....`
                    : `${htmlFrom(content?.content?.substring(0, 200))}...`}
                </Text>
              </Link>
              <Flex mt={"20px"} justifyContent={"flex-start"} w={"500px"}>
                {content?.tags.map((tagList, index) => {
                  return (
                    <Tag
                      mr={"10px"}
                      fontSize={"14px"}
                      key={index}
                      color={"blackAlpha.700"}
                      textTransform="lowercase"
                      cursor={"pointer"}
                    >
                      {`#${tagList}`}
                    </Tag>
                  );
                })}
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
                    3
                  </Button>
                  <Button
                    color="purple.700"
                    variant={"ghost"}
                    leftIcon={<CgArrowsExchangeAlt />}
                    fontWeight={500}
                    fontSize={"16px"}
                    mr={"20px"}
                  >
                    3
                  </Button>
                  <Menu>
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
        // </Link>
      );
    });
  }
}

export default Blogs;
