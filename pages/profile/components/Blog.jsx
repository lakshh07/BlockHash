import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import axios from "../../../utils/axios";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

function Blog({ list }) {
  const [content, setContent] = useState();

  function fetchContent(url) {
    axios(url, {
      crossdomain: true,
    })
      .then((response) => {
        // console.log(response.data);
        setContent(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };
  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box w={"550px"}>
          <Link href={`/blog/${list?.profile?.handle}/${list?.id}`} isExternal>
            <Heading fontWeight={700} fontSize={"18px"}>
              {list?.metadata?.description}
            </Heading>
            <Text mt="10px" color={"grey"} fontWeight={400} fontSize={"14px"}>
              {list?.metadata?.content && fetchContent(list?.metadata?.content)}
              {`${htmlFrom(content?.description?.substring(0, 200))}....`}
            </Text>
          </Link>
        </Box>

        <Box
          bg={"white"}
          w={"200px"}
          h={"100px"}
          ml={"25px"}
          borderRadius={"5px"}
          backgroundImage={
            list?.metadata?.media[0] && list?.metadata?.media[0]?.original?.url
          }
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        ></Box>
      </Flex>
    </>
  );
}

export default Blog;
