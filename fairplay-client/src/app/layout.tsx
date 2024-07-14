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
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
