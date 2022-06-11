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

function UpdateProfileForm() {
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
    <div>
      <Box
        bg={"white"}
        mt="1rem"
        borderRadius={"10px"}
        border={"1px solid #E4E4E7"}
        p={"2em"}
      >
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Profile Id
          </FormLabel>
          <Input
            isDisabled
            id="first-name"
            variant={"filled"}
            placeholder="0x0437"
          />
        </FormControl>
        <FormControl mb={"1em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Name
          </FormLabel>
          <Input id="first-name" variant={"outline"} placeholder="name" />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Bio
          </FormLabel>
          <Input id="first-name" variant={"outline"} placeholder="bio" />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Location
          </FormLabel>
          <Input id="first-name" variant={"outline"} placeholder="location" />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Website
          </FormLabel>
          <Input
            id="first-name"
            variant={"outline"}
            placeholder="website url"
          />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Twitter
          </FormLabel>
          <Input
            id="first-name"
            variant={"outline"}
            placeholder="twitter url"
          />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel mb={"1em"} fontFamily={"Montserrat"} htmlFor="first-name">
            Cover
          </FormLabel>
          {cover && (
            <Image
              src={URL.createObjectURL(cover)}
              height={"260px"}
              width={"full"}
              style={{
                margin: "1em auto",
                borderRadius: "10px",
              }}
            />
          )}
          <Box>
            <Flex alignItems={"baseline"}>
              <Button
                color={"rgb(1, 119, 255)"}
                border={"1px solid rgb(1, 119, 255)"}
                bg={"transparent"}
                // leftIcon={<AiOutlinePicture />}
                onClick={triggerOnChangeCover}
                rounded="20px"
                mb={"1em"}
                fontSize={"14px"}
              >
                {cover ? `Change Cover` : `Set Cover`}
              </Button>
            </Flex>

            <VisuallyHidden>
              <Input
                id="selectImage"
                type="file"
                onChange={handleCoverChange}
                ref={coverRef}
              />
            </VisuallyHidden>
          </Box>
        </FormControl>
        <Flex justifyContent={"flex-end"}>
          <Button
            color={"rgb(1, 119, 255)"}
            border={"1px solid rgb(1, 119, 255)"}
            bg={"transparent"}
          >
            Save
          </Button>
        </Flex>
      </Box>
      <Box
        bg={"white"}
        mt="1rem"
        borderRadius={"10px"}
        border={"1px solid #E4E4E7"}
        p={"2em"}
        align={"flex-start"}
      >
        <FormControl align={"flex-start"} mb={"1em"}>
          <FormLabel mb={"1em"} fontFamily={"Montserrat"} htmlFor="first-name">
            Avatar
          </FormLabel>
          {avatar && (
            <Image
              src={URL.createObjectURL(avatar)}
              height={"240px"}
              width={"240px"}
              style={{
                borderRadius: "10px",
              }}
            />
          )}
          <Box>
            <Flex alignItems={"baseline"}>
              <Button
                fontSize={"14px"}
                color={"rgb(1, 119, 255)"}
                border={"1px solid rgb(1, 119, 255)"}
                bg={"transparent"}
                // leftIcon={<AiOutlinePicture />}
                onClick={triggerOnChangeAvatar}
                rounded="20px"
                mb={"1em"}
              >
                {avatar ? `Change Avatar` : `Set Avatar`}
              </Button>
            </Flex>

            <VisuallyHidden>
              <Input
                id="selectImage"
                type="file"
                onChange={handleAvatarChange}
                ref={avatarRef}
              />
            </VisuallyHidden>
          </Box>
        </FormControl>
        <Flex justifyContent={"flex-end"}>
          <Button
            color={"rgb(1, 119, 255)"}
            border={"1px solid rgb(1, 119, 255)"}
            bg={"transparent"}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </div>
  );
}

export default UpdateProfileForm;
