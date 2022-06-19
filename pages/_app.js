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
                    <meta property="og:title" content="BlockHash" />
                    <meta property="og:type" content="website" />
                    <meta
                      property="og:url"
                      content="https://blockhash.vercel.app/"
                    />
                    <meta property="og:site_name" content="BlockHash" />
                    <meta
                      property="og:description"
                      content="BlockHash is a metaverse blogging platform built with Lens Protocol 🌿"
                    />
                    <meta
                      property="og:image"
                      content="https://i.ibb.co/5Wscxhr/Screenshot-2022-06-14-at-9-23-09-AM.png"
                    />
                    <meta
                      property="og:image:url"
                      content="https://i.ibb.co/5Wscxhr/Screenshot-2022-06-14-at-9-23-09-AM.png"
                    />

                    <meta
                      property="og:image:secure_url"
                      content="https://i.ibb.co/5Wscxhr/Screenshot-2022-06-14-at-9-23-09-AM.png"
                    />
                    <meta name="twitter:title" content="BlockHash" />
                    <meta
                      name="twitter:description"
                      content="BlockHash is a metaverse blogging platform built with Lens Protocol 🌿"
                    />
                    <meta
                      name="twitter:url"
                      content="https://blockhash.vercel.app/"
                    />
                    <meta
                      name="twitter:image:src"
                      content="https://i.ibb.co/5Wscxhr/Screenshot-2022-06-14-at-9-23-09-AM.png"
                    />
                    <meta
                      name="twitter:card"
                      content="https://i.ibb.co/5Wscxhr/Screenshot-2022-06-14-at-9-23-09-AM.png"
                    />
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
