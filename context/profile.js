import { createContext, useContext } from "react";
const ProfileContext = createContext();

export function useProfileContext() {
  return useContext(ProfileContext);
}

export default ProfileContext;
