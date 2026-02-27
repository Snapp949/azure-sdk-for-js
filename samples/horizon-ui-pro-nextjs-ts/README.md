# Horizon UI Pro Next.js TypeScript Sample

This sample demonstrates the **Inclusive Credit Matrix** and **Real Estate Marketplace** features built with Next.js and TypeScript. It includes a server-side proxy for Zillow API integration.

> ⚠️ **Demo Only**: This is a demonstration sample. All data is simulated in-memory and not persisted. Do not use for actual financial decisions.

## Features

### Inclusive Credit Matrix
A configurable credit scoring component that evaluates multiple factors:
- Annual income
- Payment history
- Employment stability
- Community engagement (inclusive factor)
- Debt-to-income ratio
- Credit utilization

The matrix computes a credit score (300-850 scale) and recommends eligible financial products.

### Real Estate Marketplace
A property listing marketplace that:
- Displays property listings with prices in USD and RULE denomination
- Checks credit score eligibility for each property
- Supports demo "buy" transactions
- Integrates with Zillow API when configured (falls back to demo data)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.template .env.local

# (Optional) Add your Zillow API key to .env.local
# ZILLOW_API_KEY=your_key_here

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Setup

### Required Files

1. **`.env.local`** - Environment variables (not committed to git)
   ```bash
   cp .env.template .env.local
   ```

2. **`.npmrc`** - NPM configuration for private packages (not committed to git)
   ```bash
   cp .npmrc.template .npmrc
   ```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ZILLOW_API_KEY` | No | Zillow API key for real listings. Without it, demo data is used. |
| `NEXT_PUBLIC_API_BASE_URL` | No | Base URL for API calls (usually not needed). |

## Zillow API Integration

The marketplace can fetch real property listings from Zillow when configured.

### Getting a Zillow API Key

1. **RapidAPI (Recommended for testing)**:
   - Sign up at [RapidAPI Zillow API](https://rapidapi.com/apimaker/api/zillow-com1)
   - Subscribe to a plan (free tier available)
   - Copy your API key from the dashboard

2. **Zillow Bridge API (Official)**:
   - Visit [Bridge Data Output - Zillow](https://bridgedataoutput.com/docs/explorer/zillow)
   - Apply for API access
   - Follow their onboarding process

### Configuring the API Key

Add your API key to `.env.local`:
```
ZILLOW_API_KEY=your_actual_api_key_here
```

**Security Notes**:
- Never commit API keys to source control
- Use environment variables or secrets management
- For Codespaces, add secrets in repository settings

## Horizon UI Pro Package

This sample includes placeholder imports for the private Horizon UI Pro package. To enable:

### 1. Configure NPM Access

Create `.npmrc` from template:
```bash
cp .npmrc.template .npmrc
```

Add your NPM token to `.npmrc`:
```
@horizon-ui:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN
```

Or set the `NPM_TOKEN` environment variable for CI/CD.

### 2. Install the Package

```bash
npm install @horizon-ui/react
```

### 3. Enable Imports

Uncomment the placeholder imports in component files:
```tsx
// In components/CreditMatrix.tsx and components/Marketplace.tsx
import '@horizon-ui/react/dist/styles.css';
import { Card, CardHeader, CardBody, ... } from '@horizon-ui/react';
```

## API Reference

### Credit API

**Endpoint**: `/api/credit`

**GET** - Retrieve default matrix variables and historical scores
```bash
curl http://localhost:3000/api/credit
```

**POST** - Compute credit score
```bash
curl -X POST http://localhost:3000/api/credit \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "income": 75000,
      "paymentHistory": 85,
      "employmentStability": 80,
      "communityEngagement": 70,
      "debtToIncomeRatio": 25,
      "creditUtilization": 20
    }
  }'
```

**Response**:
```json
{
  "result": {
    "id": "cs-1234567890-abc123",
    "score": 742,
    "riskCategory": "low",
    "recommendedProducts": [...],
    "calculatedAt": "2024-01-15T10:30:00.000Z"
  },
  "input": {...}
}
```

### Real Estate API

**Endpoint**: `/api/realestate`

**GET** - Retrieve property listings
```bash
# Get demo listings
curl http://localhost:3000/api/realestate

# Refresh from Zillow (if configured)
curl "http://localhost:3000/api/realestate?refresh=true&location=Seattle,%20WA"
```

**POST** - Simulate a buy transaction
```bash
curl -X POST http://localhost:3000/api/realestate \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "demo-1",
    "buyerId": "user-123",
    "creditScore": 720
  }'
```

**Response**:
```json
{
  "success": true,
  "transactionId": "tx-1234567890-xyz789",
  "listingId": "demo-1",
  "buyerId": "user-123",
  "pricePaid": 450000,
  "rulePricePaid": 4500,
  "timestamp": "2024-01-15T10:35:00.000Z"
}
```

### Rules API

**Endpoint**: `/api/rules`

**GET** - Retrieve current state
```bash
curl http://localhost:3000/api/rules
```

**POST** - Reset state or update exchange rate
```bash
# Reset to initial demo data
curl -X POST http://localhost:3000/api/rules \
  -H "Content-Type: application/json" \
  -d '{"action": "reset"}'

# Update RULE exchange rate
curl -X POST http://localhost:3000/api/rules \
  -H "Content-Type: application/json" \
  -d '{"action": "updateExchangeRate", "rate": 150}'
```

## Project Structure

```
samples/horizon-ui-pro-nextjs-ts/
├── components/
│   ├── CreditMatrix.tsx     # Credit scoring matrix component
│   └── Marketplace.tsx      # Real estate marketplace component
├── pages/
│   ├── api/
│   │   ├── credit.ts        # Credit scoring API
│   │   ├── realestate.ts    # Real estate/Zillow proxy API
│   │   └── rules.ts         # State management API
│   ├── index.tsx            # Home page
│   └── marketplace.tsx      # Marketplace page
├── shared-types/
│   └── index.ts             # Shared TypeScript types
├── public/                  # Static assets
├── .env.template            # Environment variables template
├── .npmrc.template          # NPM configuration template
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## TypeScript Types

All shared types are in `shared-types/index.ts`:

- `CreditMatrixInput` - Input variables for credit scoring
- `CreditScoreResult` - Computed credit score result
- `Product` - Financial product definition
- `Listing` - Property listing definition
- `TransactionResult` - Buy transaction result
- `RuleState` - In-memory state definition

## Development

### Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Building

```bash
npm run build
```

This creates an optimized production build in `.next/`.

## CI/CD

A GitHub Actions workflow is provided at `.github/workflows/sample-ci.yml` that:
- Installs dependencies
- Builds the sample
- Validates TypeScript compilation

To enable CI for private packages:
1. Add `NPM_TOKEN` as a repository secret
2. The workflow will use it for authentication

## Known Limitations

1. **In-Memory State**: All data (listings, transactions, scores) is stored in memory and lost on server restart.
2. **Demo Transactions**: Buy transactions are simulated and don't involve real payments.
3. **Credit Scoring**: The algorithm is simplified for demonstration purposes.
4. **Zillow API**: Rate limits and availability depend on your API plan.

## Security Considerations

- Never commit `.env.local` or `.npmrc` with actual credentials
- Use environment secrets for CI/CD
- The Zillow API key is only used server-side
- All API endpoints validate input data

## License

Copyright (c) Microsoft Corporation. Licensed under the MIT License.

## Related Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Zillow API on RapidAPI](https://rapidapi.com/apimaker/api/zillow-com1)
- [Horizon UI Pro](https://horizon-ui.com/)
- [Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
