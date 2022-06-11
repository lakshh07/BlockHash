import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { prettyJSON } from "../utils/helpers";
import { getAuthenticationToken, setAuthenticationToken } from "../utils/state";
import { ethers } from "ethers";

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticate = (address, signature) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = async (address) => {
  if (getAuthenticationToken()) {
    console.log("login: already logged in");
    return;
  }

  console.log("login: address", address);

  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);

  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
  // sign the text with the wallet

  const signer = ethersProvider.getSigner();
  const signature = await signer.signMessage(
    challengeResponse.data.challenge.text
  );

  const accessTokens = await authenticate(address, signature);
  prettyJSON("login: result", accessTokens.data);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);

  return accessTokens.data;
};
