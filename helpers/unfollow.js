import { gql } from "@apollo/client/core";
import { ethers } from "ethers";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { LENS_FOLLOW_NFT_ABI } from "../utils/config";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { prettyJSON } from "../utils/helpers";

const CREATE_UNFOLLOW_TYPED_DATA = `
  mutation($request: UnfollowRequest!) { 
    createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
 }
`;

const createUnfollowTypedData = (profile) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_UNFOLLOW_TYPED_DATA),
    variables: {
      request: {
        profile,
      },
    },
  });
};

export const unfollow = async (profileId, address, signer) => {
  console.log("unfollow: address", address);

  await login(address);

  // hard coded to make the code example clear
  const result = await createUnfollowTypedData(profileId);
  console.log("unfollow: result", result);

  const typedData = result.data.createUnfollowTypedData.typedData;
  prettyJSON("unfollow: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("unfollow: signature", signature);

  const { v, r, s } = splitSignature(signature);

  // load up the follower nft contract
  const followNftContract = new ethers.Contract(
    typedData.domain.verifyingContract,
    LENS_FOLLOW_NFT_ABI,
    signer
  );

  const sig = {
    v,
    r,
    s,
    deadline: typedData.value.deadline,
  };

  // force the tx to send
  const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig);
  console.log("follow: tx hash", tx.hash);

  return tx.hash;
};
