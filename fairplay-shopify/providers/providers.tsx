"use client";

import { AppProvider } from "@shopify/polaris";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import ApolloProvider from "./ApolloProvider";
import { privyConfig } from "@/utils/config";
import { GlobalProvider } from "@/contexts/GlobalContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider i18n={translations}>
      <ApolloProvider>
        {/* <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
          config={privyConfig as PrivyClientConfig}
        > */}
        {/* <GlobalProvider> */}
        {children}
        {/* </GlobalProvider> */}
        {/* </PrivyProvider> */}
      </ApolloProvider>
    </AppProvider>
  );
}

export function ExitProvider({ children }: { children: React.ReactNode }) {
  return <AppProvider i18n={translations}>{children}</AppProvider>;
}
