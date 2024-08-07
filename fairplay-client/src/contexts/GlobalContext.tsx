import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import {
  BiconomySmartAccountV2,
  Bundler,
  createSmartAccountClient,
  LightSigner,
  Paymaster,
  PaymasterMode,
} from "@biconomy/account";
import { ChainId } from "@biconomy/core-types";
import {
  createPublicClient,
  encodeFunctionData,
  fromBytes,
  getAddress,
  http,
  toBytes,
  toHex,
} from "viem";
import { useDisclosure, useToast } from "@chakra-ui/react";

import { spicyTestnet } from "../../utils/config";
import contractAbi from "../abi/FAIRPLAY.json";

interface GlobalContextType {
  index: number;
  address: `0x${string}` | null;
  isAccountModalOpen: boolean;
  setIndex: (index: number) => void;
  switchNetwork: (index: number) => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  smartAccount: BiconomySmartAccountV2 | null;
  resetSmartAccount: (privyWallet: ConnectedWallet) => void;
  handleLogin: () => void;
  handleLogout: () => void;
  publicClient: any;
  allCampaigns: any | null;
  hash: string | null;
  fetching: boolean
  startCampaign: (
    shop: string,
    docId: string,
    durations: number | BigInt
  ) => any;
}

interface Campaign {
  id: number;
  cid: string;
  merchant: string;
  rewardToken: string;
  isNFT: boolean;
  endTime: number;
  isActive: boolean;
  value: number;
  metadata?: any;
}

