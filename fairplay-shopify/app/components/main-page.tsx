"use client";

import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import {
  BlockStack,
  Box,
  Button,
  CalloutCard,
  Card,
  Page,
  Tabs,
  Text,
  TextField,
  Spinner,
  Badge,
} from "@shopify/polaris";
import { PlusIcon, CartIcon, DeleteIcon } from "@shopify/polaris-icons";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { doServerAction, doTokenExchange } from "../actions";
import { Campaign } from "./campaign";
// import { useGlobalContext } from "@/contexts/GlobalContext";

interface Data {
  name: string;
  height: string;
}

interface SelectedProduct {
  name: string;
  id: string;
}

const products = [
  {
    id: 1,
    name: "Shawarma Loaded",
    price: 3500,
    image:
      "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
    quantity: 1,
  },
  {
    id: 2,
    name: "Pizza",
    price: 4500,
    image:
      "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
    quantity: 1,
  },
];

const tabs = [
  {
    id: "all",
    content: "All",
    accessibilityLabel: "All meals",
    panelID: "all-customers-content-1",
  },
  {
    id: "drafts",
    content: "Drafts",
    panelID: "draft-campaigns",
  },
  {
    id: "active",
    content: "Active",
    panelID: "active-campaigns",
  },
];

export default function Home({ shop }: { shop: string }) {
  const app = useAppBridge();
  const ref = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    any[] | SelectedProduct[]
  >([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [cartItems, setCartItems] = useState<any>(products);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const result = await response.json();
      console.log(result);
      return result.data;
    } catch (error) {
      console.log("Error fetching orders:", error);
      return [];
    }
  };

  const handleFetchQualifiedOrders = async (shop: string, draftId: string) => {
    try {
      const orders = await fetchOrders();
      console.log("result from orders", orders);
      //for qualified orders we have to match the orderID we have inside the array of products in a campaign. And if
      // an order out there matches, we'll return the qualified object. This is what we'll use to validate the airdrop
      console.log("Qualified Orders:", orders);
    } catch (err: any) {
      console.log("Error fetching qualified orders:", err);
    }
  };

  const addProduct = async () => {
    const selected: any = await app.resourcePicker({ type: "product" });
    console.log(selected);
    const selectedItems = selected.selection;
    const newSelectedProducts = selectedItems.map((item: any) => ({
      id: item.id,
      name: item.title,
    }));

    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      ...newSelectedProducts,
    ]);
  };

  const handleSave = useCallback(async () => {
    const payload = {
      products: selectedProducts,
      endDate: date,
      campaignTitle: title,
      shop: shop,
    };
    console.log(payload);
    setSaving(true);
    try {
      const response = await fetch("/api/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }

      const data = await response.json();
      console.log("Draft saved with ID:", data.id);
      setSaving(false);
    } catch (error) {
      console.error("Error saving draft:", error);
      setSaving(false);
    }
  }, [selectedProducts, date, title, shop]);

  useEffect(() => {
    app.idToken().then((token) => {
      // store the token in our database automatically
      doTokenExchange(shop, token, false).then(() => {
        console.log("Token stored");
      });
    });
  }, [app, shop]);

  const loadDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/draft?shop=${shop}`);
      if (!response.ok) {
        throw new Error("Failed to load drafts");
      }
      const data = await response.json();
      console.log("fetched draft", data);
      setDrafts(data);
    } catch (error) {
      console.error("Error loading drafts:", error);
    } finally {
      setLoading(false);
    }
  }, [shop]);

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  const handleTabChange = useCallback(
    (tabIndex: number) => setTab(tabIndex),
    [],
  );
  const handleTitleChange = useCallback((value: string) => setTitle(value), []);
  const handleDateChange = useCallback((value: string) => setDate(value), []);
  const handleCartToggle = () => {
    console.log("toggled cart", !isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Page title="Fairplay" fullWidth>
      <div className="flex h-screen">
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4 md:mr-80">
          <CalloutCard
            title="Fairplay Campaigns"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              id: "create-campaign",
              icon: PlusIcon,
              content: "Create New Campaign",
              onAction: async () => {
                console.log("test");
                // handleLogin();
                // await handleFetchQualifiedOrders(shop, "jQIucCUrQnXbUsATnpP4");
                //@ts-ignore
                document.getElementById("create-modal").show();
                // fetchProducts();
              },
            }}
          >
            <p>Offer exciting rewards to your sporty customers.</p>
            <br />
          </CalloutCard>
          <br />
          <br />

          <br />
          <br />

          <Tabs tabs={tabs} selected={tab} onSelect={handleTabChange}>
            <br />
            <br />
            {loading ? (
              <Spinner
                accessibilityLabel="Loading form field"
                hasFocusableParent={false}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drafts.length > 0 &&
                    drafts.map((draft, i) => (
                      <div
                        key={i}
                        className="flex flex-col w-70%"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setSelectedItem(
                            selectedItem?.campaignTitle === draft.campaignTitle
                              ? null
                              : draft,
                          )
                        }
                      >
                        <Card
                          roundedAbove="sm"
                          background={
                            selectedItem?.campaignTitle === draft.campaignTitle
                              ? "bg-fill-brand-disabled"
                              : "bg-surface"
                          }
                        >
                          <div className="flex justify-between w-full ">
                            <div className="">
                              <BlockStack gap="200">
                                <div className="flex flex-row gap-1">
                                  <Text as="h2" variant="headingSm">
                                    {draft.campaignTitle}
                                  </Text>
                                  <Badge size="small">Draft</Badge>
                                </div>

                                <Box paddingBlockEnd="200">
                                  <Text as="p" variant="bodySm">
                                    Ends in {draft.endDate}
                                  </Text>
                                </Box>
                              </BlockStack>
                            </div>

                            <div className="w-30%">
                              <img
                                alt=""
                                width="100%"
                                height="100px"
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                                src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                              />
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                </div>
              </>
            )}
          </Tabs>
        </div>

        {/* ///////////////////
         sidebars
        //////////////////// */}

        {/* Cart drawer for desktop */}
        <div className="hidden md:block w-80 bg-gray-100 fixed right-0 top-0 h-full overflow-auto p-4">
          {/* let's simulate a cart here */}

          <Campaign item={selectedItem} />
        </div>

        {/* Cart drawer for mobile */}
        <div
          className={`fixed inset-0 
          bg-gray-100 
          
          transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden z-50`}
          // style={{ zIndex: 100 }}
        >
          <div className="h-full overflow-auto p-4 w-full bg-white">
            <Button onClick={handleCartToggle}>Close Cart</Button>
          </div>

          <Campaign item={selectedItem} />
        </div>

        {/* Cart toggle button for mobile */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button icon={CartIcon} onClick={handleCartToggle} />
        </div>
      </div>

      {/* ///////////////////
         modal
        //////////////////// */}
      <div ref={ref}>
        <Modal id="create-modal">
          <TitleBar title="New Campaign"></TitleBar>
          <div className="px-4 mt-8 mb-4 w-full">
            <TextField
              value={title}
              onChange={handleTitleChange}
              label="Campaign title"
              type="text"
              autoComplete="title"
            />

            <br />
            <TextField
              value={selectedProducts.map((product) => product.name).join(", ")}
              label={
                <div className="flex flex-row justify-between w-full gap-4">
                  <div>
                    {" "}
                    <p>Whitelist</p>
                  </div>
                  <div>
                    {" "}
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log("swapping is happening");
                        addProduct();
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              }
              type="text"
              autoComplete="whitelist"
              readOnly={true}
              helpText={
                "Orders for any of your whitelisted products would grant eligibilty for campaign reward"
              }
            />

            <br />

            <TextField
              value={date}
              onChange={handleDateChange}
              label="End Date"
              type="date"
              autoComplete="date"
            />

            <div className="w-full flex flex-row justify-end mt-8 gap-4">
              <Button
                onClick={() => {
                  (document.getElementById("create-modal") as any)?.hide();
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" loading={saving} onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Page>
  );
}
