import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { MdDoNotDisturb } from "react-icons/md";
import { searchProfiles } from "../api";
import { useQuery } from "urql";
import { createProfile } from "../../helpers/createProfile";
import { setDefaultProfile } from "../../helpers/setDefaultProfile";
import { getDefaultProfile } from "../../helpers/getDefaultProfile";
import { useAccount, useSigner } from "wagmi";

function CreateProfile({ isOpen, onClose, setUserProfile, setProfile }) {
  const [query, setQuery] = useState("");
  const [checker, setChecker] = useState(false);
  const { data } = useAccount();
  const { data: signer } = useSigner();
  const toast = useToast();
  const space = "&nbsp;";

  const [result] = useQuery({
    query: searchProfiles,
    variables: {
      request: {
        query,
        type: "PROFILE",
        limit: 10,
      },
    },
  });

  return (
    <>
      <Modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={"Montserrat"}>Create Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <Text>@</Text>
              </InputLeftElement>
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="enter unique handle"
              />
              <InputRightElement>
                {!result?.data?.search?.items?.length && query?.length ? (
                  <AiOutlineCheck color="green" />
                ) : result?.data?.search?.items?.length ? (
                  <MdDoNotDisturb color="red" />
                ) : result?.fetching ? (
                  <Spinner color="purple.500" size={"sm"} />
                ) : null}
              </InputRightElement>
            </InputGroup>
            <Flex py={"1em"} alignItems={"center"}>
              {!result?.data?.search?.items?.length && query?.length ? (
                <Text
                  fontFamily={"Montserrat"}
                  fontSize={"12px"}
                  ml={"10px"}
                  color={"grey"}
                >
                  Congo! 🎉 &nbsp;Available
                </Text>
              ) : result?.data?.search?.items?.length ? (
                <Text
                  fontFamily={"Montserrat"}
                  fontSize={"12px"}
                  ml={"10px"}
                  color={"grey"}
                >
                  Not Available 😢. Try Again!
                </Text>
              ) : result?.fetching ? (
                <Text
                  fontFamily={"Montserrat"}
                  fontSize={"12px"}
                  ml={"10px"}
                  color={"grey"}
                >
                  Checking availability..
                </Text>
              ) : null}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<AiOutlinePlus />}
              bg="#0177FF"
              color="white"
              boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px"
              rounded="20px"
              _hover={{
                bg: "#0177FF",
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",
              }}
              variant="ghost"
              fontFamily={"Montserrat"}
              isDisabled={
                result?.data?.search?.items?.length ||
                result?.fetching ||
                !query?.length
              }
              isLoading={checker}
              onClick={async () => {
                setChecker(true);
                toast({
                  title: "Please Wait",
                  description: "minting your profile..",
                  status: "info",
                  duration: 5000,
                  isClosable: false,
                  position: "top",
                });
                const profileId = await createProfile(data?.address, query);
                // const profileId = "0x0935";
                // console.log(profileId);
                await setDefaultProfile(
                  profileId.toString(),
                  data?.address,
                  signer
                );
                const pData = await getDefaultProfile(data?.address);
                setProfile(pData);
                setUserProfile(pData.defaultProfile);
                setChecker(false);
                pData &&
                  toast({
                    title: "Profile Created!",
                    description: "wait for few minutes for indexing.",
                    status: "success",
                    duration: 5000,
                    isClosable: false,
                    position: "top",
                  });
                onClose();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateProfile;
