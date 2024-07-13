"use client";
import NavGroup from "../molecules/nav-group";
import { ChevronDown, Github } from "lucide-react";

import { useMemo, useState } from "react";
import { cn } from "../../../utils";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { usePrivy } from "@privy-io/react-auth";
import BearAvatar from "../shared/BearAvatar";
import { Button } from "@chakra-ui/react";

const Header = ({ className }: { className?: string }) => {
  const [segment, setSegments] = useState<number>(0);
  const { user } = usePrivy();
  const { handleLogin, openAccountModal, address } = useGlobalContext();

  const navs = useMemo(
    () => [
      {
        title: "Feed",
        value: "feed",
        href: "/",
        isActive: segment === 0,
      },
      {
        title: "Proposals",
        value: "proposals",
        href: "/proposals",
        isActive: segment === 1,
      },
      {
        title: "Docs",
        value: "docs",
        href: "/documentation",
        isActive: segment === 2,
      },
    ],
    [segment]
  );

  return (
    <div
      className={` flex justify-between items-center px-4 min-h-[70px] bg-transparent pr-8 ${className}`}
    >
      <a
        className="flex space-x-2 text-md"
        target="_blank"
        href="https://github.com/acgodson/fairplay"
      >
        <Github />
        <p className="">Source</p>
      </a>

      {/* <NavGroup navs={navs} /> */}

      <Button
        className={cn("bg-zinc-800 text-white hover:bg-zinc-700 ")}
        bg="zinc700"
        color={"white"}
        w="150px"
        _hover={{
          bg: "zinc700",
          color: "white",
        }}
        py={3}
        px={2}
        _active={{
          bg: "zinc700",
          color: "white",
        }}
        leftIcon={
          user && address ? (
            <BearAvatar size="sm" did={user?.id ?? ""} />
          ) : (
            <div />
          )
        }
        onClick={user && address ? openAccountModal : handleLogin}
        isDisabled={false}
      >
        {!user ? "Connect" : "Connected"}
      </Button>
    </div>
  );
};

export default Header;
