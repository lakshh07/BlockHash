// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient as createUrqlClient } from "urql";
import { refreshAuthToken } from "../../utils/utils";

export const APIURL = "https://api-mumbai.lens.dev/";
export const STORAGE_KEY = "LH_STORAGE_KEY";

export const basicClient = new createUrqlClient({
  url: APIURL,
});

export async function createClient() {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storageData) {
    try {
      const { accessToken } = await refreshAuthToken();
      const urqlClient = new createUrqlClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      return urqlClient;
    } catch (err) {
      console.log("error refreshing token: ", err);
    }
  } else {
    return basicClient;
  }
}

export {
  recommendProfiles,
  getProfiles,
  getProfileByHandle,
  getProfileById,
  getPublications,
  getPublication,
  searchProfiles,
  searchPublications,
  explorePublications,
  doesFollow,
  getChallenge,
  getUsersNfts,
  getDefaultProfile,
  getComments,
} from "./queries";

export {
  followUser,
  authenticate,
  refresh,
  createUnfollowTypedData,
  broadcast,
} from "./mutations";
