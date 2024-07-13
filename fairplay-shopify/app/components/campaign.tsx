import { useCallback, useState } from "react";
import {
  Card,
  Button,
  Thumbnail,
  Text,
  BlockStack,
  ResourceList,
  ButtonGroup,
  ResourceItem,
  Collapsible,
  EmptyState,
} from "@shopify/polaris";

export const Campaign = ({ item }: { item: any }) => {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  // const totalAmount = cartItems.reduce(
  //   (acc: any, item: any) => acc + item.price * item.quantity,
  //   0,
  // );

  // https://fairplay-chiliz-sporty.vercel.app

  return (
    <div className="hidden md:block w-80 bg-gray-100 fixed right-0 top-0 h-full overflow-auto pt-4">
      {!item ? (
        <>
          <EmptyState
            heading="Chilliz Sports Chain"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p className="px-6">
              Publish and Manage campaigns for sports merchs
            </p>
          </EmptyState>
        </>
      ) : (
        <>
          <p>
            {" "}
            activation code:
            <span style={{ letterSpacing: "1.30px", color: "green" }}>
              {" "}
              03578
            </span>
          </p>
          <ButtonGroup>
            <Button>Delete Draft</Button>
            <a href="https://fairplay.vercel.app/draft/" target="_blank">
              {" "}
              <Button variant="primary">Start Campaign</Button>
            </a>
          </ButtonGroup>

          <div className="flex mt-4">
            <div className="flex-1 overflow-auto">
              <Card>
                <BlockStack gap="200">
                  <div
                    className="w-full cursor-pointer flex justify-between"
                    onClick={handleToggle}
                  >
                    <Text as="h2" variant="headingSm">
                      Eligible Products
                    </Text>
                    <p className="text-red-500">2</p>
                  </div>
                  <Collapsible
                    open={open}
                    id="basic-collapsible"
                    transition={{
                      duration: "500ms",
                      timingFunction: "ease-in-out",
                    }}
                    expandOnPrint
                  >
                    <ResourceList
                      resourceName={{ singular: "product", plural: "products" }}
                      items={[
                        {
                          id: "341",
                          name: "Black & orange scarf",
                          media: (
                            <Thumbnail
                              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                              alt="Black orange scarf"
                            />
                          ),
                        },
                        {
                          id: "256",
                          name: "Tucan scarf",
                          media: (
                            <Thumbnail
                              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                              alt="Tucan scarf"
                            />
                          ),
                        },
                      ]}
                      renderItem={(item) => {
                        const { id, name, media } = item;

                        return (
                          <ResourceList.Item
                            id={id}
                            url={"#"}
                            media={media}
                            persistActions
                          >
                            <Text variant="bodyMd" fontWeight="bold" as="h3">
                              {name}
                            </Text>
                          </ResourceList.Item>
                        );
                      }}
                    />
                  </Collapsible>
                </BlockStack>
              </Card>
            </div>
          </div>

          <div className="">
            <ResourceList
              resourceName={{ singular: "customer", plural: "customers" }}
              items={[
                {
                  id: "Beneficiaries",
                  value: "0",
                },
                {
                  id: "End date",
                  value: "-",
                },
                {
                  id: "Service fee",
                },
              ]}
              renderItem={(item) => {
                const { id, value } = item;

                return (
                  <ResourceItem id={id} onClick={() => {}}>
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {value}
                    </Text>
                    <div>{id}</div>
                  </ResourceItem>
                );
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

// export const ProductList = ({ products, addItemToCart }: any) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {products.map((product: any, index: number) => (
//         <Box key={index}>
//           <Thumbnail
//             source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
//             size="small"
//             alt="Black choker necklace"
//           />
//         </Box>
//       ))}
//     </div>
//   );
// };
