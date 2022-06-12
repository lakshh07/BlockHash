import { gql } from "@apollo/client/core";
import { v4 as uuidv4 } from "uuid";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { pollUntilIndexed } from "./indexer/has-transaction-been-indexed";
import { uploadIpfs } from "./ipfs";
import { ethers } from "ethers";
import { LENS_PERIPHERY_ABI, LENS_PERIPHERY_CONTRACT } from "../utils/config";

const CREATE_SET_PROFILE_METADATA_TYPED_DATA = `
  mutation($request: CreatePublicSetProfileMetadataURIRequest!) { 
    createSetProfileMetadataTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetProfileMetadataURIWithSig {
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
          profileId
          metadata
        }
      }
    }
  }
`;

const createSetProfileMetadataTypedData = (profileId, metadata) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_PROFILE_METADATA_TYPED_DATA),
    variables: {
      request: {
        profileId,
        metadata,
      },
    },
  });
};

export const setProfileMetadata = async (
  profileId,
  address,
  signer,
  name,
  bio,
  coverURL,
  twitterHandle,
  websiteURL
) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  console.log("create profile: address", address);

  await login(address);

  const metadata = {
    name: name,
    bio: bio,
    cover_picture: coverURL,
    attributes: [
      {
        displayType: null,
        traitType: "string",
        key: "website",
        value: websiteURL,
      },
      {
        displayType: null,
        traitType: "string",
        key: "twitter",
        value: twitterHandle,
      },
    ],
    version: "1.0.0",
    metadata_id: uuidv4(),
  };

  const ipfsResult = await uploadIpfs(JSON.stringify(metadata));

  console.log("create profile: ipfs result", ipfsResult);

  // hard coded to make the code example clear
  const createProfileMetadataRequest = {
    profileId,
    metadata: "ipfs://" + ipfsResult.path,
  };

  const result = await createSetProfileMetadataTypedData(
    createProfileMetadataRequest.profileId,
    createProfileMetadataRequest.metadata
  );
  console.log("create profile: createSetProfileMetadataTypedData", result);

  const typedData = result.data.createSetProfileMetadataTypedData.typedData;
  console.log("create profile: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("create profile: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensPeriphery = new ethers.Contract(
    LENS_PERIPHERY_CONTRACT,
    LENS_PERIPHERY_ABI,
    signer
  );

  const tx = await lensPeriphery.setProfileMetadataURIWithSig({
    profileId: createProfileMetadataRequest.profileId,
    metadata: createProfileMetadataRequest.metadata,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("create profile metadata: tx hash", tx.hash);

  console.log("create profile metadata: poll until indexed");
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log("create profile metadata: profile has been indexed", result);

  const logs = indexedResult.txReceipt.logs;

  console.log("create profile metadata: logs", logs);

  return result.data;
};
