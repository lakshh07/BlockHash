import { useAccount, useProvider, useSigner, useSignMessage } from "wagmi";

export const getAddress = async () => {
  const { data } = useAccount();
  return data.address;
};
export const getProvider = async () => {
  const { provider } = useProvider();
  return provider;
};
export const getSigner = async () => {
  const { data: signer } = useSigner();
  return signer;
};

// const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
//   message: message,
// });

export const signText = async (message) => {
  signMessage();

  return data;
};