const contractAddress = process.env.NEXT_PUBLIC_FAIRPLAY_CONTRACT;

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [network, switchNetwork] = useState<any | null>(spicyTestnet);
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const [allCampaigns, setAllCampaigns] = useState<any | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const {
    isOpen: isAccountModalOpen,
    onOpen: openAccountModal,
    onClose: closeAccountModal,
  } = useDisclosure();
  const { authenticated, user, login, logout, connectOrCreateWallet } =
    usePrivy();
  const { wallets } = useWallets();
  const toast = useToast();

  async function smartAccountClient(privyWallet: ConnectedWallet) {
    if (!privyWallet) {
      console.log("not privy embedded wallet found");
      return;
    }
    // await privyWallet.switchChain("0x15B92");
    const provider = await privyWallet.getEthersProvider();
    const signer = provider?.getSigner() as LightSigner;

    const bundler = new Bundler({
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${ChainId.CHILIZ_TESTNET}/${process.env.NEXT_PUBLIC_BUNDLER_ID}`,
      chainId: ChainId.CHILIZ_TESTNET,
      entryPointAddress:
        process.env.NEXT_PUBLIC_CHILIZ_BUNDLER_ENTRYPOINT_ADDRESS,
    });

    const paymaster = new Paymaster({
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/${ChainId.CHILIZ_TESTNET}/${process.env.NEXT_PUBLIC_PAYMASTER_KEY}`,
    });

    console.log("signer, ", provider?.getSigner() as LightSigner);
    const smClient = await createSmartAccountClient({
      signer,
      chainId: ChainId.CHILIZ_TESTNET,
      bundler: bundler,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${network.id}/${process.env.NEXT_PUBLIC_BUNDLER_ID}`,
      biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_KEY,
      rpcUrl: "https://spicy-rpc.chiliz.com/",
      entryPointAddress: "0x00000061FEfce24A79343c27127435286BB7A4E1",
      paymaster: paymaster,
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/${ChainId.CHILIZ_TESTNET}/${process.env.NEXT_PUBLIC_PAYMASTER_KEY}`,
    });
    console.log(smClient);
    return smClient;
  }

  const handleLogin = async () => {
    try {
      if (authenticated) {
        await logout();
      }
      login();
      connectOrCreateWallet();
    } catch (e) {
      console.log(e);
      toast({
        description: (e as any).message,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      closeAccountModal();
      await logout();
    } catch (e) {
      console.log(e);
      toast({
        description: (e as any).message,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const resetSmartAccount = async (privyWallet: ConnectedWallet) => {
    const smartWallet = await smartAccountClient(privyWallet);
    if (smartWallet) {
      setSmartAccount(smartWallet);
      setAddress(await smartWallet.getAddress());
    }
  };

  const fetchDraft = async (cid: string): Promise<any> => {
    try {
      const response = await fetch(`/api/draft?id=${cid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch draft");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching draft:", error);
      return null;
    }
  };

  const getAllCampaigns = async (): Promise<Campaign[] | null> => {
    try {
      setFetching(true)
      const campaignCounter: any = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: "campaignCounter",
        args: [],
      });
      console.log("logged counter", campaignCounter);
      const campaigns: Campaign[] = [];

      for (let i = 1; i <= Number(campaignCounter); i++) {
        const campaignData: any = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: contractAbi,
          functionName: "campaigns",
          args: [i],
        });
        if (campaignData) {
          console.log("campaign data", campaignData);
          const cid = campaignData[1];
          const bytes = new Uint8Array(Buffer.from(cid.slice(2), "hex"));
          const c = fromBytes(bytes, "string").replace(/\0/g, "");

          const metadata = await fetchDraft(c);

          const campaign: Campaign = {
            id: Number(campaignData[0]),
            cid: c,
            merchant: campaignData[2],
            rewardToken: campaignData[3],
            isNFT: campaignData[4],
            endTime: Number(campaignData[5]),
            isActive: campaignData[7],
            value: Number(campaignData[6]),
            metadata,
          };

          campaigns.push(campaign);
        }
        console.log("all campaigns", campaigns);
        setAllCampaigns(campaigns);
        setFetching(false)
        return campaigns;
      }
      return null;
    } catch (error) {
      setAllCampaigns([]);
      setFetching(false)
      console.error("Error getting campaigns:", error);
      return [];
    }
  };

  const startCampaign = async (
    shop: string,
    docId: string,
    duration: number | BigInt = 604800
  ) => {
    if (!smartAccount) {
      console.log("smart account not created");
      return;
    }
    console.log("the smart account", smartAccount);
    try {
      setHash(null);
      const toBytes32 = (value: string) => toBytes(value, { size: 32 });
      const _shop = toBytes32(shop);
      const _cid = toBytes32(docId);

      const data = encodeFunctionData({
        abi: contractAbi,
        functionName: "startCampaign",
        args: [
          toHex(_shop),
          toHex(_cid),
          getAddress(process.env.NEXT_PUBLIC_FAIRPLAY_TOKEN!),
          false,
          0,
          duration,
        ],
      });

      const txn = {
        data,
        to: contractAddress as `0x${string}`,
        from: await smartAccount.getAccountAddress(),
      };

      //send gasless Transaction
      const userOpResponse = await smartAccount.sendTransaction(txn, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      const { transactionHash } = await userOpResponse.waitForTxHash();
      console.log("Transaction Hash", transactionHash);
      const userOpReceipt = await userOpResponse.wait();
      if (userOpReceipt.success == "true") {
        console.log("UserOp receipt", userOpReceipt);
        console.log("Transaction receipt", userOpReceipt.receipt);
        setHash(userOpReceipt.receipt.transactionHash);
        return userOpReceipt.receipt;
      }
    } catch (e: any) {
      console.log("error starting campaign", e.message);
    }
  };

  useEffect(() => {
    if (!allCampaigns) {
      getAllCampaigns();
    }
  }, [allCampaigns]);

  useEffect(() => {
    if (wallets.length > 0) {
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );
      if (!embeddedWallet) {
        console.log("no embedded wallet wound");
        return;
      }
      console.log("embedded wallet", embeddedWallet);
      resetSmartAccount(embeddedWallet);
    }
  }, [wallets]);

  const publicClient = createPublicClient({
    chain: spicyTestnet,
    transport: http(),
  });

  return (
    <GlobalContext.Provider
      value={{
        index,
        address,
        isAccountModalOpen,
        setIndex,
        closeAccountModal,
        openAccountModal,
        handleLogin,
        handleLogout,
        switchNetwork,
        smartAccount,
        resetSmartAccount,
        publicClient,
        hash,
        startCampaign,
        allCampaigns,
        fetching
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
