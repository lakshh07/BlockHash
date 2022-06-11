import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { prettyJSON } from "../utils/helpers";
import { pendingApprovals } from "./pending-approval-follows";

const APPROVE_FOLLOW = `
  mutation($request: ApproveFollowsRequest!) { 
   approveFollow(request: $request)
 }
`;

const approveFollowRequest = (profileId) => {
  return apolloClient.mutate({
    mutation: gql(APPROVE_FOLLOW),
    variables: {
      request: {
        profileId,
      },
    },
  });
};

export const approveFollow = async (address) => {
  console.log("approve follow: address", address);

  const pending = await pendingApprovals(address);
  if (pending.pendingApprovalFollows.items.length === 0) {
    console.log("no pending approvals so can not pick the first one!");
    return;
  }

  const pendingOneProfileId = pending.pendingApprovalFollows.items[0].id;
  console.log("approve follow: pendingOne", pendingOneProfileId);

  const result = await approveFollowRequest(pendingOneProfileId);
  prettyJSON("approve follow: result", result.data);

  return result.data;
};
