/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Server-side API for Real Estate Marketplace with Zillow API proxy.
  
  GET: Returns property listings (from Zillow API if configured, otherwise demo data)
  POST: Simulates a buy transaction and updates in-memory ownership
  
  Environment Variables:
  - ZILLOW_API_KEY: Your Zillow API key (from RapidAPI or Zillow's Bridge API)
    See README.md for instructions on obtaining an API key.
  
  NOTE: This is demo-only code. Transactions are simulated in-memory.
  State is not persisted and will be lost on server restart.
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Listing,
  ListingsApiResponse,
  BuyRequest,
  TransactionResult,
} from '../../shared-types';
import {
  getRuleState,
  addTransaction,
  recordOwnership,
  updateListings,
  usdToRule,
} from './rules';

/**
 * Zillow API configuration.
 * 
 * IMPORTANT: Set ZILLOW_API_KEY in your environment variables.
 * Do NOT commit your API key to source control.
 * 
 * To get a Zillow API key:
 * 1. Sign up at https://rapidapi.com/apimaker/api/zillow-com1
 *    OR use Zillow's official Bridge API: https://bridgedataoutput.com/docs/explorer/zillow
 * 2. Subscribe to a plan (free tier available for testing)
 * 3. Copy your API key and add it to .env.local:
 *    ZILLOW_API_KEY=your_api_key_here
 * 
 * The API endpoint used depends on your provider:
 * - RapidAPI: https://zillow-com1.p.rapidapi.com/propertySearch
 * - Bridge API: https://api.bridgedataoutput.com/api/v2/zillow/listings
 */
const ZILLOW_API_KEY = process.env.ZILLOW_API_KEY;
const ZILLOW_API_HOST = 'zillow-com1.p.rapidapi.com';
const ZILLOW_API_BASE = `https://${ZILLOW_API_HOST}`;

/**
 * Check if Zillow API is configured.
 */
function isZillowConfigured(): boolean {
  return Boolean(ZILLOW_API_KEY && ZILLOW_API_KEY !== 'YOUR_KEY_HERE');
}

/**
 * Fetch listings from Zillow API.
 * 
 * @param location - City, state, or ZIP code to search
 * @returns Array of listings from Zillow
 */
