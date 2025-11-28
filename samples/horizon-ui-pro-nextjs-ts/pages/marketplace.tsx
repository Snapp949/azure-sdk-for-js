/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Marketplace Page - Composes CreditMatrix and Marketplace components.
  
  This page displays both the Inclusive Credit Matrix and Real Estate Marketplace
  side-by-side with responsive layout. The credit score computation influences
  product eligibility in the Marketplace UI.
  
  NOTE: This is demo-only code. All data is simulated and not persisted.
*/

// Placeholder import for Horizon UI Pro CSS - uncomment when private package is configured
// import '@horizon-ui/react/dist/styles.css';

import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CreditMatrix from '../components/CreditMatrix';
import Marketplace from '../components/Marketplace';
import type { CreditScoreResult, TransactionResult } from '../types';

/**
 * MarketplacePage Component.
 * 
 * Main page that integrates the Inclusive Credit Matrix with the Real Estate
 * Marketplace. Credit score results affect property eligibility.
 */
export default function MarketplacePage(): JSX.Element {
  // State for credit score result
  const [creditScoreResult, setCreditScoreResult] = useState<CreditScoreResult | null>(null);
  
  // State for transaction history
  const [transactions, setTransactions] = useState<TransactionResult[]>([]);

  /**
   * Handle credit score computation.
   */
  const handleScoreComputed = useCallback((result: CreditScoreResult) => {
    setCreditScoreResult(result);
  }, []);

  /**
   * Handle successful purchase.
   */
  const handlePurchaseComplete = useCallback((result: TransactionResult) => {
    setTransactions((prev) => [...prev, result]);
  }, []);

  return (
    <>
      <Head>
        <title>Marketplace - Inclusive Credit Matrix & Real Estate</title>
        <meta name="description" content="Demo marketplace with inclusive credit scoring and real estate listings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-container">
        {/* Header */}
        <header className="page-header">
          <div className="header-content">
            <h1 className="page-title">Inclusive Financial Marketplace</h1>
            <p className="page-subtitle">
              Calculate your credit score and explore real estate opportunities
            </p>
          </div>
          <div className="header-badges">
            <span className="demo-badge">DEMO</span>
            {creditScoreResult && (
              <span className="score-badge">
                Score: {creditScoreResult.score}
              </span>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="page-main">
          {/* Two-column layout */}
          <div className="content-grid">
            {/* Left Column - Credit Matrix */}
            <section className="content-column">
              <CreditMatrix
                onScoreComputed={handleScoreComputed}
                showProducts={true}
              />
            </section>

            {/* Right Column - Marketplace */}
            <section className="content-column">
              <Marketplace
                creditScore={creditScoreResult?.score}
                creditScoreResult={creditScoreResult}
                onPurchaseComplete={handlePurchaseComplete}
              />
            </section>
          </div>

          {/* Transaction History */}
          {transactions.length > 0 && (
            <section className="transactions-section">
              <h2 className="section-title">Transaction History</h2>
              <div className="transactions-list">
                {transactions.map((tx) => (
                  <div key={tx.transactionId} className="transaction-card">
                    <div className="transaction-header">
                      <span className="transaction-id">ID: {tx.transactionId}</span>
                      <span className="transaction-status">
                        {tx.success ? '✓ Completed' : '✗ Failed'}
                      </span>
                    </div>
                    <div className="transaction-details">
                      <span>Listing: {tx.listingId}</span>
                      <span>Price: ${tx.pricePaid.toLocaleString()}</span>
                      <span>RULE: {tx.rulePricePaid.toFixed(2)}</span>
                      <span>Date: {new Date(tx.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="page-footer">
          <div className="footer-content">
            <p className="footer-notice">
              ⚠️ <strong>Demo Only:</strong> This is a demonstration of the Inclusive Credit Matrix
              and Real Estate Marketplace integration. All data is simulated and not persisted.
              Do not use for actual financial decisions.
            </p>
            <div className="footer-links">
              <Link href="/" className="footer-link">Home</Link>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/credit" className="footer-link">Credit API</a>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/realestate" className="footer-link">Real Estate API</a>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/rules" className="footer-link">Rules API</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Page Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: #f7fafc;
          min-height: 100vh;
        }
      `}</style>
      
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .page-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .header-content {
          flex: 1;
        }
        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }
        .page-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin: 8px 0 0 0;
        }
        .header-badges {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .demo-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .score-badge {
          background: white;
          color: #4f46e5;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 700;
        }
        .page-main {
          flex: 1;
          padding: 32px;
          max-width: 1600px;
          width: 100%;
          margin: 0 auto;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 1200px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .content-column {
          min-width: 0;
        }
        .transactions-section {
          margin-top: 32px;
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 16px 0;
        }
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .transaction-card {
          background: #f7fafc;
          border-radius: 8px;
          padding: 16px;
        }
        .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .transaction-id {
          font-weight: 600;
          color: #2d3748;
        }
        .transaction-status {
          font-size: 14px;
          color: #48bb78;
          font-weight: 600;
        }
        .transaction-details {
          display: flex;
          gap: 24px;
          font-size: 14px;
          color: #718096;
          flex-wrap: wrap;
        }
        .page-footer {
          background: #1a202c;
          color: #a0aec0;
          padding: 24px 32px;
        }
        .footer-content {
          max-width: 1600px;
          margin: 0 auto;
        }
        .footer-notice {
          margin: 0 0 16px 0;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer-notice strong {
          color: #f56565;
        }
        .footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-link {
          color: #a0aec0;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: white;
        }
      `}</style>
    </>
  );
}
