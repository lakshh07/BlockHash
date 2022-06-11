import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useLoadingContext } from "../../../context/loading";
import { BsFillPersonFill, BsExclamationTriangleFill } from "react-icons/bs";
import { BiChip } from "react-icons/bi";
import UpdateProfileForm from "./UpdateProfileForm";

function UpdateProfile() {
  const { setLoading } = useLoadingContext();
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const coverRef = useRef(null);
  const avatarRef = useRef(null);

  function triggerOnChangeCover() {
    coverRef.current.click();
  }
  function triggerOnChangeAvatar() {
    avatarRef.current.click();
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  async function handleCoverChange(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setCover(uploadedFile);
  }
  async function handleAvatarChange(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setAvatar(uploadedFile);
  }

  return (
    <>
      <Box h={"auto"} bg={"rgb(245,245,245)"}>
        <Container maxW={"1300px"}>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            align={"start"}
            orientation="vertical"
          >
            <Grid mt={"3em"} templateColumns={"1fr 2.5fr"} w={"100%"}>
              <GridItem>
                <Flex mt={"10px"} mb={"1.5em"} alignItems={"center"}>
                  <Image
                    // src={
                    //   result?.data?.publication?.profile?.picture
                    //     ? result?.data?.publication?.profile?.picture?.original
                    //         ?.url
                    //     : `/assets/man.png`
                    // }
                    src={"/assets/man.png"}
                    height={45}
                    width={45}
                    style={{ borderRadius: "50%" }}
                  />
                  <Box flex={1}>
                    <Text
                      fontWeight={600}
                      textTransform={"capitalize"}
                      fontSize={"16px"}
                      ml={"10px"}
                      textAlign={"left"}
                    >
                      Lakshay Maini
                      {/* {`@${result?.data?.publication?.profile?.handle}`} */}
                    </Text>
                    <Text
                      ml={"10px"}
                      textAlign={"left"}
                      fontSize={"14px"}
                      className={"brand"}
                    >
                      @lakshay.lens
                      {/* {`@${result?.data?.publication?.profile?.handle}`} */}
                    </Text>
                  </Box>
                </Flex>
                <TabList
                  mt={"3em"}
                  align={"start"}
                  justifyContent={"flex-start"}
                  mr={"auto"}
                  w={"70%"}
                >
                  <Tab mb={"5px"} className="ptabs">
                    <Flex alignItems={"center"}>
                      <BsFillPersonFill />
                      <Text ml={"10px"}>Profile</Text>
                    </Flex>
                  </Tab>
                  <Tab mb={"5px"} isDisabled className="ptabs">
                    <Flex alignItems={"center"}>
                      <BiChip />
                      <Text ml={"10px"}>Account</Text>
                    </Flex>
                  </Tab>
                  <Tab mb={"5px"} isDisabled className="ptabs">
                    <Flex alignItems={"center"}>
                      <BsExclamationTriangleFill />
                      <Text ml={"10px"}> Danger Zone</Text>
                    </Flex>
                  </Tab>
                </TabList>
              </GridItem>
              <GridItem>
                <TabPanels>
                  <TabPanel>
                    <UpdateProfileForm />
                  </TabPanel>
                </TabPanels>
              </GridItem>
            </Grid>
          </Tabs>
        </Container>
      </Box>
    </>
  );
}

export default UpdateProfile;
