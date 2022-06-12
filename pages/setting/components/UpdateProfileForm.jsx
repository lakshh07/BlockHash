import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  VisuallyHidden,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useAccount, useSigner } from "wagmi";
import { uploadIpfs } from "../../../helpers/ipfs";
import { setProfileImageUriNormal } from "../../../helpers/updateProfilePicture";
import { setProfileMetadata } from "../../../helpers/updateProfileMetadata";

function UpdateProfileForm({ dp }) {
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [checker, setChecker] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    twitterHandle: "",
    websiteUrl: "",
  });
  const coverRef = useRef(null);
  const avatarRef = useRef(null);
  const { data } = useAccount();
  const { data: signer } = useSigner();
  const toast = useToast();

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

  function onChange(e) {
    setProfileData(() => ({ ...profileData, [e.target.name]: e.target.value }));
  }

  async function uploadAvatar() {
    setChecker(true);
    const pictureURL = await uploadIpfs(avatar);
    const fullAvatarURL = `https://ipfs.infura.io/ipfs/${pictureURL?.path}`;

    const hash = await setProfileImageUriNormal(
      dp?.id,
      data?.address,
      signer,
      fullAvatarURL
    );

    hash &&
      toast({
        title: "Profile picture updated!",
        description: "wait for few minutes for indexing.",
        status: "success",
        duration: 5000,
        isClosable: false,
        position: "top",
      });
    hash && setChecker(false);
  }
  async function updateMetadata() {
    setChecker(true);

    const coverURL = await uploadIpfs(cover);
    const fullCoverURL = `https://ipfs.infura.io/ipfs/${coverURL?.path}`;

    const hash = await setProfileMetadata(
      dp?.id,
      data?.address,
      signer,
      profileData.name,
      profileData.bio,
      fullCoverURL,
      profileData.twitterHandle,
      profileData.websiteUrl
    );

    hash &&
      toast({
        title: "Profile metadata updated!",
        description: "wait for few minutes for indexing.",
        status: "success",
        duration: 5000,
        isClosable: false,
        position: "top",
      });
    hash && setChecker(false);
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
            placeholder={dp?.id}
          />
        </FormControl>
        <FormControl mb={"1em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Name
          </FormLabel>
          <Input
            variant={"outline"}
            name="name"
            value={profileData.name}
            onChange={onChange}
            placeholder={dp?.name ? dp?.name : "Anonymous"}
          />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Bio
          </FormLabel>
          <Input
            variant={"outline"}
            placeholder={dp?.bio ? dp?.bio : "Lets GTFOL"}
            name="bio"
            value={profileData.bio}
            onChange={onChange}
          />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Website
          </FormLabel>
          <Input
            name="websiteUrl"
            value={profileData.websiteUrl}
            onChange={onChange}
            variant={"outline"}
            placeholder="https://abc.xyz"
          />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel fontFamily={"Montserrat"} htmlFor="first-name">
            Twitter
          </FormLabel>
          <Input
            name="twitterHandle"
            value={profileData.twitterHandle}
            onChange={onChange}
            variant={"outline"}
            placeholder="abc"
          />
        </FormControl>
        <FormControl mb={"1.5em"}>
          <FormLabel mb={"1em"} fontFamily={"Montserrat"} htmlFor="first-name">
            Cover
          </FormLabel>

          <Box
            bg={"white"}
            w={"100%"}
            h={"260px"}
            mb={"1.5em"}
            backgroundImage={
              dp?.coverPicture
                ? dp?.coverPicture?.original?.url
                : cover
                ? URL.createObjectURL(cover)
                : "/assets/bright-squares.png"
            }
            backgroundPosition={"center"}
            backgroundColor="#662EA7"
            borderRadius={"10px"}
            backgroundRepeat={
              dp?.coverPicture ? "no-repeat" : cover ? "no-repeat" : "repeat"
            }
            backgroundSize={
              dp?.coverPicture ? "cover" : cover ? "cover" : "30%"
            }
          ></Box>

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
                {dp?.coverPicture
                  ? `Change Cover`
                  : cover
                  ? `Change Cover`
                  : `Set Cover`}
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
            onClick={updateMetadata}
            isLoading={checker}
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

          <Image
            src={
              dp?.picture
                ? dp?.picture?.original?.url
                : avatar
                ? URL.createObjectURL(avatar)
                : `/assets/man.png`
            }
            height={"240px"}
            width={"240px"}
            style={{
              borderRadius: "10px",
              marginBottom: "1.5em",
            }}
          />

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
                {dp?.picture
                  ? `Change Avatar`
                  : avatar
                  ? `Change Avatar`
                  : `Set Avatar`}
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
            onClick={uploadAvatar}
            isLoading={checker}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </div>
  );
}

export default UpdateProfileForm;
