import { useQuery } from "urql";

const GET_CHALLENGE = `
query($request: ChallengeRequest!) {
  challenge(request: $request) { text }
}
`;

import React from "react";

function generateChallenge(address) {
  const [result] = useQuery({
    query: GET_CHALLENGE,
    variables: {
      request: {
        address,
      },
    },
  });
  return result;
}

export default generateChallenge;
// export const generateChallenge = (address) => {

// };
