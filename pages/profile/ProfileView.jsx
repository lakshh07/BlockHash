import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Tooltip,
  Image,
  Link,
  useToast,
} from "@chakra-ui/react";
// import Image from "next/image";
import React, { useState, useEffect } from "react";
import ProfileData from "./ProfileData";
import { MdVerified } from "react-icons/md";
import { TbHash, TbWorld } from "react-icons/tb";
import {
  AiFillSafetyCertificate,
  AiOutlineUserAdd,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useRouter } from "next/router";
import {
  basicClient,
  getPublications,
  getProfileByHandle,
  doesFollow,
} from "../api";
import { useLoadingContext } from "../../context/loading";
import { useQuery } from "urql";
import { getDefaultProfile } from "../../helpers/getDefaultProfile";
import { follow } from "../../helpers/follow";
import { approveFollow } from "../../helpers/approveFollow";
import { unfollow } from "../../helpers/unfollow";
import { useAccount, useSigner } from "wagmi";
import Head from "next/head";
import { verified, staff } from "../../utils/recognition";

function ProfileView(props) {
  const [profile, setProfile] = useState([]);
  const [dprofile, setDProfile] = useState([]);
  const [publications, setPublications] = useState([]);
  const [commentsArray, setCommentsArray] = useState([]);
  const [mirrorArray, setMirrorArray] = useState([]);
  const router = useRouter();
  const { username } = router.query;
  const { setLoading } = useLoadingContext();
  const { data } = useAccount();
  const { data: signer } = useSigner();
  const toast = useToast();

  useEffect(() => {
    if (username) {
      fetchProfile(username);
    }
  }, [username]);

  const followInfos = [
    {
      followerAddress: data?.address,
      profileId: profile?.id,
    },
  ];
  const [result] = useQuery({
    query: doesFollow,
    variables: {
      request: {
        followInfos,
      },
    },
  });

  async function fetchProfile(handle) {
    try {
      const returnedProfile = await basicClient
        .query(getProfileByHandle, { handle })
        .toPromise();
      console.log(returnedProfile);
      const profileData = returnedProfile.data.profiles.items[0];
      console.log(profileData);
      setProfile(profileData);
      setLoading(false);

      const pData = await getDefaultProfile(data?.address);
      setDProfile(pData.defaultProfile);

      const id = profileData.id;
      const pubs = await basicClient
        .query(getPublications, { id, limit: 50 })
        .toPromise();
      const newPub = pubs.data.publications.items.filter((list) => {
        return list.metadata.content !== "This publication has been hidden";
      });
      const commentArray = newPub.filter((list) => {
        return list.__typename === "Comment";
      });
      const postArray = newPub.filter((list) => {
        return list.__typename === "Post";
      });
      const mirrorArray = newPub.filter((list) => {
        return list.__typename === "Mirror";
      });
      setPublications(postArray);
      setCommentsArray(commentArray);
      setMirrorArray(mirrorArray);
    } catch (err) {
      console.log("error fetching profile...", err);
    }
  }

  async function followRequest() {
    try {
      const txHash = await follow(profile?.id, data?.address, signer);
      txHash &&
        toast({
          title: "Success",
          description: `indexing your transaction`,
          status: "success",
          duration: 4000,
          isClosable: false,
          position: "top",
        });
      const approve = await approveFollow(data?.address);
      approve &&
        toast({
          title: "Success",
          description: `You followed ${profile?.handle}`,
          status: "success",
          duration: 4000,
          isClosable: false,
          position: "top",
        });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        {profile?.name ? (
          <title>{`${profile?.name ? profile?.name : "Anonymous"} (@${
            profile?.handle
          }) · BlockHash`}</title>
        ) : (
          <title>{`@${profile?.handle} · BlockHash`}</title>
        )}
        {profile?.bio && (
          <meta name="description" content={`${profile?.bio}`} key="desc" />
        )}
      </Head>
      <Box mb={"5em"}>
        <Box
          bg={"white"}
          w={"100%"}
          h={"300px"}
          backgroundImage={
            profile?.coverPicture
              ? profile?.coverPicture?.original?.url
              : "/assets/bright-squares.png"
          }
          backgroundPosition={"center"}
          backgroundColor="#662EA7"
          backgroundRepeat={profile?.coverPicture ? "no-repeat" : "repeat"}
          backgroundSize={profile?.coverPicture ? "cover" : "30%"}
        ></Box>
        <Container maxW={"1250px"}>
          <Grid templateColumns={"1fr 4fr"}>
            <GridItem>
              <Box
                mt={"-6rem"}
                border={"6px solid white"}
                w={"max-content"}
                h={180}
                borderRadius={"10px"}
              >
                <Image
                  src={
                    profile?.picture
                      ? profile?.picture?.original?.url
                      : `/assets/man.png`
                  }
                  objectFit="cover"
                  height={170}
                  width={170}
                  alt={profile?.name}
                  style={{ borderRadius: "5px" }}
                />
              </Box>
              <Box pl="1px">
                <Flex alignItems={"baseline"}>
                  <Heading
                    textTransform={"capitalize"}
                    fontSize={"25px"}
                    fontWeight={700}
                    pt={"0.5em"}
                  >
                    {profile?.name ? profile?.name : "Anonymous"}
                  </Heading>

                  {verified.includes(profile?.handle) && (
                    <Tooltip
                      hasArrow
                      placement={"right"}
                      label="Verified"
                      borderRadius={"4px"}
                    >
                      <Box>
                        <MdVerified
                          style={{ marginLeft: "10px" }}
                          fontSize={"20px"}
                          color={"#8B5CF6"}
                        />
                      </Box>
                    </Tooltip>
                  )}

                  {staff.includes(profile?.handle) && (
                    <Tooltip
                      hasArrow
                      label="Staff"
                      placement={"right"}
                      borderRadius={"4px"}
                    >
                      <Box>
                        <AiFillSafetyCertificate
                          style={{ marginLeft: "10px" }}
                          fontSize={"20px"}
                          color={"#11B981"}
                        />
                      </Box>
                    </Tooltip>
                  )}
                </Flex>

                <Text
                  pt={"0.5em"}
                  fontSize={"16px"}
                  className={"brand"}
                  fontFamily={"Miriam Libre"}
                >
                  {`@${profile?.handle}`}
                </Text>
                <Flex pt={"1.4em"} alignItems={"center"}>
                  <Box>
                    <Text
                      fontWeight={500}
                      fontFamily={"Raleway"}
                      fontSize={"20px"}
                    >
                      {profile?.stats?.totalFollowing}
                    </Text>
                    <Text color={"gray.500"} fontWeight={600} fontSize={"15px"}>
                      Following
                    </Text>
                  </Box>
                  <Box ml={"20px"}>
                    <Text
                      fontFamily={"Raleway"}
                      fontWeight={500}
                      fontSize={"20px"}
                    >
                      {profile?.stats?.totalFollowers}
                    </Text>
                    <Text color={"gray.500"} fontWeight={600} fontSize={"15px"}>
                      Followers
                    </Text>
                  </Box>
                </Flex>

                <Box>
                  {result?.data?.doesFollow[0]?.follows ? (
                    <Button
                      my={"1.5em"}
                      color={"rgb(1, 119, 255)"}
                      border={"1px solid rgb(1, 119, 255)"}
                      bg={"transparent"}
                      onClick={async () => {
                        const tghash = await unfollow(
                          profile?.id,
                          data?.address,
                          signer
                        );
                        tghash &&
                          toast({
                            title: "Success",
                            description: `You unfollowed ${profile?.handle}`,
                            status: "success",
                            duration: 4000,
                            isClosable: false,
                            position: "top",
                          });
                        setTimeout(() => {
                          window.location.reload();
                        }, 4000);
                      }}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<AiOutlineUserAdd />}
                      mt={"1.5em"}
                      color={"rgb(1, 119, 255)"}
                      border={"1px solid rgb(1, 119, 255)"}
                      bg={"transparent"}
                      onClick={followRequest}
                    >
                      Follow
                    </Button>
                  )}
                </Box>

                {profile?.bio && (
                  <Text mt={"1.5em"} fontSize={"16px"}>
                    {profile?.bio}
                  </Text>
                )}

                <Divider mt={"1.5em"} mb={"2em"} w={"85%"} />

                <Stack fontSize={"16px"}>
                  <Flex alignItems={"center"}>
                    <TbHash color={"black"} />
                    <Text ml={"10px"}>{profile?.id}</Text>
                  </Flex>
                  {profile?.attributes
                    ?.filter((list) => {
                      return list.key === "website" || list.key === "twitter";
                    })
                    .map((at, index) => {
                      return (
                        <Link
                          key={index}
                          isExternal
                          href={
                            at?.key === "twitter"
                              ? `https://twitter.com/${at?.value}`
                              : at?.value
                          }
                        >
                          <Flex alignItems={"center"}>
                            {at?.key === "website" ? (
                              <TbWorld color={"grey"} />
                            ) : (
                              <AiOutlineTwitter color={"#188CD8"} />
                            )}
                            <Text ml={"10px"}>{at?.value}</Text>
                          </Flex>
                        </Link>
                      );
                    })}
                </Stack>
              </Box>
            </GridItem>
            <GridItem ml="6em">
              <ProfileData
                profile={profile}
                commentsArray={commentsArray}
                publications={publications}
                mirrorArray={mirrorArray}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ProfileView;
