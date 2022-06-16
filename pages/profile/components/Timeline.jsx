import { Flex, Heading, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getTimeline } from "../../../helpers/getTimeline";

function Timeline() {
  const fetchData = async () => {
    const result = await getTimeline("0x0438");
    console.log(result);
  };
  // fetchData();
  useEffect(() => {}, []);
  return (
    <Flex
      mt="5em"
      ml={"-20%"}
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <Image src={"/assets/no-results.png"} height={100} width={100} />
      <Heading fontSize="1.5em" fontFamily={"Miriam Libre"} pt="1em">
        Coming Soon!
      </Heading>
    </Flex>
  );
}

export default Timeline;
