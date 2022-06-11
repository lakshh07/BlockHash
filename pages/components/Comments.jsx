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
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { TbBrandTelegram } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";

function Comments({ result }) {
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
                Comments (4)
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
                      result?.data?.publication?.profile?.picture
                        ? result?.data?.publication?.profile?.picture?.original
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
                    {`@${result?.data?.publication?.profile?.handle}`}
                  </Text>
                </Flex>
                <Textarea
                  variant={"unstyled"}
                  placeholder="Tell something cool"
                />
                <Button
                  mt={"1.2em"}
                  color={"rgb(1, 119, 255)"}
                  border={"1px solid rgb(1, 119, 255)"}
                  bg={"transparent"}
                  rightIcon={<TbBrandTelegram />}
                >
                  {" "}
                  Post
                </Button>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box
        bg={"white"}
        mt="1rem"
        borderRadius={"10px"}
        border={"1px solid #E4E4E7"}
        p={"2em"}
      >
        <Flex justifyContent={"space-between"}>
          <Flex flex={1} alignItems={"center"}>
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
            <Box ml={"10px"} flex={1}>
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
          </Flex>
          <Box>
            <Text fontSize={"16px"} color={"blackAlpha.800"}>
              {moment(`${result?.data?.publication?.createdAt}`).format(
                "MMMM Do YYYY"
              )}
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
            Really amazing and detailed blog. Definitely helpful to beginners in
            Front end development. Well done!
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default Comments;
