import "@/styles/globals.css";
import "@shopify/shopify-api/adapters/node";
import "@shopify/shopify-api/adapters/cf-worker";
import "@shopify/shopify-api/adapters/web-api";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return 
  
  <Component {...pageProps} />;
}
