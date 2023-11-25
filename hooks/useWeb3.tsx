import { MetaMaskInpageProvider } from "@metamask/providers";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers, getAddress } from "ethers";

export default function useWeb3() {
  const [account, setAccount] = useState<string>();
  const [web3, setWeb3] = useState<Web3>();

  const getCurChainId = async () => {
    const eth = window.ethereum as MetaMaskInpageProvider;
    const curChainId = await eth.request({
      method: "eth_chainId",
    });

    return curChainId;
  };

  const addAndConnNetwork = async (chainId: string) => {
    const eth = window.ethereum as MetaMaskInpageProvider;

    const network = {
      chainId,
      chainName: "testnet",
      rpcUrls: ["http://127.0.0.1:7545"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
    };

    await eth.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  };

  // 추가된 함수
  const getAccount = async () => {
    const eth = window.ethereum as MetaMaskInpageProvider;

    const account = await eth.request({
      method: "eth_requestAccounts",
    });

    return [ethers.getAddress((account as string[])[0])];
  };

  useEffect(() => {
    (async function () {
      if (window.ethereum !== undefined) {
        const curChainId = await getCurChainId();
        const targetChainId = "0x539";

        if (curChainId !== targetChainId) {
          await addAndConnNetwork(targetChainId);
        }
        const [account] = (await getAccount()) as string[];
        setAccount(account);

        const web3 = new Web3((window as any).ethereum);
        setWeb3(web3);
      }
    })();
  }, []);

  // 리턴 추가
  return [account, web3];
}