async function fetchZillowListings(location: string = 'Seattle, WA'): Promise<Listing[]> {
  if (!isZillowConfigured()) {
    console.log('Zillow API key not configured, returning demo data');
    return [];
  }

  try {
    // Using the RapidAPI Zillow endpoint for property search
    // Documentation: https://rapidapi.com/apimaker/api/zillow-com1
    const url = `${ZILLOW_API_BASE}/propertySearch?location=${encodeURIComponent(location)}&status=ForSale&home_type=Houses,Condos,Townhomes`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': ZILLOW_API_KEY!,
        'X-RapidAPI-Host': ZILLOW_API_HOST,
      },
    });

    if (!response.ok) {
      console.error(`Zillow API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    
    // Transform Zillow response to our Listing format
    // Note: Actual Zillow API response structure may vary
    const listings: Listing[] = (data.results || data.props || []).slice(0, 10).map((prop: Record<string, unknown>, index: number) => ({
      id: `zillow-${prop.zpid || index}`,
      zpid: String(prop.zpid || ''),
      address: String(prop.address || prop.streetAddress || 'Unknown Address'),
      city: String(prop.city || 'Unknown City'),
      state: String(prop.state || 'Unknown'),
      zipCode: String(prop.zipcode || '00000'),
      price: Number(prop.price) || 0,
      rulePrice: usdToRule(Number(prop.price) || 0),
      bedrooms: Number(prop.bedrooms || prop.beds) || 0,
      bathrooms: Number(prop.bathrooms || prop.baths) || 0,
      squareFeet: Number(prop.livingArea || prop.sqft) || 0,
      propertyType: mapPropertyType(String(prop.homeType || prop.propertyType || '')),
      status: 'active' as const,
      imageUrl: String(prop.imgSrc || prop.image || '/api/placeholder/400/300'),
      source: 'zillow' as const,
      minCreditScore: calculateMinCreditScore(Number(prop.price) || 0),
    }));

    return listings;
  } catch (error) {
    console.error('Error fetching Zillow listings:', error);
    return [];
  }
}

/**
 * Map Zillow property type to our property type.
 */
function mapPropertyType(zillowType: string): Listing['propertyType'] {
  const typeMap: Record<string, Listing['propertyType']> = {
    SINGLE_FAMILY: 'house',
    CONDO: 'condo',
    TOWNHOUSE: 'townhouse',
    APARTMENT: 'apartment',
    MULTI_FAMILY: 'house',
    LOT: 'land',
    LAND: 'land',
  };
  return typeMap[zillowType.toUpperCase()] || 'house';
}

/**
 * Calculate minimum credit score based on property price.
 * Higher-priced properties require better credit.
 */
function calculateMinCreditScore(price: number): number {
  if (price >= 1000000) return 740;
  if (price >= 750000) return 720;
  if (price >= 500000) return 680;
  if (price >= 300000) return 650;
  if (price >= 200000) return 600;
  return 550;
}

/**
 * Generate a unique transaction ID.
 */
function generateTransactionId(): string {
  return `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Process a buy transaction.
 */
function processBuyTransaction(request: BuyRequest): TransactionResult {
  const state = getRuleState();
  const listing = state.listings.find((l) => l.id === request.listingId);

  if (!listing) {
    return {
      success: false,
      error: 'Listing not found',
      listingId: request.listingId,
      buyerId: request.buyerId,
      pricePaid: 0,
      rulePricePaid: 0,
      timestamp: new Date().toISOString(),
    };
  }

  if (listing.status !== 'active') {
    return {
      success: false,
      error: 'Listing is not available for purchase',
      listingId: request.listingId,
      buyerId: request.buyerId,
      pricePaid: 0,
      rulePricePaid: 0,
      timestamp: new Date().toISOString(),
    };
  }

  if (request.creditScore < listing.minCreditScore) {
    return {
      success: false,
      error: `Credit score ${request.creditScore} does not meet minimum requirement of ${listing.minCreditScore}`,
      listingId: request.listingId,
      buyerId: request.buyerId,
      pricePaid: 0,
      rulePricePaid: 0,
      timestamp: new Date().toISOString(),
    };
  }

  // Process successful transaction
  const transaction: TransactionResult = {
    success: true,
    transactionId: generateTransactionId(),
    listingId: request.listingId,
    buyerId: request.buyerId,
    pricePaid: listing.price,
    rulePricePaid: listing.rulePrice,
    timestamp: new Date().toISOString(),
  };

  // Update listing status
  const updatedListings = state.listings.map((l) =>
    l.id === request.listingId ? { ...l, status: 'sold' as const } : l
  );
  updateListings(updatedListings);

  // Record ownership and transaction
  recordOwnership(request.buyerId, request.listingId);
  addTransaction(transaction);

  return transaction;
}

/**
 * API handler for real estate marketplace.
 * 
 * GET: Returns property listings
 *   Query params:
 *   - location: City, state, or ZIP code (default: 'Seattle, WA')
 *   - refresh: Set to 'true' to fetch fresh data from Zillow (if configured)
 * 
 * POST: Process a buy transaction
 *   Body: BuyRequest { listingId, buyerId, creditScore }
 * 
 * @example GET /api/realestate?location=Seattle,%20WA
 * @example POST /api/realestate with body { listingId: 'demo-1', buyerId: 'user-1', creditScore: 720 }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListingsApiResponse | TransactionResult | { error: string }>
): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { location, refresh } = req.query;
      const locationStr = typeof location === 'string' ? location : 'Seattle, WA';
      const shouldRefresh = refresh === 'true';

      let listings: Listing[];
      let source: 'zillow' | 'demo';

      // Check if we should fetch from Zillow
      if (isZillowConfigured() && shouldRefresh) {
        const zillowListings = await fetchZillowListings(locationStr);
        if (zillowListings.length > 0) {
          listings = zillowListings;
          source = 'zillow';
          // Update state with new listings
          updateListings(zillowListings);
        } else {
          // Fall back to current state (demo data)
          listings = getRuleState().listings;
          source = 'demo';
        }
      } else {
        // Use current state (demo data or previously fetched)
        listings = getRuleState().listings;
        source = listings.some((l) => l.source === 'zillow') ? 'zillow' : 'demo';
      }

      const response: ListingsApiResponse = {
        listings,
        total: listings.length,
        source,
      };

      res.status(200).json(response);
    } else if (req.method === 'POST') {
      const body = req.body as BuyRequest;

      // Validate request
      if (!body.listingId || !body.buyerId) {
        res.status(400).json({ error: 'Missing required fields: listingId and buyerId' });
        return;
      }

      if (typeof body.creditScore !== 'number' || body.creditScore < 300 || body.creditScore > 850) {
        res.status(400).json({ error: 'creditScore must be a number between 300 and 850' });
        return;
      }

      // Process transaction
      const result = processBuyTransaction(body);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Real Estate API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
