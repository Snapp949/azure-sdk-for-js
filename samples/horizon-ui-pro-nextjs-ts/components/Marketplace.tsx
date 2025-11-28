/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Marketplace Component - Real Estate Marketplace with Zillow integration.
  
  This component renders property listings and allows demo buy actions.
  It fetches data from the /api/realestate endpoint which proxies Zillow API
  when configured, otherwise returns demo data.
  
  NOTE: This is demo-only code. Transactions are simulated in-memory.
*/

// Placeholder import for Horizon UI Pro CSS - uncomment when private package is configured
// import '@horizon-ui/react/dist/styles.css';

// Placeholder import for Horizon UI Pro components - uncomment when private package is configured
// import { Card, CardHeader, CardBody, Button, Badge, Grid, Image } from '@horizon-ui/react';

import React, { useState, useCallback, useEffect } from 'react';
import type {
  Listing,
  ListingsApiResponse,
  TransactionResult,
  CreditScoreResult,
} from '../types';

/**
 * Props for the Marketplace component.
 */
export interface MarketplaceProps {
  /** User's current credit score (for eligibility checks) */
  creditScore?: number;
  /** Credit score result (for detailed eligibility info) */
  creditScoreResult?: CreditScoreResult | null;
  /** Callback when a purchase is successful */
  onPurchaseComplete?: (result: TransactionResult) => void;
  /** Demo buyer ID */
  buyerId?: string;
  /** API base URL (defaults to '') */
  apiBaseUrl?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Get property type display name.
 */
function getPropertyTypeLabel(type: Listing['propertyType']): string {
  const labels: Record<Listing['propertyType'], string> = {
    house: 'Single Family Home',
    condo: 'Condominium',
    townhouse: 'Townhouse',
    apartment: 'Apartment',
    land: 'Land',
  };
  return labels[type] || type;
}

/**
 * Get status badge class.
 */
function getStatusBadgeClass(status: Listing['status']): string {
  switch (status) {
    case 'active':
      return 'marketplace-badge-success';
    case 'pending':
      return 'marketplace-badge-warning';
    case 'sold':
      return 'marketplace-badge-danger';
  }
}

/**
 * Check if user is eligible to purchase a listing.
 */
function isEligible(listing: Listing, creditScore?: number): boolean {
  if (!creditScore) return false;
  return creditScore >= listing.minCreditScore && listing.status === 'active';
}

/**
 * Marketplace Component.
 * 
 * Renders property listings from the real estate API and allows demo purchases.
 * Integrates with the credit score to show eligibility for each listing.
 * 
 * @example
 * ```tsx
 * <Marketplace
 *   creditScore={720}
 *   onPurchaseComplete={(result) => console.log('Purchased:', result)}
 * />
 * ```
 */
export default function Marketplace({
  creditScore,
  creditScoreResult,
  onPurchaseComplete,
  buyerId = 'demo-user-1',
  apiBaseUrl = '',
  className = '',
}: MarketplaceProps): JSX.Element {
  // State
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'zillow' | 'demo'>('demo');
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [purchaseResult, setPurchaseResult] = useState<TransactionResult | null>(null);
  const [filterStatus, setFilterStatus] = useState<Listing['status'] | 'all'>('all');
  const [filterEligible, setFilterEligible] = useState(false);

  /**
   * Fetch listings from the API.
   */
  const fetchListings = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${apiBaseUrl}/api/realestate${refresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch listings');
      }

      const data: ListingsApiResponse = await response.json();
      setListings(data.listings);
      setDataSource(data.source);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl]);

  /**
   * Fetch listings on mount.
   */
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  /**
   * Handle purchase action.
   */
  const handlePurchase = useCallback(async (listing: Listing) => {
    if (!creditScore) {
      setError('Please calculate your credit score first');
      return;
    }

    setPurchasingId(listing.id);
    setPurchaseResult(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/realestate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId: listing.id,
          buyerId,
          creditScore,
        }),
      });

      const result: TransactionResult = await response.json();

      if (result.success) {
        setPurchaseResult(result);
        // Refresh listings to show updated status
        await fetchListings();
        onPurchaseComplete?.(result);
      } else {
        setError(result.error || 'Purchase failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setPurchasingId(null);
    }
  }, [creditScore, buyerId, apiBaseUrl, fetchListings, onPurchaseComplete]);

  /**
   * Filter listings based on current filters.
   */
  const filteredListings = listings.filter((listing) => {
    if (filterStatus !== 'all' && listing.status !== filterStatus) {
      return false;
    }
    if (filterEligible && !isEligible(listing, creditScore)) {
      return false;
    }
    return true;
  });

  return (
    <div className={`marketplace-container ${className}`}>
      {/* Header */}
      <div className="marketplace-header">
        <div className="marketplace-title-section">
          <h2 className="marketplace-title">Real Estate Marketplace</h2>
          <p className="marketplace-subtitle">
            Browse properties and make demo purchases
            {dataSource === 'zillow' && ' • Data from Zillow API'}
            {dataSource === 'demo' && ' • Demo listings'}
          </p>
        </div>
        
        <div className="marketplace-actions">
          <button
            className="marketplace-btn marketplace-btn-secondary"
            onClick={() => fetchListings(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh Listings'}
          </button>
        </div>
      </div>

      {/* Credit Score Info */}
      {creditScoreResult && (
        <div className="marketplace-credit-info">
          <span className="marketplace-credit-label">Your Credit Score:</span>
          <span className="marketplace-credit-score">{creditScoreResult.score}</span>
          <span className={`marketplace-badge ${creditScoreResult.riskCategory === 'low' ? 'marketplace-badge-success' : creditScoreResult.riskCategory === 'medium' ? 'marketplace-badge-warning' : 'marketplace-badge-danger'}`}>
            {creditScoreResult.riskCategory.toUpperCase()} RISK
          </span>
        </div>
      )}

      {!creditScore && (
        <div className="marketplace-alert marketplace-alert-info">
          💡 Calculate your credit score to see which properties you&apos;re eligible to purchase.
        </div>
      )}

      {/* Filters */}
      <div className="marketplace-filters">
        <div className="marketplace-filter-group">
          <label className="marketplace-filter-label">Status:</label>
          <select
            className="marketplace-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Listing['status'] | 'all')}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        
        {creditScore && (
          <div className="marketplace-filter-group">
            <label className="marketplace-checkbox-label">
              <input
                type="checkbox"
                checked={filterEligible}
                onChange={(e) => setFilterEligible(e.target.checked)}
              />
              Show only eligible properties
            </label>
          </div>
        )}

        <div className="marketplace-filter-info">
          Showing {filteredListings.length} of {listings.length} listings
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="marketplace-alert marketplace-alert-error">
          {error}
          <button
            className="marketplace-alert-dismiss"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Purchase Success */}
      {purchaseResult?.success && (
        <div className="marketplace-alert marketplace-alert-success">
          🎉 Purchase successful! Transaction ID: {purchaseResult.transactionId}
          <br />
          Price paid: ${purchaseResult.pricePaid.toLocaleString()} ({purchaseResult.rulePricePaid.toFixed(2)} RULE)
          <button
            className="marketplace-alert-dismiss"
            onClick={() => setPurchaseResult(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Listings Grid */}
      {isLoading && listings.length === 0 ? (
        <div className="marketplace-loading">
          <div className="marketplace-spinner" />
          <p>Loading listings...</p>
        </div>
      ) : (
        <div className="marketplace-grid">
          {filteredListings.map((listing) => {
            const eligible = isEligible(listing, creditScore);
            const isPurchasing = purchasingId === listing.id;

            return (
              <div
                key={listing.id}
                className={`marketplace-card ${!eligible && creditScore ? 'marketplace-card-ineligible' : ''}`}
              >
                {/* Property Image */}
                <div className="marketplace-card-image">
                  <div className="marketplace-image-placeholder">
                    🏠
                  </div>
                  <div className="marketplace-card-badges">
                    <span className={`marketplace-badge ${getStatusBadgeClass(listing.status)}`}>
                      {listing.status.toUpperCase()}
                    </span>
                    <span className="marketplace-badge marketplace-badge-source">
                      {listing.source}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="marketplace-card-body">
                  <div className="marketplace-price-section">
                    <span className="marketplace-price">${listing.price.toLocaleString()}</span>
                    <span className="marketplace-rule-price">{listing.rulePrice.toFixed(2)} RULE</span>
                  </div>

                  <h3 className="marketplace-address">{listing.address}</h3>
                  <p className="marketplace-location">
                    {listing.city}, {listing.state} {listing.zipCode}
                  </p>

                  <div className="marketplace-features">
                    <span className="marketplace-feature">🛏️ {listing.bedrooms} bed</span>
                    <span className="marketplace-feature">🚿 {listing.bathrooms} bath</span>
                    <span className="marketplace-feature">📐 {listing.squareFeet.toLocaleString()} sqft</span>
                  </div>

                  <div className="marketplace-property-type">
                    {getPropertyTypeLabel(listing.propertyType)}
                  </div>

                  <div className="marketplace-eligibility">
                    <span className="marketplace-min-score">
                      Min. Credit Score: {listing.minCreditScore}
                    </span>
                    {creditScore && (
                      <span className={`marketplace-eligibility-status ${eligible ? 'marketplace-eligible' : 'marketplace-ineligible'}`}>
                        {eligible ? '✓ Eligible' : '✗ Not Eligible'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="marketplace-card-footer">
                  <button
                    className={`marketplace-btn marketplace-btn-buy ${!eligible || listing.status !== 'active' ? 'marketplace-btn-disabled' : ''}`}
                    onClick={() => handlePurchase(listing)}
                    disabled={!eligible || listing.status !== 'active' || isPurchasing}
                  >
                    {isPurchasing ? 'Processing...' : 
                     listing.status === 'sold' ? 'Sold' :
                     listing.status === 'pending' ? 'Pending' :
                     !creditScore ? 'Get Credit Score First' :
                     !eligible ? `Need Score ≥ ${listing.minCreditScore}` :
                     'Buy Now (Demo)'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredListings.length === 0 && (
        <div className="marketplace-empty">
          <p>No listings match your current filters.</p>
          <button
            className="marketplace-btn marketplace-btn-secondary"
            onClick={() => { setFilterStatus('all'); setFilterEligible(false); }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Demo Notice */}
      <div className="marketplace-footer">
        <p className="marketplace-notice">
          ⚠️ This is a demo marketplace. Transactions are simulated in-memory and not persisted.
          {dataSource === 'demo' && ' Configure ZILLOW_API_KEY to fetch real listings.'}
        </p>
      </div>

      {/* Inline styles - Replace with Horizon UI Pro CSS when available */}
      <style jsx>{`
        .marketplace-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .marketplace-header {
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .marketplace-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
        }
        .marketplace-subtitle {
          font-size: 14px;
          color: #718096;
          margin-top: 4px;
        }
        .marketplace-credit-info {
          padding: 16px 24px;
          background: #f7fafc;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .marketplace-credit-label {
          color: #718096;
        }
        .marketplace-credit-score {
          font-size: 24px;
          font-weight: 700;
          color: #4f46e5;
        }
        .marketplace-filters {
          padding: 16px 24px;
          background: #f7fafc;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          border-bottom: 1px solid #e2e8f0;
        }
        .marketplace-filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .marketplace-filter-label {
          color: #718096;
          font-size: 14px;
        }
        .marketplace-select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          cursor: pointer;
        }
        .marketplace-checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }
        .marketplace-checkbox-label input {
          width: 16px;
          height: 16px;
        }
        .marketplace-filter-info {
          margin-left: auto;
          font-size: 14px;
          color: #a0aec0;
        }
        .marketplace-alert {
          margin: 16px 24px;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .marketplace-alert-info {
          background: #ebf8ff;
          color: #2b6cb0;
        }
        .marketplace-alert-error {
          background: #fed7d7;
          color: #c53030;
        }
        .marketplace-alert-success {
          background: #c6f6d5;
          color: #276749;
        }
        .marketplace-alert-dismiss {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: inherit;
          opacity: 0.7;
          padding: 0;
          margin-left: 12px;
        }
        .marketplace-alert-dismiss:hover {
          opacity: 1;
        }
        .marketplace-loading {
          padding: 48px;
          text-align: center;
          color: #718096;
        }
        .marketplace-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top-color: #4f46e5;
          border-radius: 50%;
          margin: 0 auto 16px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .marketplace-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          padding: 24px;
        }
        .marketplace-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .marketplace-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .marketplace-card-ineligible {
          opacity: 0.7;
        }
        .marketplace-card-image {
          position: relative;
          height: 180px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .marketplace-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
        }
        .marketplace-card-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 8px;
        }
        .marketplace-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .marketplace-badge-success {
          background: #c6f6d5;
          color: #276749;
        }
        .marketplace-badge-warning {
          background: #fefcbf;
          color: #975a16;
        }
        .marketplace-badge-danger {
          background: #fed7d7;
          color: #c53030;
        }
        .marketplace-badge-source {
          background: rgba(255, 255, 255, 0.9);
          color: #4a5568;
        }
        .marketplace-card-body {
          padding: 16px;
        }
        .marketplace-price-section {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .marketplace-price {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
        }
        .marketplace-rule-price {
          font-size: 14px;
          color: #4f46e5;
          font-weight: 600;
        }
        .marketplace-address {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 4px 0;
        }
        .marketplace-location {
          font-size: 14px;
          color: #718096;
          margin: 0 0 12px 0;
        }
        .marketplace-features {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        .marketplace-feature {
          font-size: 13px;
          color: #4a5568;
        }
        .marketplace-property-type {
          font-size: 12px;
          color: #a0aec0;
          margin-bottom: 12px;
        }
        .marketplace-eligibility {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }
        .marketplace-min-score {
          font-size: 12px;
          color: #718096;
        }
        .marketplace-eligibility-status {
          font-size: 12px;
          font-weight: 600;
        }
        .marketplace-eligible {
          color: #48bb78;
        }
        .marketplace-ineligible {
          color: #f56565;
        }
        .marketplace-card-footer {
          padding: 12px 16px;
          background: #f7fafc;
          border-top: 1px solid #e2e8f0;
        }
        .marketplace-btn {
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 14px;
        }
        .marketplace-btn-secondary {
          background: white;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        .marketplace-btn-secondary:hover:not(:disabled) {
          background: #edf2f7;
        }
        .marketplace-btn-buy {
          width: 100%;
          background: #4f46e5;
          color: white;
        }
        .marketplace-btn-buy:hover:not(:disabled) {
          background: #4338ca;
        }
        .marketplace-btn-disabled {
          background: #e2e8f0;
          color: #a0aec0;
          cursor: not-allowed;
        }
        .marketplace-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .marketplace-empty {
          padding: 48px;
          text-align: center;
          color: #718096;
        }
        .marketplace-empty p {
          margin-bottom: 16px;
        }
        .marketplace-footer {
          padding: 16px 24px;
          background: #f7fafc;
          border-top: 1px solid #e2e8f0;
        }
        .marketplace-notice {
          font-size: 12px;
          color: #718096;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
