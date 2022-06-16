import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import { TbMessages } from "react-icons/tb";
import { AiOutlinePicture } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import Blogs from "./components/Blogs";
import Comments from "./components/Comments";
import Nfts from "./components/Nfts";
import { getUsersNfts } from "../api";
import { useQuery } from "urql";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import Mirror from "./components/Mirror";

function ProfileData({ publications, profile, commentsArray, mirrorArray }) {
  const [result] = useQuery({
    query: getUsersNfts,
    variables: {
      request: {
        ownerAddress: profile?.ownedBy,
        chainIds: [80001],
      },
    },
  });
  console.log(result);
  return (
    <>
      <Box mt={"2em"}>
        <Tabs variant={"soft-rounded"} colorScheme="purple">
          <TabList>
            <Tab fontWeight="600" _focus={{ border: "none" }}>
              <BiEditAlt style={{ marginRight: "7px", fontWeight: "600" }} />
              Blogs ({publications?.length})
            </Tab>
            <Tab fontWeight="600" _focus={{ border: "none" }} mx={"10px"}>
              <TbMessages style={{ marginRight: "7px", fontWeight: "600" }} />
              Comments ({commentsArray?.length})
            </Tab>
            <Tab fontWeight="600" _focus={{ border: "none" }} mx={"10px"}>
              <CgArrowsExchangeAlt
                style={{ marginRight: "7px", fontWeight: "600" }}
              />
              Mirrors ({mirrorArray?.length})
            </Tab>
            <Tab fontWeight="600" _focus={{ border: "none" }}>
              <AiOutlinePicture
                style={{ marginRight: "7px", fontWeight: "600" }}
              />
              NFTs ({result?.data?.nfts?.items?.length})
            </Tab>
          </TabList>

          <TabPanels mt={"2em"}>
            <TabPanel>
              <Blogs publications={publications} />
            </TabPanel>
            <TabPanel>
              <Comments commentsArray={commentsArray} />
            </TabPanel>
            <TabPanel>
              <Mirror mirrorArray={mirrorArray} />
            </TabPanel>
            <TabPanel>
              <Nfts nfts={result} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default ProfileData;
