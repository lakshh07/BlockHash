import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiEdit2Fill, RiNotificationLine } from "react-icons/ri";
import LensLogo from "./LensLogo";
import { useSigner, useAccount } from "wagmi";
import { useLoadingContext } from "../../context/loading";
import Lottie from "react-lottie";
import logo from "../../public/assets/logo/logo.json";
import { login } from "../../helpers/login";
import { getDefaultProfile } from "../../helpers/getDefaultProfile";
import { useProfileContext } from "../../context/profile";
import SearchProfileBox from "./SearchProfileBox";
import { AiOutlineSetting } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import CreateProfile from "./CreateProfile";

function Navbar({}) {
  const [profile, setProfile] = useState("a");
  const [query, setQuery] = useState("");
  const [checker, setChecker] = useState(false);
  const { data } = useAccount();
  const router = useRouter();
  const { setLoading } = useLoadingContext();
  const { setUserProfile, userProfile } = useProfileContext();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: logo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleRouteChange = async () => {
    // await login(data?.address);
    const pData = await getDefaultProfile(data?.address);
    setProfile(pData);
    setUserProfile(pData.defaultProfile);
  };

  if (router.asPath == "/profile/[username]") {
    handleRouteChange();
  }

  if (router.asPath == "/blog/[username]/[id]") {
    handleRouteChange();
  }
  if (router.asPath == "/setting/[id]") {
    handleRouteChange();
  }

  function updateSearch(e) {
    setQuery(e.target.value);
  }

  if (router.pathname == "/blog/new-blog/[id]") {
    return null;
  }

  return (
    <>
      <Box py={"0.9em"}>
        <Flex
          maxW={"1250px"}
          mx={"auto"}
          py={"0.3em"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex alignItems={"center"}>
            <Link href={"/"}>
              <Flex cursor={"pointer"} alignItems={"center"}>
                <Lottie options={defaultOptions2} height={32} width={32} />
                <Heading
                  fontSize={"24px"}
                  ml={"4px"}
                  pt="4px"
                  fontFamily="Miriam Libre"
                >
                  BlockHash
                </Heading>
              </Flex>
            </Link>
            <Box position={"relative"}>
              <Input
                // zIndex={"99"}
                variant={"filled"}
                size={"md"}
                mx="20px"
                value={query}
                onChange={updateSearch}
                placeholder="Search"
              />

              <SearchProfileBox query={query} />
            </Box>

            {router.asPath !== "/feed" && (
              <Button
                ml={"30px"}
                variant={"ghost"}
                fontWeight={500}
                _hover={{
                  filter: "drop-shadow(rgba(1, 119, 255, 0.4) 0px 5px 3px)",
                  textDecor: "underline",
                }}
                onClick={() => {
                  setLoading(true);
                  router.push("/feed");
                  setLoading(true);
                }}
              >
                Explore
              </Button>
            )}
          </Flex>

          <Flex alignItems={"center"}>
            {userProfile && (
              <Button
                leftIcon={<RiEdit2Fill />}
                boxShadow="rgba(100, 100, 111, 0.3) 0px 7px 29px 0px"
                rounded="20px"
                p="1.2em"
                bg="#0177FF"
                color="white"
                _hover={{
                  bg: "#0177FF",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                mr="20px"
                onClick={() => {
                  setLoading(true);
                  router.push(`/blog/new-blog/${userProfile?.id}`);
                  setLoading(true);
                }}
              >
                Write
              </Button>
            )}

            {profile === "no default"
              ? null
              : !userProfile && (
                  <Button
                    ml={"1em"}
                    leftIcon={<LensLogo size={30} color="white" />}
                    iconSpacing={["marginTop"]}
                    alignItems={"center"}
                    boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                    rounded="20px"
                    p="1.2em"
                    bg="#0177FF"
                    color="white"
                    _hover={{
                      bg: "#0177FF",
                      top: "-2px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                    isLoading={checker}
                    pointerEvents={userProfile?.handle ? "none" : "all"}
                    onClick={async () => {
                      setChecker(true);
                      await login(data?.address);
                      const pData = await getDefaultProfile(data?.address);
                      setUserProfile(pData.defaultProfile);
                      if (pData.defaultProfile == null) {
                        setProfile("no default");
                        toast({
                          title: "No Profile Found!",
                          description: "Create free on testnet.",
                          status: "error",
                          duration: 5000,
                          isClosable: false,
                          position: "top",
                        });
                      }
                      setChecker(false);
                    }}
                  >
                    {userProfile ? userProfile?.handle : `Login`}
                  </Button>
                )}

            {userProfile?.handle && (
              <Flex alignItems={"center"}>
                <Menu autoSelect={false}>
                  <MenuButton
                    variant={"ghost"}
                    as={IconButton}
                    icon={
                      <RiNotificationLine fontWeight={700} fontSize={"18px"} />
                    }
                  />
                  <MenuList>
                    <MenuItem></MenuItem>
                  </MenuList>
                </Menu>
                <Menu autoSelect={false} fontFamily={"Montserrat"}>
                  <MenuButton>
                    <Avatar
                      mx="10px"
                      ml={"20px"}
                      size={"sm"}
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      src={
                        userProfile?.picture
                          ? userProfile?.picture?.original?.url
                          : `/assets/man.png`
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup fontFamily={"Montserrat"} title="Logged in as">
                      <MenuItem
                        _hover={{
                          backgroundColor: "transparent",
                          cursor: "text",
                        }}
                      >
                        <Text
                          className="brand"
                          ml={"5px"}
                          mt={"-10px"}
                          flex={1}
                          fontWeight={500}
                          fontFamily={"Montserrat"}
                        >
                          {`@${userProfile?.handle}`}
                        </Text>
                      </MenuItem>
                    </MenuGroup>

                    <MenuDivider />

                    <Link href={`/profile/${userProfile?.handle}`}>
                      <MenuItem icon={<BsPerson />}>
                        <Text fontFamily={"Montserrat"}>Your Profile</Text>
                      </MenuItem>
                    </Link>
                    <Link href={`/setting/${userProfile?.id}`}>
                      <MenuItem icon={<AiOutlineSetting />}>
                        <Text fontFamily={"Montserrat"}>Setting</Text>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </Flex>
            )}
            {profile === "no default" && (
              <Button
                leftIcon={<LensLogo size={30} color="white" />}
                iconSpacing={["marginTop"]}
                alignItems={"center"}
                boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
                rounded="20px"
                p="1.2em"
                bg="#0177FF"
                color="white"
                _hover={{
                  bg: "#0177FF",
                  top: "-2px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                onClick={onOpen}
                // }}
              >
                Create Profile
              </Button>
            )}
            <CreateProfile
              isOpen={isOpen}
              onClose={onClose}
              setUserProfile={setUserProfile}
              setProfile={setProfile}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
