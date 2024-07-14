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
  createSmartAccountClient,
  LightSigner,
} from "@biconomy/account";
import { ChainId } from "@biconomy/core-types";

import { useDisclosure, useToast } from "@chakra-ui/react";

import { spicyTestnet } from "../../utils/config";

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
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [network, switchNetwork] = useState<any | null>(spicyTestnet);
  const [address, setAddress] = useState<`0x${string}` | null>(null);
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

    console.log("signer, ", provider?.getSigner() as LightSigner);
    const smClient = await createSmartAccountClient({
      signer,
      chainId: ChainId.CHILIZ_TESTNET,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${network.id}/${
        process.env.NEXT_PUBLIC_BUNDLER_ID as string
      }`,
      biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_KEY,
      rpcUrl: "https://spicy-rpc.chiliz.com/",
      entryPointAddress:
        process.env.NEXT_PUBLIC_CHILIZ_BUNDLER_ENTRYPOINT_ADDRESS,
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

  useEffect(() => {
    console.log("wwww", wallets);
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

  //TODO: handle color mode

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
