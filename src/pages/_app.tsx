import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});


export default function App({ Component, pageProps }: AppProps) {
  return (<WagmiConfig config={config}>
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  </WagmiConfig>)
}
