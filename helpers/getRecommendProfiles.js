import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { prettyJSON } from "../utils/helpers";

const RECOMMENDED_PROFILES = `
  query {
    recommendedProfiles {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              width
              height
              mimeType
            }
            small {
              url
              width
              height
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              width
              height
              mimeType
            }
            small {
              height
              width
              url
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
            type
          }
          ... on RevertFollowModuleSettings {
            type
          }
        }
  	}
  }
`;

const getRecommendedProfilesRequest = () => {
  return apolloClient.query({
    query: gql(RECOMMENDED_PROFILES),
  });
};

export const recommendedProfiles = async (address, signer) => {
  console.log("recommended profiles: address", address);

  await login(address, signer);

  // only showing one example to query but you can see from request
  // above you can query many
  const result = await getRecommendedProfilesRequest();

  prettyJSON("recommended profiles: result", result.data);

  return result.data;
};
