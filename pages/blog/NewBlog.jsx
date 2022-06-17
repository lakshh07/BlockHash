import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  VisuallyHidden,
  useToast,
  Link,
  Textarea,
  Image,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { AiOutlinePicture } from "react-icons/ai";
import { useLoadingContext } from "../../context/loading";
import Lottie from "react-lottie";
import logo from "../../public/assets/logo/logo.json";
import { createBlog } from "../../helpers/createBlog";
import { uploadIpfs } from "../../helpers/ipfs";
import { useAccount, useSigner } from "wagmi";
import { Select } from "antd";
import "antd/dist/antd.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function NewBlog() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [checker, setChecker] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    content: "",
    description: "",
    tags: undefined,
  });
  const { setLoading } = useLoadingContext();
  const { data } = useAccount();
  const { data: signer } = useSigner();
  const fileRef = useRef(null);
  const toast = useToast();
  function triggerOnChange() {
    fileRef.current.click();
  }
  const { id } = router.query;

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: logo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  async function handleFileChange(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setImage(uploadedFile);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    setBlogData(() => ({ ...blogData, tags: value }));
    // console.log(blogData);
  }

  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
    setBlogData(() => ({ ...blogData, content: html }));
  }

  function onChange(e) {
    setBlogData(() => ({ ...blogData, [e.target.name]: e.target.value }));
  }

  async function publish() {
    setChecker(true);
    toast({
      title: "Publishing your blog",
      status: "info",
      duration: 5000,
      isClosable: false,
      position: "top",
    });
    const contentURI = await uploadIpfs(JSON.stringify(blogData));
    // console.log(contentURI?.path);
    const fullContentURI = `https://ipfs.infura.io/ipfs/${contentURI?.path}`;
    // console.log(fullContentURI);
    let coverURI;
    image ? (coverURI = await uploadIpfs(image)) : null;
    // console.log(coverURI?.path, "hefuowhoueh");

    const fullCoverURI = `https://ipfs.infura.io/ipfs/${coverURI?.path}`;

    const result = await createBlog(
      id,
      data?.address,
      signer,
      blogData.title,
      fullContentURI,
      fullCoverURI
    );

    console.log("result", result);
    setChecker(false);
    toast({
      title: "Success",
      description: "Blog posted to BlockHash! Wait for indexing",
      status: "success",
      duration: 5000,
      isClosable: false,
      position: "top",
    });

    setTimeout(() => {
      router.push("/feed");
    }, 4000);
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
          <Link href={"/"}>
            <Flex alignItems={"center"}>
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
              onClick={() => {
                setLoading(true);
                router.back();
                setLoading(true);
              }}
              isDisabled={checker}
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
              onClick={publish}
              isLoading={checker}
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
            value={blogData.title}
            onChange={onChange}
            name="title"
          />
          <Input
            my={"0.5em"}
            ml={"0.8em"}
            size={"md"}
            variant={"unstyled"}
            fontSize={"20px"}
            placeholder="Subtitle ..."
            fontWeight={700}
            color="blackAlpha.700"
            value={blogData.subtitle}
            onChange={onChange}
            name="subtitle"
          />

          {image && (
            <Image
              src={URL.createObjectURL(image)}
              style={{
                maxWidth: "1000px",
                margin: "2em auto",
                borderRadius: "10px",
              }}
            />
          )}
          <Textarea
            mt={"1em"}
            mx={"0.5em"}
            w={"98.5%"}
            placeholder="Short Description (SEO)"
            value={blogData.description}
            onChange={onChange}
            name="description"
          />
          <Box mt={"1em"} mx={"0.5em"} mb={"3em"}>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              placeholder="whats on your mind..."
              fontSize={"20px"}
              name="content"
            />
            <Select
              mode="tags"
              style={{
                width: "100%",
                marginTop: "1em",
                marginBottom: "20px",
                borderRadius: "30px",
              }}
              size="large"
              name="tags"
              value={blogData.tags}
              placeholder="Tags (upto 3)"
              onChange={handleChange}
              showSearch={false}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NewBlog;
