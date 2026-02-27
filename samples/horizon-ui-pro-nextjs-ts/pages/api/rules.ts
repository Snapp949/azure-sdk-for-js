import type { NextApiRequest, NextApiResponse } from "next";

/**
 * RULE Ecosystem Demo API
 *
 * This is a demonstration API that uses an in-memory store.
 * Data is NOT persistent and will be reset when the server restarts.
 *
 * The API models a simple credit-building ecosystem with:
 * - Balance: User's RULE native currency balance
 * - Products: Credit-building products that can be created
 * - Market Listings: Products listed on the secondary market
 */

/** Product interface representing a credit-building product */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  listed: boolean;
}

/** State interface for the RULE ecosystem */
interface RuleState {
  balance: number;
  products: Product[];
  marketListings: Product[];
}

/** Request body types for POST actions */
interface AddBalanceRequest {
  action: "addBalance";
  amount: number;
}

interface AddProductRequest {
  action: "addProduct";
  product: {
    name: string;
    description: string;
    price: number;
  };
}

interface ListToMarketRequest {
  action: "listToMarket";
  productId: string;
}

type PostRequestBody = AddBalanceRequest | AddProductRequest | ListToMarketRequest;

/** Response types */
interface SuccessResponse extends RuleState {
  message?: string;
}

interface ErrorResponse {
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * In-memory store for the RULE ecosystem demo.
 * WARNING: This data is not persistent and will be lost on server restart.
 */
const store: RuleState = {
  balance: 1000, // Initial balance of 1000 RULE
  products: [],
  marketListings: [],
};

/** Generate a simple unique ID */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * API Route Handler for /api/rules
 *
 * GET: Returns the current state (balance, products, market listings)
 * POST: Performs actions (addBalance, addProduct, listToMarket)
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    // Return current state
    return res.status(200).json({
      balance: store.balance,
      products: store.products,
      marketListings: store.marketListings,
    });
  }

  if (req.method === "POST") {
    const body = req.body as PostRequestBody;

    if (!body || !body.action) {
      return res.status(400).json({ error: "Missing action in request body" });
    }

    switch (body.action) {
      case "addBalance": {
        const { amount } = body;
        if (typeof amount !== "number" || amount <= 0) {
          return res.status(400).json({ error: "Invalid amount" });
        }
        store.balance += amount;
        return res.status(200).json({
          message: `Added ${amount} RULE to balance`,
          balance: store.balance,
          products: store.products,
          marketListings: store.marketListings,
        });
      }

      case "addProduct": {
        const { product } = body;
        if (!product || !product.name) {
          return res.status(400).json({ error: "Invalid product data" });
        }
        const newProduct: Product = {
          id: generateId(),
          name: product.name,
          description: product.description || "",
          price: product.price || 0,
          listed: false,
        };
        store.products.push(newProduct);
        return res.status(201).json({
          message: `Product "${newProduct.name}" created`,
          balance: store.balance,
          products: store.products,
          marketListings: store.marketListings,
        });
      }

      case "listToMarket": {
        const { productId } = body;
        if (!productId) {
          return res.status(400).json({ error: "Missing productId" });
        }
        const productIndex = store.products.findIndex((p) => p.id === productId);
        if (productIndex === -1) {
          return res.status(404).json({ error: "Product not found" });
        }
        const product = store.products[productIndex];
        if (product.listed) {
          return res.status(400).json({ error: "Product already listed" });
        }
        product.listed = true;
        store.marketListings.push(product);
        return res.status(200).json({
          message: `Product "${product.name}" listed on secondary market`,
          balance: store.balance,
          products: store.products,
          marketListings: store.marketListings,
        });
      }

      default:
        return res.status(400).json({ error: "Unknown action" });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
