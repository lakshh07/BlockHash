import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";
import { prettyJSON } from "../utils/helpers";

const GET_PENDING_APPROVAL_FOLLOWS = `
  query($request: PendingApprovalFollowsRequest!) {
    pendingApprovalFollows(request: $request) { 
			    items {
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
            handle
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
                medium {
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
              }
            }
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
                  width
                  url
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
                    name
                    symbol
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
       pageInfo {
          prev
          next
          totalCount
       }
		}
  }
`;

const pendingApprovalFollows = () => {
  return apolloClient.query({
    query: gql(GET_PENDING_APPROVAL_FOLLOWS),
    variables: {
      request: {
        limit: 10,
      },
    },
  });
};

export const pendingApprovals = async (address) => {
  console.log("pending approvals: address", address);

  await login(address);

  const result = await pendingApprovalFollows();
  prettyJSON("pending approvals: result", result.data);

  return result.data;
};
