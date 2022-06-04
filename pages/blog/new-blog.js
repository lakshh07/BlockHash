import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Tag,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { AiOutlinePicture } from "react-icons/ai";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

function newBlog() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("cober.ong");
  const fileRef = useRef(null);
  function triggerOnChange() {
    /* trigger handleFileChange handler of hidden file input */
    fileRef.current.click();
  }
  async function handleFileChange(e) {
    /* upload cover image to ipfs and save hash to state */
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    console.log(uploadedFile);
    // const added = await client.add(uploadedFile);
    // setPost((state) => ({ ...state, coverImage: added.path }));
    setImage(uploadedFile);
  }

  return (
    <>
      <Box>
        <Flex
          py={"0.9em"}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"1300px"}
          fontWeight={500}
          mx={"auto"}
        >
          <Heading
            fontFamily={"Philosopher"}
            fontSize={"2em"}
            fontWeight={"500"}
            mr={"10px"}
          >
            Block
          </Heading>
          <Box>
            <Button
              boxShadow="rgba(100, 100, 111, 0.1) 0px 7px 29px 0px"
              rounded="20px"
              p="1.2em"
              border="1px solid #0177FF"
              bg={"transparent"}
              color="#0177FF"
              _hover={{
                // bg: "#0177FF",
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px",
              }}
              mr={"1em"}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              boxShadow="rgba(100, 100, 111, 0.1) 0px 7px 29px 0px"
              rounded="20px"
              p="1.2em"
              bg={"#0177FF"}
              color="white"
              _hover={{
                top: "-2px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px",
              }}
            >
              Publish
            </Button>
          </Box>
        </Flex>
        <Divider mt={"0.5em"} mb={"2em"} w={"90%"} mx={"auto"} />

        <Box maxW={"1250px"} mx={"auto"}>
          <Box>
            <Flex alignItems={"baseline"}>
              <Button
                color={"rgb(1, 119, 255)"}
                border={"1px solid rgb(1, 119, 255)"}
                bg={"transparent"}
                leftIcon={<AiOutlinePicture />}
                onClick={triggerOnChange}
                rounded="20px"
                mb={"1em"}
              >
                {image ? `Change Cover` : `Set Cover`}
              </Button>
            </Flex>

            <VisuallyHidden>
              <Input
                id="selectImage"
                type="file"
                onChange={handleFileChange}
                ref={fileRef}
              />
            </VisuallyHidden>
          </Box>

          <Input
            my={"0.5em"}
            ml={"0.5em"}
            size={"lg"}
            variant={"unstyled"}
            fontSize={"30px"}
            placeholder="Title ..."
            fontWeight={700}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              style={{
                maxWidth: "1000px",
                margin: "2em auto",
                borderRadius: "10px",
              }}
            />
          )}
          {/* <img
            style={{
              maxWidth: "1000px",
              margin: "2em auto",
              borderRadius: "10px",
            }}
            src={"/assets/cover.jpeg"}
          /> */}
          <Box mt={"1em"} mb={"3em"} ml={"0.5em"}>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              placeholder="whats on your mind..."
              fontSize={"20px"}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default newBlog;
