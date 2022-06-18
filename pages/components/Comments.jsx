import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { TbBrandTelegram, TbMessages } from "react-icons/tb";
import { AiFillSafetyCertificate, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import { createComment } from "../../helpers/comment";
import {
  useAccount,
  useSigner,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getComments } from "../api";
import { useQuery } from "urql";
import { useProfileContext } from "../../context/profile";
import { staff, verified } from "../../utils/recognition";
import { MdVerified } from "react-icons/md";
import Clap from "./Clap";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { BlockHashAddress } from "../../utils/contractAddress";
import BlockHashContract from "../../artifacts/contracts/BlockHash.sol/BlockHash.json";
import { createMirror } from "../../helpers/mirror";

function Comments({ pubData }) {
  const [content, setContent] = useState("");
  const [checker, setChecker] = useState(false);
  const toast = useToast();
  const { data } = useAccount();
  const { data: signer } = useSigner();
  const { userProfile } = useProfileContext();

  const [result] = useQuery({
    query: getComments,
    variables: {
      request: { commentsOf: pubData?.data?.publication?.id },
    },
  });

  async function doMirror(pubId) {
    setChecker(true);
    // const pData = await getDefaultProfile(data?.address);
    const result = await createMirror(
      userProfile?.id,
      data?.address,
      signer,
      pubId
    );
    result && setChecker(false);
    result &&
      toast({
        title: "Success",
        description: "Blog Mirrored. Wait for indexing",
        status: "success",
        duration: 4000,
        isClosable: false,
        position: "top",
      });
  }

  const {
    data: fetchData,
    isError: fetchIsError,
    isFetching,
  } = useContractRead(
    {
      addressOrName: BlockHashAddress,
      contractInterface: BlockHashContract.abi,
    },
    "getClaps",
    {
      args: pubData?.data?.publication?.id,
    },
    {
      watch: true,
    }
  );

  const {
    data: clapData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    write,
  } = useContractWrite(
    {
      addressOrName: BlockHashAddress,
      contractInterface: BlockHashContract.abi,
    },
    "doClap",
    {
      args: pubData?.data?.publication?.id,
    }
  );

  const {
    data: postCheck,
    isError,
    isLoading,
    isFetched,
    isSuccess,
  } = useWaitForTransaction({
    hash: clapData?.hash,
  });

  useEffect(() => {
    isLoading &&
      toast({
        title: "Transaction Sent",
        description: "wait for success",
        status: "info",
        duration: 6000,
        isClosable: true,
        position: "top",
      });

    isSuccess &&
      toast({
        title: "Transaction Successfull",
        description: "wait for indexing",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
  }, [isSuccess, isLoading]);

  async function postComment() {
    setChecker(true);
    const description = "BlockHash blog comment";
    console.log(content);
    const result = await createComment(
      userProfile?.id,
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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
              <Flex alignItems={"center"} flex={4}>
                <Button
                  color="purple.700"
                  variant={"ghost"}
                  leftIcon={<Clap size={23} color={"#553C9A"} />}
                  fontWeight={500}
                  fontSize={"18px"}
                  mr={"20px"}
                  fontFamily={"Montserrat"}
                  isLoading={isFetching}
                  onClick={() => write()}
                >
                  ({fetchData?.length})
                </Button>

                <Button
                  color="orange"
                  variant={"ghost"}
                  leftIcon={<CgArrowsExchangeAlt fontSize={"25px"} />}
                  fontWeight={500}
                  fontSize={"18px"}
                  mr={"20px"}
                  isLoading={checker}
                  fontFamily={"Montserrat"}
                  onClick={() => doMirror(pubData?.data?.publication?.id)}
                >
                  ({pubData?.data?.publication?.stats?.totalAmountOfMirrors})
                </Button>
                <Button
                  color="#0177FF"
                  variant={"ghost"}
                  leftIcon={<TbMessages fontSize={"21px"} />}
                  fontWeight={500}
                  fontSize={"18px"}
                  mr={"20px"}
                  pointerEvents={"none"}
                  fontFamily={"Montserrat"}
                >
                  ({result?.data?.publications?.items?.length})
                </Button>
              </Flex>

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
                <Link href={`/profile/${userProfile?.handle}`}>
                  <Flex mt={"10px"} mb={"1.5em"} alignItems={"center"}>
                    <Image
                      src={
                        userProfile?.picture
                          ? userProfile?.picture?.original?.url
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
                      {`@${userProfile?.handle}`}
                    </Text>
                  </Flex>
                </Link>
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
                <Link href={`/profile/${list?.profile?.handle}`}>
                  <Flex alignItems={"center"}>
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
                    <Box ml={"10px"} w={"300px"}>
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
                        {verified.includes(list?.profile?.handle) && (
                          <MdVerified
                            style={{ marginLeft: "5px" }}
                            color={"#8B5CF6"}
                          />
                        )}
                        {staff.includes(list?.profile?.handle) && (
                          <AiFillSafetyCertificate
                            style={{ marginLeft: "5px" }}
                            color={"#11B981"}
                          />
                        )}
                      </Flex>

                      <Text
                        textAlign={"left"}
                        fontSize={"14px"}
                        className={"brand"}
                      >
                        {`@${list?.profile?.handle}`}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
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
