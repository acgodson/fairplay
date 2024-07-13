import { defineChain } from "viem";

export const privyConfig = {
  loginMethods: ["google", "email"],
  appearance: {
    theme: "dark",
    accentColor: "#676FFF",
    logo: `${process.env.BASE_URL}/logo-icon.png`,
  },
  embeddedWallets: {
    createOnLogin: "all-users",
    noPromptOnSignature: false,
  },
  walletConnectCloudProjectId: "957c795c4c86e7c46609c0cd4064fa00",
};


export const spicyTestnet = defineChain({
  id: 88882,
  name: "Chiliz Spicy Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ",
  },
  rpcUrls: {
    default: {
      http: ["https://spicy-rpc.chiliz.com/ "],
      webSocket: ["wss://spicy-rpc-ws.chiliz.com/"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.chiliscan.com/" },
  },
});
