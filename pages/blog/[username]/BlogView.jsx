import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  AiFillSafetyCertificate,
  AiOutlineDownCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useLoadingContext } from "../../../context/loading";
import { getPublication } from "../../api";
import { useQuery } from "urql";
import moment from "moment";
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { useAccount } from "wagmi";
import { deletePublication } from "../../../helpers/deleteBlog";
import Comments from "../../components/Comments";

function BlogView() {
  const router = useRouter();
  const { setLoading } = useLoadingContext();
  const [content, setContent] = useState("");
  const { username, id } = router.query;
  const { data } = useAccount();
  const toast = useToast();

  useEffect(() => {
    if (username && id) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [username, id]);

  const publicationId = id;
  const [result] = useQuery({
    query: getPublication,
    variables: {
      request: {
        publicationId,
      },
    },
  });

  function fetchContent(url) {
    axios(url)
      .then((response) => {
        // console.log(response.data);
        setContent(response.data);
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

  return (
    <>
      <Box py={"2em"} pb={"5em"} mx={"auto"} bg={"rgb(252,252,252)"}>
        <Box justifyContent={"center"} align={"center"} mx={"auto"}>
          {result?.data?.publication?.metadata?.media[0] && (
            <Box
              bg={"white"}
              w={"900px"}
              h={"400px"}
              mx={"auto"}
              borderRadius={"10px"}
              backgroundImage={
                result?.data?.publication?.metadata?.media[0] &&
                result?.data?.publication?.metadata?.media[0]?.original?.url
              }
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
            ></Box>
          )}

          <Heading
            w={"55%"}
            mt={"1em"}
            fontSize={"46px"}
            fontWeight={600}
            fontFamily={"Montserrat"}
            textAlign={"center"}
          >
            {result?.data?.publication?.metadata?.description}
          </Heading>
          <Heading
            w={"55%"}
            mt={"1em"}
            fontFamily={"Montserrat"}
            fontSize={"28px"}
            fontWeight={400}
            color="#374151"
            textAlign={"center"}
            mb={"1.5em"}
          >
            {fetchContent(result?.data?.publication?.metadata?.content)}
            {content?.subtitle && content?.subtitle}
          </Heading>

          <Flex
            justifyContent={"center"}
            mt={"2.5em"}
            alignItems={"center"}
            // w={"23%"}
          >
            <Image
              src={
                result?.data?.publication?.profile?.picture
                  ? result?.data?.publication?.profile?.picture?.original?.url
                  : `/assets/man.png`
              }
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
                    {result?.data?.publication?.profile?.name
                      ? result?.data?.publication?.profile?.name
                      : "Anonymous"}
                  </Text>
                  <MdVerified style={{ marginLeft: "5px" }} color={"#8B5CF6"} />
                  <AiFillSafetyCertificate
                    style={{ marginLeft: "5px" }}
                    color={"#11B981"}
                  />
                </Flex>
              </Flex>
              <Text
                flex={1}
                textAlign={"left"}
                fontSize={"14px"}
                className={"brand"}
              >
                {`@${result?.data?.publication?.profile?.handle}`}
              </Text>
            </Box>
            <BsDot style={{ marginRight: "0.5em", marginLeft: "0.5em" }} />
            <Text fontSize={"16px"} color={"blackAlpha.800"}>
              {moment(`${result?.data?.publication?.createdAt}`).format(
                "MMMM Do YYYY"
              )}
            </Text>
            {result?.data?.publication?.profile?.ownedBy === data?.address && (
              <Flex alignItems={"center"}>
                <BsDot style={{ marginRight: "0.5em", marginLeft: "0.5em" }} />
                <Flex
                  border={"1px solid #E4E4E7"}
                  ml={"5px"}
                  alignItems={"center"}
                  borderRadius={"10px"}
                  pr={"5px"}
                >
                  <Button
                    color={"blackAlpha.600"}
                    variant={"ghost"}
                    _hover={{ backgroundColor: "transparent" }}
                    _focus={{ border: "none" }}
                    leftIcon={<AiOutlineEdit />}
                  >
                    Edit
                  </Button>

                  <Menu>
                    <MenuButton
                      _hover={{
                        padding: "2px 0 2px 0",
                        borderRadius: "20px",
                        backgroundColor: "#E4E7EB",
                        height: "min-content",
                        width: "min-content",
                      }}
                    >
                      <Button
                        h={"min-content"}
                        w={"min-content"}
                        ml={"-10px"}
                        mr={"-5px"}
                        color={"blackAlpha.600"}
                        variant={"ghost"}
                        _hover={{
                          backgroundColor: "none",
                        }}
                        leftIcon={<AiOutlineDownCircle />}
                      >
                        More
                      </Button>
                    </MenuButton>
                    <MenuList>
                      <MenuItem icon={<AiOutlineEdit color="#0177FF" />}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={async () => {
                          const hash = await deletePublication(
                            data?.address,
                            result?.data?.publication?.id
                          );
                          hash &&
                            toast({
                              title: "Success",
                              description: "Post deleted!",
                              status: "success",
                              duration: 4000,
                              isClosable: false,
                              position: "top",
                            });
                          setTimeout(() => {
                            router.push("/feed");
                          }, 3000);
                        }}
                        icon={<RiDeleteBin5Line color="red" />}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
            )}
          </Flex>

          <Box
            mx={"auto"}
            mt={"5em"}
            textAlign={"left"}
            maxW={"1000px"}
            className={"blogContent"}
          >
            {fetchContent(result?.data?.publication?.metadata?.content)}
            {htmlFrom(content?.content)}
          </Box>
        </Box>
        <Flex
          mt={"5em"}
          maxW={"1000px"}
          justifyContent={"flex-start"}
          mx={"auto"}
          // w={"500px"}
        >
          {content?.tags?.map((tagList, index) => {
            return (
              <Tag
                textAlign={"left"}
                mr={"10px"}
                fontSize={"18px"}
                key={index}
                p={"5px"}
                color={"blackAlpha.700"}
                textTransform="lowercase"
                cursor={"pointer"}
              >
                {`#${tagList}`}
              </Tag>
            );
          })}
        </Flex>

        <Box maxW={"1000px"} mx={"auto"} mt={"5em"}>
          <Comments result={result} />
        </Box>
      </Box>
    </>
  );
}

export default BlogView;