import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbBrandTelegram } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import { createComment } from "../../helpers/comment";
import { useAccount, useSigner } from "wagmi";
import { getComments } from "../api";
import { useQuery } from "urql";

function Comments({ pubData }) {
  const [content, setContent] = useState("");
  const [checker, setChecker] = useState(false);
  const toast = useToast();
  const { data } = useAccount();
  const { data: signer } = useSigner();

  const [result] = useQuery({
    query: getComments,
    variables: {
      request: { commentsOf: pubData?.data?.publication?.id },
    },
  });

  async function postComment() {
    setChecker(true);
    const description = "BlockHash blog comment";
    console.log(content);
    const result = await createComment(
      pubData?.data?.publication?.profile?.id,
      pubData?.data?.publication?.id,
      data?.address,
      signer,
      content,
      description
    );

    console.log("result", result);
    toast({
      title: "Success",
      description: "Comment posted!",
      status: "success",
      duration: 5000,
      isClosable: false,
      position: "top",
    });
    setChecker(false);
  }
  return (
    <>
      <Box
        bg={"white"}
        mt="1rem"
        borderRadius={"10px"}
        border={"1px solid #E4E4E7"}
        p={"2em"}
      >
        <Accordion allowToggle>
          <AccordionItem position={"relative"} border={"none"}>
            <Flex
              alignItems={"center"}
              w={"100%"}
              justifyContent={"space-between"}
            >
              <Heading
                flex={4}
                fontFamily={"Montserrat"}
                fontSize={"24px"}
                fontWeight={600}
              >
                Comments ({result?.data?.publications?.items?.length})
              </Heading>
              <AccordionButton
                p={"0"}
                _hover={{ backgroundColor: "none" }}
                flex={1}
              >
                <Button
                  leftIcon={<AiOutlinePlus />}
                  color={"rgb(1, 119, 255)"}
                  border={"1px solid rgb(1, 119, 255)"}
                  bg={"transparent"}
                  _hover={{ backgroundColor: "none" }}
                >
                  Write Comment
                </Button>
              </AccordionButton>
            </Flex>

            <AccordionPanel
              bg={"white"}
              mt="2rem"
              borderRadius={"10px"}
              border={"1px solid #E4E4E7"}
              p={"0.5em 1.5em 1.5em"}
            >
              <Box align={"right"} position={"relative"}>
                <Flex mt={"10px"} mb={"1.5em"} alignItems={"center"}>
                  <Image
                    src={
                      pubData?.data?.publication?.profile?.picture
                        ? pubData?.data?.publication?.profile?.picture?.original
                            ?.url
                        : `/assets/man.png`
                    }
                    height={45}
                    width={45}
                    style={{ borderRadius: "50%" }}
                  />
                  <Text
                    ml={"10px"}
                    flex={1}
                    textAlign={"left"}
                    fontSize={"14px"}
                    className={"brand"}
                  >
                    {`@${pubData?.data?.publication?.profile?.handle}`}
                  </Text>
                </Flex>
                <Textarea
                  variant={"unstyled"}
                  placeholder="Tell something cool"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button
                  mt={"1.2em"}
                  color={"rgb(1, 119, 255)"}
                  border={"1px solid rgb(1, 119, 255)"}
                  bg={"transparent"}
                  rightIcon={<TbBrandTelegram />}
                  onClick={postComment}
                  isLoading={checker}
                >
                  {" "}
                  Post
                </Button>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      {result?.fetching ? (
        <Box
          bg={"white"}
          mt="1rem"
          borderRadius={"10px"}
          border={"1px solid #E4E4E7"}
          p={"2em"}
        >
          <Spinner />
        </Box>
      ) : (
        result?.data?.publications?.items?.map((list, index) => {
          return (
            <Box
              bg={"white"}
              mt="1rem"
              borderRadius={"10px"}
              border={"1px solid #E4E4E7"}
              p={"2em"}
              key={index}
            >
              <Flex justifyContent={"space-between"}>
                <Flex flex={1} alignItems={"center"}>
                  <Image
                    src={
                      list?.profile?.picture
                        ? list?.profile?.picture?.original?.url
                        : `/assets/man.png`
                    }
                    height={45}
                    width={45}
                    style={{ borderRadius: "50%" }}
                  />
                  <Box ml={"10px"} flex={1}>
                    <Flex alignItems={"center"}>
                      <Flex alignItems={"center"}>
                        <Text
                          fontWeight={600}
                          textTransform={"capitalize"}
                          fontSize={"16px"}
                          textAlign={"left"}
                        >
                          {list?.profile?.name
                            ? list?.profile?.name
                            : "Anonymous"}
                        </Text>
                      </Flex>
                    </Flex>
                    <Text
                      flex={1}
                      textAlign={"left"}
                      fontSize={"14px"}
                      className={"brand"}
                    >
                      {`@${list?.profile?.handle}`}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text fontSize={"16px"} color={"blackAlpha.800"}>
                    {moment(new Date(`${list?.createdAt}`)).fromNow()}
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Text
                  my={"1em"}
                  mx={"6%"}
                  fontFamily={"Montserrat"}
                  fontSize={"18px"}
                >
                  {list?.metadata?.content}
                </Text>
              </Box>
            </Box>
          );
        })
      )}
    </>
  );
}

export default Comments;
