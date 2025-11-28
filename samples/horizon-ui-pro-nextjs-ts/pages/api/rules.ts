/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Server-side API for RULE state management and interoperability.
  This maintains the shared in-memory state for the credit and marketplace APIs.
  
  NOTE: This is demo-only code. State is not persisted and will be lost on server restart.
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import type { RuleState, Listing, TransactionResult, CreditScoreResult, Product } from '../../types';

/** RULE to USD exchange rate (1 RULE = 100 USD for demo) */
const RULE_TO_USD_RATE = 100;

/**
 * In-memory state store. Reset on server restart.
 * NOTE: This is demo-only and not suitable for production use.
 */
let ruleState: RuleState = {
  exchangeRate: RULE_TO_USD_RATE,
  listings: generateDemoListings(),
  transactions: [],
  creditScores: [],
  ownership: {},
};

/**
 * Available financial products for credit score recommendations.
 */
export const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Community Builder Loan',
    description: 'Low-interest personal loan for community members with good payment history',
    type: 'loan',
    minCreditScore: 600,
    interestRate: 5.99,
    maxAmount: 25000,
  },
  {
    id: 'prod-2',
    name: 'First Home Mortgage',
    description: 'Mortgage program designed for first-time homebuyers',
    type: 'mortgage',
    minCreditScore: 650,
    interestRate: 6.25,
    maxAmount: 500000,
  },
  {
    id: 'prod-3',
    name: 'Premier Credit Card',
    description: 'Rewards credit card with cash back on all purchases',
    type: 'credit_card',
    minCreditScore: 700,
    interestRate: 18.99,
    maxAmount: 15000,
  },
  {
    id: 'prod-4',
    name: 'Starter Credit Card',
    description: 'Entry-level credit card to help build credit history',
    type: 'credit_card',
    minCreditScore: 500,
    interestRate: 24.99,
    maxAmount: 1000,
  },
  {
    id: 'prod-5',
    name: 'Premium Mortgage',
    description: 'Competitive rates for well-qualified buyers',
    type: 'mortgage',
    minCreditScore: 740,
    interestRate: 5.75,
    maxAmount: 1000000,
  },
  {
    id: 'prod-6',
    name: 'Home Protection Insurance',
    description: 'Comprehensive homeowner insurance coverage',
    type: 'insurance',
    minCreditScore: 580,
  },
];

/**
 * Generate demo property listings for when Zillow API is not configured.
 */
function generateDemoListings(): Listing[] {
  const listings: Listing[] = [
    {
      id: 'demo-1',
      address: '123 Main Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      price: 450000,
      rulePrice: 450000 / RULE_TO_USD_RATE,
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      propertyType: 'house',
      status: 'active',
      imageUrl: '/api/placeholder/400/300',
      source: 'demo',
      minCreditScore: 650,
    },
    {
      id: 'demo-2',
      address: '456 Oak Avenue',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      price: 325000,
      rulePrice: 325000 / RULE_TO_USD_RATE,
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 1200,
      propertyType: 'condo',
      status: 'active',
      imageUrl: '/api/placeholder/400/300',
      source: 'demo',
      minCreditScore: 600,
    },
    {
      id: 'demo-3',
      address: '789 Pine Road',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      price: 850000,
      rulePrice: 850000 / RULE_TO_USD_RATE,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2500,
      propertyType: 'townhouse',
      status: 'active',
      imageUrl: '/api/placeholder/400/300',
      source: 'demo',
      minCreditScore: 720,
    },
    {
      id: 'demo-4',
      address: '321 Elm Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      price: 275000,
      rulePrice: 275000 / RULE_TO_USD_RATE,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1100,
      propertyType: 'apartment',
      status: 'active',
      imageUrl: '/api/placeholder/400/300',
      source: 'demo',
      minCreditScore: 580,
    },
    {
      id: 'demo-5',
      address: '555 Cedar Lane',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      price: 525000,
      rulePrice: 525000 / RULE_TO_USD_RATE,
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 2000,
      propertyType: 'house',
      status: 'active',
      imageUrl: '/api/placeholder/400/300',
      source: 'demo',
      minCreditScore: 680,
    },
    {
      id: 'demo-6',
      address: '100 Lakeside Drive',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      price: 180000,
      rulePrice: 180000 / RULE_TO_USD_RATE,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 750,
      propertyType: 'condo',
      status: 'active',
      imageUrl: '/api/placeholder/400/300',
      source: 'demo',
      minCreditScore: 550,
    },
  ];
  return listings;
}

/**
 * Get the current RULE state.
 */
export function getRuleState(): RuleState {
  return ruleState;
}

/**
 * Update listings in the state.
 */
export function updateListings(listings: Listing[]): void {
  ruleState.listings = listings;
}

/**
 * Add a transaction to history.
 */
export function addTransaction(transaction: TransactionResult): void {
  ruleState.transactions.push(transaction);
}

/**
 * Add a credit score to history.
 */
export function addCreditScore(score: CreditScoreResult): void {
  ruleState.creditScores.push(score);
}

/**
 * Record ownership of a listing.
 */
export function recordOwnership(buyerId: string, listingId: string): void {
  if (!ruleState.ownership[buyerId]) {
    ruleState.ownership[buyerId] = [];
  }
  ruleState.ownership[buyerId].push(listingId);
}

/**
 * Reset state to initial demo data.
 */
export function resetState(): void {
  ruleState = {
    exchangeRate: RULE_TO_USD_RATE,
    listings: generateDemoListings(),
    transactions: [],
    creditScores: [],
    ownership: {},
  };
}

/**
 * Convert USD to RULE denomination.
 */
export function usdToRule(usd: number): number {
  return usd / ruleState.exchangeRate;
}

/**
 * Convert RULE to USD denomination.
 */
export function ruleToUsd(rule: number): number {
  return rule * ruleState.exchangeRate;
}

/**
 * API response type for rules endpoint.
 */
interface RulesApiResponse {
  state: RuleState;
  exchangeRate: number;
  message?: string;
}

/**
 * API handler for RULE state management.
 * 
 * GET: Returns current state
 * POST: { action: 'reset' } - Reset state to initial demo data
 * POST: { action: 'updateExchangeRate', rate: number } - Update exchange rate
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RulesApiResponse | { error: string }>
): void {
  try {
    if (req.method === 'GET') {
      // Return current state
      res.status(200).json({
        state: ruleState,
        exchangeRate: ruleState.exchangeRate,
      });
    } else if (req.method === 'POST') {
      const { action, rate } = req.body as { action?: string; rate?: number };

      if (action === 'reset') {
        resetState();
        res.status(200).json({
          state: ruleState,
          exchangeRate: ruleState.exchangeRate,
          message: 'State reset to initial demo data',
        });
      } else if (action === 'updateExchangeRate' && typeof rate === 'number' && rate > 0) {
        ruleState.exchangeRate = rate;
        // Update all listing RULE prices
        ruleState.listings = ruleState.listings.map((listing) => ({
          ...listing,
          rulePrice: listing.price / rate,
        }));
        res.status(200).json({
          state: ruleState,
          exchangeRate: ruleState.exchangeRate,
          message: `Exchange rate updated to ${rate}`,
        });
      } else {
        res.status(400).json({ error: 'Invalid action. Use "reset" or "updateExchangeRate" with a rate.' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Rules API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
