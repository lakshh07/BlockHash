import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "./../helpers/rainbowSetup";
import SignerContext from "../context/signer";
import ProfileContext from "../context/profile";
import LoadingContext from "../context/loading";
import { createClient, Provider } from "urql";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";

const client = createClient({
  url: "https://api-mumbai.lens.dev/",
});

// const client = createClient();

function MyApp({ Component, pageProps }) {
  const [wallet, setWallet] = useState({ signer: null, address: "" });
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        coolMode
        chains={chains}
        theme={lightTheme({
          fontStack: "system",
        })}
      >
        <ChakraProvider>
          <Provider value={client}>
            <SignerContext.Provider value={{ wallet, setWallet }}>
              <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
                <LoadingContext.Provider value={{ loading, setLoading }}>
                  <Head>
                    <html lang="en" />
                    <meta charSet="utf-8" />
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1.0"
                    />
                    <title>BlockHash</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="theme-color" content="#1111" />
                    <meta name="author" content="Lakshay Maini" />
                  </Head>
                  <Loading />
                  <Box className={loading ? "blur" : null}>
                    {router.asPath !== "/" && <Navbar />}
                    <Component {...pageProps} />
                  </Box>
                </LoadingContext.Provider>
              </ProfileContext.Provider>
            </SignerContext.Provider>
          </Provider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
