import {
  Avatar,
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  Divider,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useToast,
  VStack,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useGlobalContext } from "../contexts/GlobalContext";
import {
  ConnectedWallet,
  useFarcasterSigner,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";

import BearAvatar from "../components/shared/BearAvatar";
import { MdOutlineLogout } from "react-icons/md";
import { shortenAddress } from "../../utils/helpers";

import LayoutWrapper from "../components/template/layout-wrapper";
import Providers from "@/providers/providers";

export default function Layout({ children }: any) {
  return <Providers>{children}</Providers>;
}
