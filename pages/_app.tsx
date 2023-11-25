import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </QueryClientProvider>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 97px;
`;
