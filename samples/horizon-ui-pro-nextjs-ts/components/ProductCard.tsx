// Uncomment when Horizon UI Pro is installed:
// import { Card, Badge, Button } from "@horizon/ui-pro";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  listed: boolean;
}

interface ProductCardProps {
  product: Product;
  onListToMarket?: (productId: string) => void;
  showMarketBadge?: boolean;
}

/**
 * ProductCard component displays a credit-building product.
 * When Horizon UI Pro is installed, you can use their Card component here.
 */
export default function ProductCard({
  product,
  onListToMarket,
  showMarketBadge = false,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h3 className="product-name">{product.name}</h3>
        {showMarketBadge && <span className="badge badge-market">On Market</span>}
        {product.listed && !showMarketBadge && (
          <span className="badge badge-listed">Listed</span>
        )}
      </div>
      <p className="product-description">
        {product.description || "No description provided"}
      </p>
      <div className="product-footer">
        <span className="product-price">{product.price} RULE</span>
        {onListToMarket && !product.listed && (
          <button
            onClick={() => onListToMarket(product.id)}
            className="btn btn-small"
          >
            List to Market
          </button>
        )}
      </div>
    </div>
  );
}
