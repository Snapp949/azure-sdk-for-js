import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

// Uncomment when Horizon UI Pro is installed:
// import { Card, Button } from "@horizon/ui-pro";

/** Types for the RULE ecosystem */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  listed: boolean;
}

interface RuleState {
  balance: number;
  products: Product[];
  marketListings: Product[];
}

export default function Home() {
  const [state, setState] = useState<RuleState>({
    balance: 0,
    products: [],
    marketListings: [],
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Fetch the current state from the API */
  const fetchState = async () => {
    try {
      const response = await fetch("/api/rules");
      if (!response.ok) {
        throw new Error("Failed to fetch state");
      }
      const data: RuleState = await response.json();
      setState(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  /** Handle adding RULE balance */
  const handleAddBalance = async () => {
    try {
      const response = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addBalance", amount: 100 }),
      });
      if (!response.ok) {
        throw new Error("Failed to add balance");
      }
      await fetchState();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  /** Handle adding a new product */
  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    try {
      const response = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addProduct",
          product: {
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      setNewProduct({ name: "", description: "", price: 0 });
      await fetchState();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  /** Handle listing a product to the secondary market */
  const handleListToMarket = async (productId: string) => {
    try {
      const response = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "listToMarket", productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to list product");
      }
      await fetchState();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  /** Handle input change for new product form */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
        <h1>RULE Currency Dashboard</h1>

        {error && <div className="error">{error}</div>}

        {/* Balance Section */}
        <section className="section">
          <h2>Your RULE Balance</h2>
          <div className="balance-display">
            <span className="balance-amount">{state.balance} RULE</span>
            <button onClick={handleAddBalance} className="btn btn-primary">
              Add 100 RULE
            </button>
          </div>
        </section>

        {/* Add Product Section */}
        <section className="section">
          <h2>Add Credit-Building Product</h2>
          <form onSubmit={handleAddProduct} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (RULE)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Add Product
            </button>
          </form>
        </section>

        {/* Products Section */}
        <section className="section">
          <h2>Your Products</h2>
          {state.products.length === 0 ? (
            <p className="empty-message">No products yet. Add your first product above!</p>
          ) : (
            <div className="products-grid">
              {state.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onListToMarket={handleListToMarket}
                />
              ))}
            </div>
          )}
        </section>

        {/* Secondary Market Section */}
        <section className="section">
          <h2>Secondary Market Listings</h2>
          {state.marketListings.length === 0 ? (
            <p className="empty-message">No listings in the secondary market yet.</p>
          ) : (
            <div className="products-grid">
              {state.marketListings.map((product) => (
                <ProductCard key={product.id} product={product} showMarketBadge />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
