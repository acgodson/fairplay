import Script from "next/script";
import "./globals.css";

import LayoutWrapper from "@/components/template/layout-wrapper";
import Providers from "@/providers/providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="test" content="test" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* This is the recommended way to load script, but it doesn't work */}
        <Script
          src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
