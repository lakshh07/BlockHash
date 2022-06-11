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

function ProfileData({ publications, profile }) {
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
              Comments (19)
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
              <Comments />
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
