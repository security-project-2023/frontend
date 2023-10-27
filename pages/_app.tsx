import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./components/Header";
import { styled } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 97px;
`;
