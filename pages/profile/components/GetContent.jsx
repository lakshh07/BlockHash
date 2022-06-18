import { Tag } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

async function fetchContent(url, setData) {
  axios(url, {
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + "****",
    },
  })
    .then((response) => {
      setData(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function GetContent({ url }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetchContent(url, setData);
  }, [url]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };

  if (data?.description) {
    return <>{`${htmlFrom(data?.description?.substring(0, 200))}...`}</>;
  } else if (data?.content) {
    return <div>{htmlFrom(data?.content?.substring(0, 180))}...</div>;
  }
}

export function GetTags({ url }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetchContent(url, setData);
  }, [url]);

  return data?.tags?.map((tagList, index) => {
    return (
      <Tag
        mr={"10px"}
        fontSize={"14px"}
        key={index}
        color={"blackAlpha.700"}
        textTransform="lowercase"
        cursor={"pointer"}
      >
        {`#${tagList}`}
      </Tag>
    );
  });
}
