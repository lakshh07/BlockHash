import { gql } from "@apollo/client/core";
import { BigNumber, utils } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { pollUntilIndexed } from "./indexer/has-transaction-been-indexed";
// import { Metadata } from '../interfaces/publication';
import { uploadIpfs } from "./ipfs";
// import { lensHub } from '../lens-hub';
import { ethers } from "ethers";
// import { enabledCurrencies } from '../module/enabled-modules-currencies';
import {
  LENS_HUB_ABI,
  LENS_HUB_CONTRACT,
  LENS_PERIPHERY_ABI,
  LENS_PERIPHERY_CONTRACT,
} from "../utils/config";

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
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
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;

//TODO typings
const createPostTypedData = (createPostTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest,
    },
  });
};

export const createBlog = async (
  profileId,
  address,
  signer,
  desc,
  contentURI,
  coverURI
) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  console.log("create post: address", address);

  await login(address);

  const metadata = {
    version: "1.0.0",
    metadata_id: uuidv4(),
    description: desc,
    content: contentURI,
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `blog by ${profileId}`,
    attributes: [
      {
        traitType: "type",
        value: "blog",
      },
    ],
    media: [
      coverURI && {
        item: coverURI,
        type: "image/jpeg",
      },
    ],
    appId: "BlockHash",
  };

  const ipfsResult = await uploadIpfs(JSON.stringify(metadata));

  console.log("create post: ipfs result", ipfsResult);

  // hard coded to make the code example clear
  const createPostRequest = {
    profileId,
    contentURI: "ipfs://" + ipfsResult.path,
    collectModule: {
      // feeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map(
      //       (c: any) => c.address
      //     )[0],
      //     value: '0.000001',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      // revertCollectModule: true,
      freeCollectModule: { followerOnly: true },
      // limitedFeeCollectModule: {
      //   amount: {
      //     currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      //     value: '2',
      //   },
      //   collectLimit: '20000',
      //   recipient: '0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3',
      //   referralFee: 0,
      // },
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createPostTypedData(createPostRequest);
  console.log("create post: createPostTypedData", result);

  const typedData = result.data.createPostTypedData.typedData;
  console.log("create post: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("create post: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("create post: tx hash", tx.hash);

  console.log("create post: poll until indexed");
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log("create post: profile has been indexed", result);

  const logs = indexedResult.txReceipt.logs;

  console.log("create post: logs", logs);

  const topicId = utils.id(
    "PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)"
  );
  console.log("topicid we care about", topicId);

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
  console.log("create post: created log", profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log("create post: created event logs", profileCreatedEventLog);

  const publicationId = utils.defaultAbiCoder.decode(
    ["uint256"],
    profileCreatedEventLog[2]
  )[0];

  console.log(
    "create post: contract publication id",
    BigNumber.from(publicationId).toHexString()
  );
  console.log(
    "create post: internal publication id",
    profileId + "-" + BigNumber.from(publicationId).toHexString()
  );

  return result.data;
};
