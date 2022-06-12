import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { signedTypeData, splitSignature } from "../utils/ethers.service";
import { ethers } from "ethers";
import { LENS_HUB_CONTRACT, LENS_HUB_ABI } from "../utils/config";

const CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA = `
  mutation($request: UpdateProfileImageRequest!) { 
    createSetProfileImageURITypedData(request: $request) {
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
          SetProfileImageURIWithSig {
            name
            type
          }
        }
        value {
          nonce
        	deadline
        	imageURI
        	profileId
        }
      }
    }
 }
`;

// TODO typings
const createSetProfileImageUriTypedData = (request) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA),
    variables: {
      request,
    },
  });
};

export const setProfileImageUriNormal = async (
  profileId,
  address,
  signer,
  pictureURL
) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  console.log("set profile image uri normal: address", address);

  await login(address);

  // hard coded to make the code example clear
  const setProfileImageUriRequest = {
    profileId,
    url: pictureURL,
  };

  const result = await createSetProfileImageUriTypedData(
    setProfileImageUriRequest
  );
  console.log(
    "set profile image uri normal: enableDispatcherWithTypedData",
    result
  );

  const typedData = result.data.createSetProfileImageURITypedData.typedData;
  console.log("set profile image uri normal: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value,
    signer
  );
  console.log("set profile image uri normal: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  const tx = await lensHub.setProfileImageURIWithSig({
    profileId: typedData.value.profileId,
    imageURI: typedData.value.imageURI,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("set profile image uri normal: tx hash", tx.hash);

  return tx.hash;
};
