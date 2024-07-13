import shopify from "@/lib/shopify/initialize-context";
import { verifyRequest } from "@/lib/shopify/verify";
import { NextResponse } from "next/server";

export type APIResponse<DataType> = {
  status: "success" | "error";
  data?: DataType;
  message?: string;
};

type OrderItem = {
  productID: string;
  customerID: string;
  customerEmail: string;
  orderID: string;
  dateOrdered: string;
};

type Data = {
  items: OrderItem[];
  count: number;
};

export async function GET(req: Request) {
  // session token is located in the request headers
  const validSession = await verifyRequest(req, true); // could use middleware for this?
  console.log("validSession", validSession);

  if (!validSession) {
    return NextResponse.json<APIResponse<null>>({
      status: "error",
      message: "Invalid session",
    });
  }

  try {
    const client = new shopify.clients.Graphql({ session: validSession });
    const response: any = await client.query({
      data: `query {
          orders(first: 10) {
            edges {
              node {
                id
                createdAt
                customer {
                  id
                  email
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      product {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
    });

    if (response.body && response.body.data && response.body.data.orders) {
      const items = response.body.data.orders.edges
        .map((edge: any) => {
          const order = edge.node;
          return order.lineItems.edges.map((item: any) => ({
            productID: item.node.product.id,
            customerID: order.customer.id,
            customerEmail: order.customer.email,
            orderID: order.id,
            dateOrdered: order.createdAt,
          }));
        })
        .flat();

      return NextResponse.json<APIResponse<Data>>({
        status: "success",
        data: {
          items,
          count: items.length,
        },
      });
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("GraphQL query error:", error);
    return NextResponse.json<APIResponse<null>>({
      status: "error",
      message: `Failed to fetch orders, ${error}`,
    });
  }
}
