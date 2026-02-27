/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  CreditMatrix Component - Inclusive Credit Matrix for calculating credit scores.
  
  This component renders a configurable credit scoring matrix that allows users
  to input various financial and community factors to compute a credit score.
  
  NOTE: This is demo-only code. Not suitable for actual credit scoring decisions.
*/

// Placeholder import for Horizon UI Pro CSS - uncomment when private package is configured
// import '@horizon-ui/react/dist/styles.css';

// Placeholder import for Horizon UI Pro components - uncomment when private package is configured
// import { Card, CardHeader, CardBody, Input, Button, Progress, Badge } from '@horizon-ui/react';

import React, { useState, useCallback, useEffect } from 'react';
import type {
  CreditMatrixInput,
  CreditScoreResult,
  CreditApiResponse,
} from '../shared-types';
import { DEFAULT_CREDIT_MATRIX_INPUT } from '../shared-types';

/**
 * Props for the CreditMatrix component.
 */
export interface CreditMatrixProps {
  /** Callback when credit score is computed */
  onScoreComputed?: (result: CreditScoreResult) => void;
  /** Initial values for the matrix (optional) */
  initialValues?: Partial<CreditMatrixInput>;
  /** Whether to show recommended products */
  showProducts?: boolean;
  /** API base URL (defaults to '') */
  apiBaseUrl?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Field configuration for the matrix input.
 */
interface FieldConfig {
  key: keyof CreditMatrixInput;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

/**
 * Configuration for all matrix input fields.
 */
const FIELD_CONFIGS: FieldConfig[] = [
  {
    key: 'income',
    label: 'Annual Income',
    description: 'Your total annual income before taxes',
    min: 0,
    max: 500000,
    step: 1000,
    unit: '$',
  },
  {
    key: 'paymentHistory',
    label: 'Payment History Score',
    description: 'Based on timely payments (0-100)',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    key: 'employmentStability',
    label: 'Employment Stability',
    description: 'Job tenure and consistency score (0-100)',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    key: 'communityEngagement',
    label: 'Community Engagement',
    description: 'Local participation and involvement (0-100)',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    key: 'debtToIncomeRatio',
    label: 'Debt-to-Income Ratio',
    description: 'Monthly debt payments / monthly income (0-100, lower is better)',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    key: 'creditUtilization',
    label: 'Credit Utilization',
    description: 'Current credit used / total available (0-100, lower is better)',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
];

/**
 * Get color class based on credit score.
 */
function getScoreColor(score: number): string {
  if (score >= 740) return 'horizon-text-green-500';
  if (score >= 670) return 'horizon-text-blue-500';
  if (score >= 580) return 'horizon-text-yellow-500';
  return 'horizon-text-red-500';
}

/**
 * Get risk badge color class.
 */
function getRiskBadgeClass(risk: 'low' | 'medium' | 'high'): string {
  switch (risk) {
    case 'low':
      return 'horizon-badge-success';
    case 'medium':
      return 'horizon-badge-warning';
    case 'high':
      return 'horizon-badge-danger';
  }
}

/**
 * CreditMatrix Component.
 * 
 * Renders a configurable credit scoring matrix that allows users to input
 * financial variables and compute an inclusive credit score.
 * 
 * @example
 * ```tsx
 * <CreditMatrix
 *   onScoreComputed={(result) => console.log('Score:', result.score)}
 *   showProducts={true}
 * />
 * ```
 */
export default function CreditMatrix({
  onScoreComputed,
  initialValues,
  showProducts = true,
  apiBaseUrl = '',
  className = '',
}: CreditMatrixProps): JSX.Element {
  // Form state
  const [input, setInput] = useState<CreditMatrixInput>({
    ...DEFAULT_CREDIT_MATRIX_INPUT,
    ...initialValues,
  });

  // Result state
  const [result, setResult] = useState<CreditScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch default values and available products on mount.
   */
  useEffect(() => {
    async function fetchDefaults(): Promise<void> {
      try {
        const response = await fetch(`${apiBaseUrl}/api/credit`);
        if (response.ok) {
          const data = await response.json();
          // Only set defaults if no initial values were provided
          if (!initialValues) {
            setInput(data.defaultInput || DEFAULT_CREDIT_MATRIX_INPUT);
          }
        }
      } catch (err) {
        console.error('Failed to fetch credit defaults:', err);
      }
    }
    fetchDefaults();
  }, [apiBaseUrl, initialValues]);

  /**
   * Handle input change for a field.
   */
  const handleInputChange = useCallback(
    (key: keyof CreditMatrixInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setInput((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  /**
   * Handle slider change for a field.
   */
  const handleSliderChange = useCallback(
    (key: keyof CreditMatrixInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setInput((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  /**
   * Compute credit score by calling the API.
   */
  const computeScore = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/credit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to compute score');
      }

      const data: CreditApiResponse = await response.json();
      setResult(data.result);
      onScoreComputed?.(data.result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [input, apiBaseUrl, onScoreComputed]);

  /**
   * Reset form to defaults.
   */
  const resetForm = useCallback(() => {
    setInput(DEFAULT_CREDIT_MATRIX_INPUT);
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className={`horizon-card ${className}`}>
      {/* Card Header */}
      <div className="horizon-card-header">
        <h2 className="horizon-card-title">Inclusive Credit Matrix</h2>
        <p className="horizon-card-subtitle">
          Calculate your credit score based on multiple factors including community engagement
        </p>
      </div>

      {/* Card Body */}
      <div className="horizon-card-body">
        {/* Input Fields */}
        <div className="horizon-grid horizon-grid-cols-1 md:horizon-grid-cols-2 horizon-gap-4">
          {FIELD_CONFIGS.map((config) => (
            <div key={config.key} className="horizon-form-group">
              <label className="horizon-label">
                {config.label}
                <span className="horizon-label-hint">{config.description}</span>
              </label>
              
              <div className="horizon-input-group">
                {config.key === 'income' ? (
                  <div className="horizon-input-with-prefix">
                    <span className="horizon-input-prefix">{config.unit}</span>
                    <input
                      type="number"
                      className="horizon-input"
                      value={input[config.key]}
                      onChange={handleInputChange(config.key)}
                      min={config.min}
                      max={config.max}
                      step={config.step}
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type="range"
                      className="horizon-slider"
                      value={input[config.key]}
                      onChange={handleSliderChange(config.key)}
                      min={config.min}
                      max={config.max}
                      step={config.step}
                    />
                    <div className="horizon-slider-value">
                      {input[config.key]}{config.unit}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="horizon-button-group horizon-mt-4">
          <button
            className="horizon-btn horizon-btn-primary"
            onClick={computeScore}
            disabled={isLoading}
          >
            {isLoading ? 'Computing...' : 'Calculate Score'}
          </button>
          <button
            className="horizon-btn horizon-btn-secondary"
            onClick={resetForm}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="horizon-alert horizon-alert-error horizon-mt-4">
            {error}
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="horizon-result-panel horizon-mt-4">
            <div className="horizon-result-header">
              <h3 className="horizon-result-title">Your Credit Score</h3>
              <span className={`horizon-score-display ${getScoreColor(result.score)}`}>
                {result.score}
              </span>
            </div>

            <div className="horizon-result-details">
              <div className="horizon-result-item">
                <span className="horizon-result-label">Risk Category:</span>
                <span className={`horizon-badge ${getRiskBadgeClass(result.riskCategory)}`}>
                  {result.riskCategory.toUpperCase()}
                </span>
              </div>
              <div className="horizon-result-item">
                <span className="horizon-result-label">Calculated:</span>
                <span>{new Date(result.calculatedAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Credit Score Progress Bar */}
            <div className="horizon-progress-container horizon-mt-4">
              <div className="horizon-progress-labels">
                <span>300</span>
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
                <span>850</span>
              </div>
              <div className="horizon-progress-bar">
                <div
                  className="horizon-progress-fill"
                  style={{ width: `${((result.score - 300) / 550) * 100}%` }}
                />
                <div
                  className="horizon-progress-marker"
                  style={{ left: `${((result.score - 300) / 550) * 100}%` }}
                />
              </div>
            </div>

            {/* Recommended Products */}
            {showProducts && result.recommendedProducts.length > 0 && (
              <div className="horizon-products-section horizon-mt-4">
                <h4 className="horizon-section-title">Recommended Products</h4>
                <div className="horizon-product-list">
                  {result.recommendedProducts.map((product) => (
                    <div key={product.id} className="horizon-product-card">
                      <div className="horizon-product-header">
                        <span className="horizon-product-name">{product.name}</span>
                        <span className="horizon-product-type">{product.type.replace('_', ' ')}</span>
                      </div>
                      <p className="horizon-product-description">{product.description}</p>
                      <div className="horizon-product-details">
                        {product.interestRate && (
                          <span>APR: {product.interestRate}%</span>
                        )}
                        {product.maxAmount && (
                          <span>Max: ${product.maxAmount.toLocaleString()}</span>
                        )}
                        <span>Min Score: {product.minCreditScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Demo Notice */}
      <div className="horizon-card-footer">
        <p className="horizon-notice">
          ⚠️ This is a demo credit matrix. Scores are calculated using simplified algorithms
          and should not be used for actual financial decisions.
        </p>
      </div>

      {/* Inline styles - Replace with Horizon UI Pro CSS when available */}
      <style jsx>{`
        .horizon-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .horizon-card-header {
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        .horizon-card-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
        }
        .horizon-card-subtitle {
          font-size: 14px;
          color: #718096;
          margin-top: 8px;
        }
        .horizon-card-body {
          padding: 24px;
        }
        .horizon-card-footer {
          padding: 16px 24px;
          background: #f7fafc;
          border-top: 1px solid #e2e8f0;
        }
        .horizon-grid {
          display: grid;
        }
        .horizon-grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        @media (min-width: 768px) {
          .md\\:horizon-grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .horizon-gap-4 {
          gap: 16px;
        }
        .horizon-form-group {
          margin-bottom: 16px;
        }
        .horizon-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }
        .horizon-label-hint {
          display: block;
          font-weight: 400;
          font-size: 12px;
          color: #a0aec0;
          margin-top: 2px;
        }
        .horizon-input-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .horizon-input-with-prefix {
          display: flex;
          align-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        .horizon-input-prefix {
          padding: 10px 12px;
          background: #f7fafc;
          color: #718096;
          border-right: 1px solid #e2e8f0;
        }
        .horizon-input {
          padding: 10px 12px;
          border: none;
          outline: none;
          font-size: 16px;
          width: 100%;
        }
        .horizon-slider {
          flex: 1;
          height: 8px;
          appearance: none;
          background: #e2e8f0;
          border-radius: 4px;
          outline: none;
        }
        .horizon-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #4f46e5;
          border-radius: 50%;
          cursor: pointer;
        }
        .horizon-slider-value {
          min-width: 60px;
          text-align: right;
          font-weight: 600;
          color: #4f46e5;
        }
        .horizon-button-group {
          display: flex;
          gap: 12px;
        }
        .horizon-mt-4 {
          margin-top: 16px;
        }
        .horizon-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        .horizon-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .horizon-btn-primary {
          background: #4f46e5;
          color: white;
        }
        .horizon-btn-primary:hover:not(:disabled) {
          background: #4338ca;
        }
        .horizon-btn-secondary {
          background: #f7fafc;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        .horizon-btn-secondary:hover:not(:disabled) {
          background: #edf2f7;
        }
        .horizon-alert {
          padding: 12px 16px;
          border-radius: 8px;
        }
        .horizon-alert-error {
          background: #fed7d7;
          color: #c53030;
        }
        .horizon-result-panel {
          background: #f7fafc;
          border-radius: 12px;
          padding: 20px;
        }
        .horizon-result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .horizon-result-title {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }
        .horizon-score-display {
          font-size: 48px;
          font-weight: 700;
        }
        .horizon-text-green-500 { color: #48bb78; }
        .horizon-text-blue-500 { color: #4299e1; }
        .horizon-text-yellow-500 { color: #ecc94b; }
        .horizon-text-red-500 { color: #f56565; }
        .horizon-result-details {
          display: flex;
          gap: 24px;
          margin-top: 12px;
        }
        .horizon-result-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .horizon-result-label {
          color: #718096;
        }
        .horizon-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .horizon-badge-success {
          background: #c6f6d5;
          color: #276749;
        }
        .horizon-badge-warning {
          background: #fefcbf;
          color: #975a16;
        }
        .horizon-badge-danger {
          background: #fed7d7;
          color: #c53030;
        }
        .horizon-progress-container {
          margin-top: 20px;
        }
        .horizon-progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #a0aec0;
          margin-bottom: 8px;
        }
        .horizon-progress-bar {
          position: relative;
          height: 12px;
          background: linear-gradient(to right, #f56565, #ecc94b, #48bb78);
          border-radius: 6px;
        }
        .horizon-progress-fill {
          height: 100%;
          background: transparent;
          border-radius: 6px;
        }
        .horizon-progress-marker {
          position: absolute;
          top: -4px;
          width: 4px;
          height: 20px;
          background: #1a202c;
          border-radius: 2px;
          transform: translateX(-50%);
        }
        .horizon-products-section {
          margin-top: 24px;
        }
        .horizon-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 12px 0;
        }
        .horizon-product-list {
          display: grid;
          gap: 12px;
        }
        .horizon-product-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }
        .horizon-product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .horizon-product-name {
          font-weight: 600;
          color: #2d3748;
        }
        .horizon-product-type {
          font-size: 12px;
          color: #a0aec0;
          text-transform: capitalize;
        }
        .horizon-product-description {
          font-size: 14px;
          color: #718096;
          margin: 0 0 8px 0;
        }
        .horizon-product-details {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #4a5568;
        }
        .horizon-notice {
          font-size: 12px;
          color: #718096;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
