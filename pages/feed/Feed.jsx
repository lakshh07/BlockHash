import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  Link,
  Icon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiFillSafetyCertificate, AiTwotoneExperiment } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import { FaRegNewspaper } from "react-icons/fa";
import Blogs from "../profile/components/Blogs";
import { BsDot } from "react-icons/bs";
import { useAccount, useSigner } from "wagmi";
import { useSignerContext } from "../../context/signer";
import { getRecommendedProfiles } from "../../helpers/recommended-profile";
import { useLoadingContext } from "../../context/loading";
import { basicClient, explorePublications } from "../api";
import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUp";

export default function Feed(props) {
  const [pub, setPub] = useState([]);
  const { wallet } = useSignerContext();
  const { setLoading } = useLoadingContext();
  const { data: signer } = useSigner();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    get();
    // console.log(signer);
  }, [signer]);

  async function get() {
    const data = await getRecommendedProfiles();
    console.log(data);
    // console.log(wallet);
    setProfiles(data.data);
    const pubs = await basicClient.query(explorePublications).toPromise();
    const newPub = pubs.data.explorePublications.items.filter((list) => {
      return list.metadata.content !== "This publication has been hidden";
    });
    setPub(newPub);
    console.log(pubs);
  }

  return (
    <>
      <Box bg={"whiteSmoke"}>
        <Container mx={"auto"} maxW={"1350"}>
          <Grid templateColumns={"2.4fr 1fr"} pb={"3em"}>
            <GridItem mt={"2rem"}>
              <Flex alignItems={"center"} ml={"1em"}>
                <FaRegNewspaper fontSize={"18px"} />
                <Heading ml={"5px"} fontWeight={500} fontSize={"18px"}>
                  Latest Blogs
                </Heading>
              </Flex>

              <Box
                bg={"white"}
                mt="1rem"
                borderRadius={"10px"}
                border={"1px solid #E4E4E7"}
                p={"2em 2em 0 2em"}
              >
                <Blogs publications={pub} />
              </Box>
            </GridItem>
            <GridItem mt={"4.3rem"} ml={"2em"}>
              <Box
                bg={"#FEFCE8"}
                borderRadius={"10px"}
                border={"1px solid #CA8A03"}
                p={"2em"}
              >
                <Flex alignItems={"center"}>
                  <AiTwotoneExperiment fontSize={"14px"} color={"#CA8A03"} />
                  <Heading fontSize={"16px"} ml={"5px"} color={"#CA8A03"}>
                    Testnet Beta Warning!
                  </Heading>
                </Flex>

                <Text mt={"12px"} fontSize={"14px"} color={"#CA8A03"}>
                  BlockHash is still in the beta phase, things may break, please
                  handle us with care.
                </Text>
              </Box>

              <Flex alignItems={"center"} mt="2em">
                <GiElectric
                  fontSize={"18px"}
                  color={"orange"}
                  style={{ transform: "rotate(25deg)" }}
                />
                <Heading ml={"5px"} fontWeight={500} fontSize={"18px"}>
                  Recommended users
                </Heading>
              </Flex>

              <Box
                bg={"white"}
                borderRadius={"10px"}
                border={"1px solid #E4E4E7"}
                p={"2em 2em 1em"}
                mt={"1em"}
              >
                {profiles &&
                  profiles?.recommendedProfiles
                    ?.filter((list) => {
                      return list.name && list.handle != undefined;
                    })
                    .slice(0, 6)
                    .map((list, index) => {
                      return (
                        <Link key={index} href={`/profile/${list.handle}`}>
                          <Grid
                            templateColumns={"7fr 1fr"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            mb={"1em"}
                          >
                            <Flex flex={2}>
                              <img
                                style={{
                                  height: "45px",
                                  width: "45px",
                                  borderRadius: "50%",
                                }}
                                src={list?.picture?.original?.url}
                              />

                              <Box ml={"10px"} flex={1}>
                                <Flex alignItems={"center"}>
                                  <Flex alignItems={"center"}>
                                    <Text
                                      fontWeight={600}
                                      textTransform={"capitalize"}
                                      fontSize={"15px"}
                                    >
                                      {list.name}
                                    </Text>
                                    <MdVerified
                                      style={{ marginLeft: "5px" }}
                                      color={"#8B5CF6"}
                                    />
                                    <AiFillSafetyCertificate
                                      style={{ marginLeft: "5px" }}
                                      color={"#11B981"}
                                    />
                                  </Flex>
                                </Flex>
                                <Text fontSize={"13px"} className={"brand"}>
                                  {`@${list.handle}`}
                                </Text>
                              </Box>
                            </Flex>
                            <IconButton
                              variant={"ghost"}
                              icon={
                                <Box transform="rotate(90deg)">
                                  <UseAnimations
                                    strokeColor={"grey"}
                                    animation={arrowUp}
                                    wrapperStyle={{
                                      marginRight: "-5px",
                                      marginTop: "-10px",
                                      marginLeft: "-5.5px",
                                    }}
                                  />
                                </Box>
                              }
                            />
                          </Grid>
                        </Link>
                      );
                    })}
              </Box>
              <Flex
                mt={"1.5em"}
                position={"sticky"}
                top={"10px"}
                alignItems={"center"}
                ml={"0.5em"}
              >
                <Heading
                  fontSize={"14px"}
                  fontWeight={600}
                  color={"blackAlpha.600"}
                >
                  &copy; BlockHash
                </Heading>
                <BsDot color={"grey"} />
                <Heading
                  fontSize={"14px"}
                  fontWeight={"400"}
                  fontFamily={"Raleway"}
                  color={"blackAlpha.900"}
                >
                  Build with 💜 by{" "}
                  <Link href="https://twitter.com/LakshayMaini_" isExternal>
                    Lakshay.
                  </Link>
                </Heading>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}