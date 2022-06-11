import { utils } from "ethers";
import { omit } from "./helpers";

export const splitSignature = (signature) => {
  return utils.splitSignature(signature);
};

export const signedTypeData = (domain, types, value, signer) => {
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};
