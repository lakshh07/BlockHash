import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createClient } from "wagmi";

const client = createClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
