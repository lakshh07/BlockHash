import { gql } from "@apollo/client/core";
import { BigNumber, utils, ethers } from "ethers";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { pollUntilIndexed } from "./indexer/has-transaction-been-indexed";
import { LENS_HUB_ABI, LENS_HUB_CONTRACT } from "../utils/config";

const CREATE_MIRROR_TYPED_DATA = `
  mutation($request: CreateMirrorRequest!) { 
    createMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
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
        profileIdPointed
        pubIdPointed
        referenceModuleData
        referenceModule
        referenceModuleInitData
      }
     }
   }
 }
`;

// TODO types
const createMirrorTypedData = (createMirrorTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_MIRROR_TYPED_DATA),
    variables: {
      request: createMirrorTypedDataRequest,
    },
  });
};

export const createMirror = async (profileId, address, signer, pubId) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  console.log("create mirror: address", address);

  await login(address);

  // hard coded to make the code example clear
  const createMirrorRequest = {
    profileId,
    publicationId: pubId,
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createMirrorTypedData(createMirrorRequest);
  console.log("create mirror: createMirrorTypedData", result);

  const typedData = result.data.createMirrorTypedData.typedData;
  console.log("create mirror: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("create mirror: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  const tx = await lensHub.mirrorWithSig({
    profileId: typedData.value.profileId,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    referenceModuleData: typedData.value.referenceModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("create mirror: tx hash", tx.hash);

  console.log("create mirror: poll until indexed");
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log("create mirror: profile has been indexed", result);

  const logs = indexedResult.txReceipt.logs;

  console.log("create mirror: logs", logs);

  const topicId = utils.id(
    "MirrorCreated(uint256,uint256,uint256,uint256,bytes,address,bytes,uint256)"
  );
  console.log("topicid we care about", topicId);

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
  console.log("create mirror: created log", profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log("create mirror: created event logs", profileCreatedEventLog);

  const publicationId = utils.defaultAbiCoder.decode(
    ["uint256"],
    profileCreatedEventLog[2]
  )[0];

  console.log(
    "create mirror: contract publication id",
    BigNumber.from(publicationId).toHexString()
  );
  console.log(
    "create mirror: internal publication id",
    profileId + "-" + BigNumber.from(publicationId).toHexString()
  );

  return result.data;
};
