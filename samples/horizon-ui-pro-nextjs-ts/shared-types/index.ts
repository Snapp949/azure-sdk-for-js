/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Shared TypeScript types for Inclusive Credit Matrix and Real Estate Marketplace demo.
  NOTE: This is demo-only code and not production-ready.
*/

/**
 * Input variables for calculating credit score in the Inclusive Credit Matrix.
 */
export interface CreditMatrixInput {
  /** Annual income in local currency (e.g., USD) */
  income: number;
  /** Payment history score (0-100) based on timely payments */
  paymentHistory: number;
  /** Employment stability score (0-100) based on job tenure and consistency */
  employmentStability: number;
  /** Community engagement score (0-100) based on local participation */
  communityEngagement: number;
  /** Debt-to-income ratio (0-100, where lower is better) */
  debtToIncomeRatio: number;
  /** Credit utilization percentage (0-100) */
  creditUtilization: number;
}

/**
 * Default values for the credit matrix input.
 */
export const DEFAULT_CREDIT_MATRIX_INPUT: CreditMatrixInput = {
  income: 50000,
  paymentHistory: 80,
  employmentStability: 70,
  communityEngagement: 50,
  debtToIncomeRatio: 30,
  creditUtilization: 25,
};

/**
 * Result of credit score calculation.
 */
export interface CreditScoreResult {
  /** Computed credit score (300-850 scale) */
  score: number;
  /** Risk category: 'low', 'medium', 'high' */
  riskCategory: 'low' | 'medium' | 'high';
  /** Products recommended based on the score */
  recommendedProducts: Product[];
  /** Timestamp of the calculation */
  calculatedAt: string;
  /** Unique ID for this calculation */
  id: string;
}

/**
 * A financial or real estate product.
 */
export interface Product {
  /** Unique identifier for the product */
  id: string;
  /** Display name of the product */
  name: string;
  /** Product description */
  description: string;
  /** Type of product */
  type: 'loan' | 'credit_card' | 'mortgage' | 'insurance' | 'real_estate';
  /** Minimum credit score required for eligibility */
  minCreditScore: number;
  /** Interest rate or APR (if applicable) */
  interestRate?: number;
  /** Maximum loan amount (if applicable) */
  maxAmount?: number;
  /** Price in RULE denomination (for real estate) */
  rulePrice?: number;
}

/**
 * A real estate listing.
 */
export interface Listing {
  /** Unique identifier for the listing */
  id: string;
  /** Property address */
  address: string;
  /** City */
  city: string;
  /** State/Province */
  state: string;
  /** ZIP/Postal code */
  zipCode: string;
  /** Price in USD */
  price: number;
  /** Price in RULE denomination (1 RULE = 100 USD for demo) */
  rulePrice: number;
  /** Number of bedrooms */
  bedrooms: number;
  /** Number of bathrooms */
  bathrooms: number;
  /** Square footage */
  squareFeet: number;
  /** Property type */
  propertyType: 'house' | 'condo' | 'townhouse' | 'apartment' | 'land';
  /** Listing status */
  status: 'active' | 'pending' | 'sold';
  /** URL to property image (placeholder for demo) */
  imageUrl: string;
  /** Zillow property ID (if from Zillow API) */
  zpid?: string;
  /** Data source: 'zillow' or 'demo' */
  source: 'zillow' | 'demo';
  /** Minimum credit score required to purchase */
  minCreditScore: number;
}

/**
 * Result of a buy transaction.
 */
export interface TransactionResult {
  /** Whether the transaction succeeded */
  success: boolean;
  /** Transaction ID */
  transactionId?: string;
  /** Error message if failed */
  error?: string;
  /** Listing ID that was purchased */
  listingId: string;
  /** Buyer identifier (demo purposes) */
  buyerId: string;
  /** Price paid */
  pricePaid: number;
  /** Price in RULE denomination */
  rulePricePaid: number;
  /** Timestamp of the transaction */
  timestamp: string;
}

/**
 * API request for credit score calculation.
 */
export interface CreditApiRequest {
  /** Credit matrix input variables */
  input: CreditMatrixInput;
  /** Optional user identifier for tracking */
  userId?: string;
}

/**
 * API response for credit score calculation.
 */
export interface CreditApiResponse {
  /** The computed credit score result */
  result: CreditScoreResult;
  /** Input that was used */
  input: CreditMatrixInput;
}

/**
 * API request for buy action.
 */
export interface BuyRequest {
  /** Listing ID to purchase */
  listingId: string;
  /** Buyer identifier */
  buyerId: string;
  /** Buyer's credit score (for eligibility check) */
  creditScore: number;
}

/**
 * API response for listings.
 */
export interface ListingsApiResponse {
  /** Array of listings */
  listings: Listing[];
  /** Total count */
  total: number;
  /** Data source used */
  source: 'zillow' | 'demo';
}

/**
 * Rule state for in-memory demo.
 */
export interface RuleState {
  /** Current RULE to USD exchange rate */
  exchangeRate: number;
  /** Active listings */
  listings: Listing[];
  /** Transaction history */
  transactions: TransactionResult[];
  /** Credit score history */
  creditScores: CreditScoreResult[];
  /** Ownership mapping: buyerId -> listingIds */
  ownership: Record<string, string[]>;
}
