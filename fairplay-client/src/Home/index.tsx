"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";


export default function Home() {
  const { user, authenticated } = usePrivy();
  const { wallets } = useWallets();


  return (
 
<>
<p>home page</p>
</>
  );
}
