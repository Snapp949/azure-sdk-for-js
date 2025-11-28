/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Server-side API for Inclusive Credit Matrix scoring.
  Accepts POST requests with credit matrix variables and returns computed scores.
  Supports GET to retrieve default matrix variables and historical scores.
  
  NOTE: This is demo-only code. Scores are computed in-memory with simplified logic.
  Not suitable for production credit scoring.
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  CreditMatrixInput,
  CreditScoreResult,
  CreditApiRequest,
  CreditApiResponse,
  Product,
} from '../../shared-types';
import { DEFAULT_CREDIT_MATRIX_INPUT } from '../../shared-types';
import { getRuleState, addCreditScore, AVAILABLE_PRODUCTS } from './rules';

/**
 * Generate a unique ID for credit score results.
 */
function generateId(): string {
  return `cs-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Compute credit score based on input variables.
 * 
 * This is a simplified demo calculation. Real credit scoring involves
 * much more complex algorithms and data sources.
 * 
 * @param input - Credit matrix input variables
 * @returns Computed credit score (300-850 scale)
 */
function computeCreditScore(input: CreditMatrixInput): number {
  // Base score
  let score = 500;

  // Payment history (35% weight in real FICO, we use 30%)
  // Score 0-100 maps to -100 to +150 points
  score += ((input.paymentHistory - 50) / 50) * 150;

  // Income factor (10% weight)
  // Higher income provides stability, capped contribution
  const incomeScore = Math.min(input.income / 100000, 1) * 50;
  score += incomeScore;

  // Employment stability (15% weight)
  // Score 0-100 maps to -50 to +75 points
  score += ((input.employmentStability - 50) / 50) * 75;

  // Community engagement (10% weight - inclusive factor)
  // Score 0-100 maps to -25 to +50 points
  score += ((input.communityEngagement - 50) / 50) * 50;

  // Debt-to-income ratio (15% weight)
  // Lower is better: 0% = +75, 100% = -75
  score += ((100 - input.debtToIncomeRatio) / 100) * 75 - 37.5;

  // Credit utilization (20% weight)
  // Lower is better: 0% = +100, 100% = -50
  const utilizationScore = input.creditUtilization <= 30 
    ? 100 - (input.creditUtilization / 30) * 50
    : 50 - ((input.creditUtilization - 30) / 70) * 100;
  score += utilizationScore;

  // Clamp to valid range
  return Math.round(Math.max(300, Math.min(850, score)));
}

/**
 * Determine risk category based on credit score.
 */
function getRiskCategory(score: number): 'low' | 'medium' | 'high' {
  if (score >= 740) return 'low';
  if (score >= 620) return 'medium';
  return 'high';
}

/**
 * Get recommended products based on credit score.
 */
function getRecommendedProducts(score: number): Product[] {
  return AVAILABLE_PRODUCTS.filter((product) => score >= product.minCreditScore)
    .sort((a, b) => b.minCreditScore - a.minCreditScore)
    .slice(0, 5); // Return top 5 eligible products
}

/**
 * Validate credit matrix input.
 */
function validateInput(input: CreditMatrixInput): string | null {
  if (typeof input.income !== 'number' || input.income < 0) {
    return 'Income must be a non-negative number';
  }
  const percentFields: (keyof CreditMatrixInput)[] = [
    'paymentHistory',
    'employmentStability',
    'communityEngagement',
    'debtToIncomeRatio',
    'creditUtilization',
  ];
  for (const field of percentFields) {
    const value = input[field];
    if (typeof value !== 'number' || value < 0 || value > 100) {
      return `${field} must be a number between 0 and 100`;
    }
  }
  return null;
}

/**
 * API response types.
 */
interface GetResponse {
  defaultInput: CreditMatrixInput;
  historicalScores: CreditScoreResult[];
  availableProducts: Product[];
}

/**
 * API handler for credit scoring.
 * 
 * GET: Returns default matrix variables, historical scores, and available products
 * POST: Accepts CreditApiRequest, computes and returns CreditApiResponse
 * 
 * @example GET /api/credit
 * @example POST /api/credit with body { input: { income: 60000, paymentHistory: 85, ... } }
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreditApiResponse | GetResponse | { error: string }>
): void {
  try {
    if (req.method === 'GET') {
      // Return default input, history, and available products
      const state = getRuleState();
      const response: GetResponse = {
        defaultInput: DEFAULT_CREDIT_MATRIX_INPUT,
        historicalScores: state.creditScores,
        availableProducts: AVAILABLE_PRODUCTS,
      };
      res.status(200).json(response);
    } else if (req.method === 'POST') {
      // Parse and validate input
      const body = req.body as CreditApiRequest;
      
      if (!body.input) {
        res.status(400).json({ error: 'Missing input field in request body' });
        return;
      }

      // Merge with defaults for any missing fields
      const input: CreditMatrixInput = {
        ...DEFAULT_CREDIT_MATRIX_INPUT,
        ...body.input,
      };

      // Validate input
      const validationError = validateInput(input);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      // Compute score
      const score = computeCreditScore(input);
      const riskCategory = getRiskCategory(score);
      const recommendedProducts = getRecommendedProducts(score);

      // Create result
      const result: CreditScoreResult = {
        id: generateId(),
        score,
        riskCategory,
        recommendedProducts,
        calculatedAt: new Date().toISOString(),
      };

      // Store in history (idempotent - same input produces same score)
      addCreditScore(result);

      // Return response
      const response: CreditApiResponse = {
        result,
        input,
      };
      res.status(200).json(response);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Credit API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
