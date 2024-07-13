"use client";

import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { GlobalProvider } from "../contexts/GlobalContext";
import { ChakraProvider } from "@chakra-ui/react";
import { privyConfig } from "../../utils/config";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        config={privyConfig as PrivyClientConfig}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </PrivyProvider>
    </ChakraProvider>
  );
}
