"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  Box,
  Button,
  Center,
  Text,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import GlassContainer from "@/components/molecules/glass-container";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/molecules/tabs";
import QueryIntents from "@/components/organisms/query-intents";
import BearAvatar from "@/components/shared/BearAvatar";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { MdOutlineLogout } from "react-icons/md";
import { shortenAddress } from "../../utils/helpers";

export default function Page() {
  const { user, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { isAccountModalOpen, handleLogout, closeAccountModal, address } =
    useGlobalContext();

  return (
    <>
      <GlassContainer>
        <Tabs defaultValue="query">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="query">Home</TabsTrigger>
            <TabsTrigger value="feed">Campaigns</TabsTrigger>
          </TabsList>
          <TabsContent className="rounded-2xl bg-[#F8F8F7] p-4" value="query">
            <QueryIntents />
          </TabsContent>
          <TabsContent
            className="rounded-2xl bg-[#F8F8F7] p-4"
            value="feed"
          ></TabsContent>
        </Tabs>
      </GlassContainer>

      <Modal isOpen={isAccountModalOpen} onClose={closeAccountModal}>
        <ModalOverlay />
        <ModalContent borderRadius={"18px"} mx={[8, 8, 0]}>
          <ModalBody>
            <Box w="100%" pt={8}>
              <VStack w="100%" alignItems={"center"}>
                <Box w="100%">
                  <Center>
                    <BearAvatar size="lg" did={user?.id ?? ""} />
                  </Center>
                  {user &&
                    user?.linkedAccounts
                      .filter((x) => x.type === "google_oauth")
                      .map((account, i) => {
                        if (account) {
                          return (
                            <Box w="100%" key={i}>
                              <Text
                                textAlign={"center"}
                                fontSize={["md"]}
                                fontWeight={"bold"}
                                mt={1}
                              >
                                {account.name}
                              </Text>
                              <Text fontSize={["xs"]} textAlign={"center"}>
                                {account.email}
                              </Text>

                              <HStack
                                w="100%"
                                mt={8}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                              >
                                <Flex alignItems={"center"}>
                                  <Text
                                    fontWeight={"bold"}
                                    mr={2}
                                    fontSize={["sm"]}
                                  >
                                    Joined:
                                  </Text>
                                  <Text fontSize={["sm"]}>
                                    {account.firstVerifiedAt?.toDateString()}
                                  </Text>
                                </Flex>
                              </HStack>
                            </Box>
                          );
                        }

                        return <div key={i} />;
                      })}

                  <Divider pt={2} pb={4} />
                </Box>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter w="100%">
            <HStack
              w="100%"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Button borderRadius={"18px"} colorScheme="gray">
                {shortenAddress(address ?? "")}
              </Button>
              <Flex
                _hover={{
                  textDecoration: "underline",
                }}
                w="fit-content"
                onClick={handleLogout}
                cursor={"pointer"}
                pr={3}
                alignItems={"center"}
                color={"red.700"}
              >
                <MdOutlineLogout />
                <Text ml={2}>Log out</Text>
              </Flex>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
