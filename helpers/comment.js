import { gql } from "@apollo/client/core";
import { BigNumber, utils, ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { pollUntilIndexed } from "./indexer/has-transaction-been-indexed";
import { uploadIpfs } from "./ipfs";
import { LENS_HUB_ABI, LENS_HUB_CONTRACT } from "../utils/config";

const CREATE_COMMENT_TYPED_DATA = `
  mutation($request: CreatePublicCommentRequest!) { 
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
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
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
        referenceModuleData
      }
     }
   }
 }
`;

// TODO types
const createCommentTypedData = (createCommentTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest,
    },
  });
};

export const createComment = async (
  profileId,
  pubId,
  address,
  signer,
  content,
  description
) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  console.log("create comment: address", address);

  await login(address);

  const metadata = {
    version: "1.0.0",
    metadata_id: uuidv4(),
    description: description,
    content: content,
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `${profileId}'s comment on ${pubId}'s blog`,
    attributes: [
      {
        traitType: "type",
        value: "blog cooment",
      },
    ],
    media: [
      // {
      //   item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
      //   // item: 'https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png',
      //   type: 'image/jpeg',
      // },
    ],
    appId: "BlockHash",
  };

  const ipfsResult = await uploadIpfs(JSON.stringify(metadata));

  console.log("create comment: ipfs result", ipfsResult);

  // hard coded to make the code example clear
  const createCommentRequest = {
    profileId,
    // remember it has to be indexed and follow metadata standards to be traceable!
    publicationId: pubId,
    contentURI: "ipfs://" + ipfsResult.path,
    collectModule: {
      // timedFeeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map((c: any) => c.address)[0],
      //     value: '0.01',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createCommentTypedData(createCommentRequest);
  console.log("create comment: createCommentTypedData", result);

  const typedData = result.data.createCommentTypedData.typedData;
  console.log("create comment: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("create comment: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  const tx = await lensHub.commentWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("create comment: tx hash", tx.hash);

  console.log("create comment: poll until indexed");
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log("create comment: profile has been indexed", result);

  const logs = indexedResult.txReceipt.logs;

  console.log("create comment: logs", logs);

  const topicId = utils.id(
    "CommentCreated(uint256,uint256,string,uint256,uint256,bytes,address,bytes,address,bytes,uint256)"
  );
  console.log("topicid we care about", topicId);

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
  console.log("create comment: created log", profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log("create comment: created event logs", profileCreatedEventLog);

  const publicationId = utils.defaultAbiCoder.decode(
    ["uint256"],
    profileCreatedEventLog[2]
  )[0];

  console.log(
    "create comment: contract publication id",
    BigNumber.from(publicationId).toHexString()
  );
  console.log(
    "create comment: internal publication id",
    profileId + "-" + BigNumber.from(publicationId).toHexString()
  );

  return result.data;
};
