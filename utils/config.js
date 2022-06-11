import lensHubAbi from "./lens-hub-contract-abi.json";
import lensPeripheryAbi from "./lens-periphery-contract-abi.json";
import lensFollowNftAbi from "./lens-follow-nft-contract-abi.json";

// export const argsBespokeInit = () => {
//   return process.argv.find((c) => c === "--init") !== undefined;
// };

// export const PK = getParamOrExit("PK");

// export const MUMBAI_RPC_URL = getParamOrExit("MUMBAI_RPC_URL");

export const LENS_API = "https://api-mumbai.lens.dev/";

export const LENS_HUB_CONTRACT = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

export const LENS_PERIPHERY_CONTRACT =
  "0xD5037d72877808cdE7F669563e9389930AF404E8";

export const LENS_FOLLOW_NFT_CONTRACT =
  "0x1A2BB1bc90AA5716f5Eb85FD1823338BD1b6f772";

export const LENS_PERIPHERY_NAME = "LensPeriphery";

// export const PROFILE_ID = getParam("PROFILE_ID");

export const LENS_FOLLOW_NFT_ABI = lensFollowNftAbi;

export const LENS_HUB_ABI = lensHubAbi;

export const LENS_PERIPHERY_ABI = lensPeripheryAbi;
