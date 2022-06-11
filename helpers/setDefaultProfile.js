import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { ethers } from "ethers";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { pollUntilIndexed } from "./indexer/has-transaction-been-indexed";
import {
  LENS_HUB_ABI,
  LENS_HUB_CONTRACT,
  LENS_PERIPHERY_ABI,
  LENS_PERIPHERY_CONTRACT,
} from "../utils/config";

const CREATE_SET_DEFAULT_PROFILE_TYPED_DATA = `
  mutation($request: CreateSetDefaultProfileRequest!) { 
    createSetDefaultProfileTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDefaultProfileWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        wallet
        profileId
      }
    }
  }
}
`;

const createSetDefaultProfileTypedData = (profileId) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_DEFAULT_PROFILE_TYPED_DATA),
    variables: {
      request: {
        profileId,
      },
    },
  });
};

export const setDefaultProfile = async (profileId, address, signer) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  console.log("set default profile: address", address);

  await login(address, signer);

  const result = await createSetDefaultProfileTypedData(profileId);
  console.log("set default profile: createSetDefaultProfileTypedData", result);

  const typedData = result.data.createSetDefaultProfileTypedData.typedData;
  console.log("set default profile: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("set default profile: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  const tx = await lensHub.setDefaultProfileWithSig({
    profileId: typedData.value.profileId,
    wallet: typedData.value.wallet,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("set default profile: tx hash", tx.hash);

  console.log("set default profile: poll until indexed");
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log("set default profile: action has been indexed", indexedResult);

  return result.data;
};
