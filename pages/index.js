import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner, useConnect } from "wagmi";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSignerContext } from "../context/signer";
import Lottie from "react-lottie";
import hero from "../public/assets/hero2.json";
import logo from "../public/assets/logo/logo.json";
import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUp";
import { useLoadingContext } from "../context/loading";

function Home() {
  const { setWallet, wallet } = useSignerContext();
  const { data: signer } = useSigner();
  const { setLoading } = useLoadingContext();
  const { data } = useAccount();
  const { isConnected } = useConnect();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    router.prefetch("/feed");
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    console.log(wallet);
  }, [wallet.signer]);

  useEffect(() => {
    setWallet({ signer: signer, address: data?.address });
  }, [signer]);

  // useEffect(() => {
  //   const handleRouteChange = async (url, { shallow }) => {
  //     setWallet({ signer: signer, address: data?.address });
  //   };
  //   router.events.on("routeChangeStart", handleRouteChange);
  // }, [signer]);

  function goToFeed() {
    if (isConnected && wallet.signer) {
      setLoading(true);
      router.push("/feed");
      setLoading(true);
    } else {
      toast({
        title: "Wallet Not Connected !",
        description: "Please connect your wallet first.",
        status: "error",
        duration: 5000,
        isClosable: false,
        position: "top",
      });
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hero,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: logo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Box m="0" p="0.5em" position="relative" top="0" w="100%" bg="#77787A">
        <Box
          mx="auto"
          bg="whitesmoke"
          className="hero"
          rounded="5px"
          h={"98vh"}
          w={"100%"}
          overflow={"hidden"}
        >
          <Box className="blur-box">
            <Flex
              w={"1250px"}
              mx={"auto"}
              py={"1.2em"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex alignItems={"center"}>
                <Lottie options={defaultOptions2} height={40} width={40} />
                <Heading ml={"5px"} pt="5px" fontFamily="Miriam Libre">
                  BlockHash
                </Heading>
              </Flex>

              <Button variant={"ghost"}>
                <ConnectButton />
              </Button>
            </Flex>
            <Divider mx={"auto"} w={"90%"} borderColor={"blackAlpha.400"} />
            <Box align="center">
              <Box pt={"3em"}>
                <Heading
                  fontSize="5em"
                  fontWeight={500}
                  className="h-shadow"
                  fontFamily="Miriam Libre"
                  textAlign={"center"}
                >
                  <span
                    style={{
                      color: "#0177FF",
                    }}
                    className="h-span"
                  >
                    Home
                  </span>{" "}
                  for writers and readers{" "}
                </Heading>

                <Text
                  mt={"0.4em"}
                  textAlign={"center"}
                  fontSize="20px"
                  fontFamily="Miriam Libre"
                >
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </Text>
              </Box>
              <Button
                color={"white"}
                bg={"#0177FF"}
                fontFamily="Miriam Libre"
                borderRadius={"10px"}
                mt={"2em"}
                zIndex={"99"}
                rightIcon={
                  <Box transform="rotate(90deg)">
                    <UseAnimations
                      strokeColor={"white"}
                      animation={arrowUp}
                      wrapperStyle={{
                        marginRight: "-5px",
                        marginTop: "-10px",
                        marginLeft: "-5.5px",
                      }}
                    />
                  </Box>
                }
                _hover={{
                  bg: "#0177FF",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                onClick={goToFeed}
              >
                Get&apos;s Started
              </Button>
              <Box
                align="center"
                w={"min-content"}
                mx={"auto"}
                h={"min-content"}
                mt={"-3em"}
                cursor={"none"}
              >
                <Lottie options={defaultOptions} height={550} width={550} />
              </Box>
            </Box>
            {/* <Grid
              // h={"50%"}
              mx="6.5%"
              justifyContent={"center"}
              alignItems="center"
            >
              <GridItem pt={"4em"}>
                <Heading
                  fontSize="5em"
                  fontWeight={500}
                  className="h-shadow"
                  fontFamily="Montserrat"
                  textAlign={"center"}
                >
                  Home for writers and readers{" "}
                </Heading>

                <Text
                  textAlign={"center"}
                  fontSize="20px"
                  fontFamily="Montserrat"
                >
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </Text>
              </GridItem>
              <Button></Button>
              <GridItem>
                <Box
                  align="center"
                  w={"min-content"}
                  mx={"auto"}
                  h={"min-content"}
                >
                  <Lottie options={defaultOptions} height={550} width={550} />
                </Box>
              </GridItem>
            </Grid> */}
          </Box>
          {/* <ConnectButton /> */}

          {/* <Button
        onClick={() => {
          createBlog("0x0437", data?.address, signer);
        }}
      >
        Publish
      </Button> */}
          {/* <Button
        onClick={() => {
          router.push("/feed");
        }}
      >
        go
      </Button> */}
        </Box>
      </Box>
    </>
  );
}
export default Home;
