import { gql } from "@apollo/client/core";
import { apolloClient } from "../utils/apollo-client";
import { login } from "./login";

const HIDE_PUBLICATION = `
  mutation($request: HidePublicationRequest!) { 
   hidePublication(request: $request)
 }
`;

export const deletePublicationRequest = (publicationId) => {
  return apolloClient.mutate({
    mutation: gql(HIDE_PUBLICATION),
    variables: {
      request: {
        publicationId,
      },
    },
  });
};

export const deletePublication = async (address, pubId) => {
  console.log("delete publication: address", address);

  await login(address);

  await deletePublicationRequest(pubId);

  console.log("delete publication: success");
  return "deleted";
};
