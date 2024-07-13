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
