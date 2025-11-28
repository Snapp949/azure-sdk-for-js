/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Home Page - Landing page for the Horizon UI Pro Next.js TypeScript sample.
  
  This page provides an overview of the demo features and navigation.
*/

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

/**
 * HomePage Component.
 * 
 * Landing page with feature overview and navigation.
 */
export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Horizon UI Pro Next.js TypeScript Sample</title>
        <meta name="description" content="Demo sample with Inclusive Credit Matrix and Real Estate Marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-container">
        {/* Hero Section */}
        <header className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Horizon UI Pro
              <span className="hero-subtitle">Next.js + TypeScript Sample</span>
            </h1>
            <p className="hero-description">
              A demonstration of the Inclusive Credit Matrix and Real Estate Marketplace
              features, including Zillow API integration.
            </p>
            <div className="hero-actions">
              <Link href="/marketplace" className="btn btn-primary">
                Explore Marketplace
              </Link>
              <a href="https://github.com/Azure/azure-sdk-for-js" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <main className="main">
          <section className="features">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              {/* Credit Matrix Feature */}
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Inclusive Credit Matrix</h3>
                <p className="feature-description">
                  Calculate credit scores using multiple factors including community engagement,
                  employment stability, and traditional financial metrics.
                </p>
                <ul className="feature-list">
                  <li>Configurable scoring variables</li>
                  <li>Real-time score computation</li>
                  <li>Product recommendations</li>
                  <li>Risk category assessment</li>
                </ul>
              </div>

              {/* Marketplace Feature */}
              <div className="feature-card">
                <div className="feature-icon">🏠</div>
                <h3 className="feature-title">Real Estate Marketplace</h3>
                <p className="feature-description">
                  Browse property listings with credit-based eligibility. Integrates with
                  Zillow API when configured for real listings.
                </p>
                <ul className="feature-list">
                  <li>Property listings with RULE pricing</li>
                  <li>Credit score eligibility checks</li>
                  <li>Demo purchase transactions</li>
                  <li>Zillow API integration (optional)</li>
                </ul>
              </div>

              {/* API Feature */}
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">RESTful APIs</h3>
                <p className="feature-description">
                  Server-side API endpoints for credit scoring, real estate listings,
                  and state management.
                </p>
                <ul className="feature-list">
                  <li><code>/api/credit</code> - Credit scoring</li>
                  <li><code>/api/realestate</code> - Property listings</li>
                  <li><code>/api/rules</code> - State management</li>
                  <li>TypeScript types included</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="quickstart">
            <h2 className="section-title">Quick Start</h2>
            <div className="code-block">
              <pre>
{`# Install dependencies
npm install

# Copy environment template
cp .env.template .env.local

# Add your Zillow API key (optional)
# Edit .env.local: ZILLOW_API_KEY=your_key_here

# Run development server
npm run dev

# Open http://localhost:3000`}
              </pre>
            </div>
          </section>

          {/* Demo Notice */}
          <section className="notice-section">
            <div className="notice">
              <strong>⚠️ Demo Only:</strong> This is a demonstration sample. All data is
              simulated in-memory and not persisted. Do not use for actual financial
              decisions. See README.md for configuration details.
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Microsoft Corporation. Licensed under MIT License.
          </p>
          <div className="footer-links">
            <Link href="/marketplace">Marketplace</Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/credit">Credit API</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/realestate">Real Estate API</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/rules">Rules API</a>
          </div>
        </footer>
      </div>

      {/* Styles */}
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
        a {
          color: inherit;
        }
      `}</style>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 32px;
          text-align: center;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 48px;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }
        .hero-subtitle {
          display: block;
          font-size: 24px;
          font-weight: 400;
          opacity: 0.9;
          margin-top: 8px;
        }
        .hero-description {
          font-size: 18px;
          opacity: 0.9;
          margin: 24px 0 32px;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
        }
        .btn-primary {
          background: white;
          color: #4f46e5;
        }
        .btn-primary:hover {
          background: #f0f0ff;
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        .main {
          flex: 1;
          padding: 64px 32px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }
        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 32px 0;
          text-align: center;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .feature-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 12px 0;
        }
        .feature-description {
          color: #718096;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }
        .feature-list {
          margin: 0;
          padding-left: 20px;
          color: #4a5568;
        }
        .feature-list li {
          margin-bottom: 8px;
        }
        .feature-list code {
          background: #f7fafc;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
        .quickstart {
          margin-top: 64px;
        }
        .code-block {
          background: #1a202c;
          border-radius: 12px;
          padding: 24px;
          overflow-x: auto;
        }
        .code-block pre {
          margin: 0;
          color: #e2e8f0;
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
        .notice-section {
          margin-top: 64px;
        }
        .notice {
          background: #fefcbf;
          border: 1px solid #ecc94b;
          color: #744210;
          padding: 16px 24px;
          border-radius: 8px;
          text-align: center;
        }
        .footer {
          background: #1a202c;
          color: #a0aec0;
          padding: 32px;
          text-align: center;
        }
        .footer p {
          margin: 0 0 16px 0;
        }
        .footer-links {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .footer-links a {
          color: #a0aec0;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: white;
        }
      `}</style>
    </>
  );
}
