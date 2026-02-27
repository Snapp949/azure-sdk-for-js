# RULE Native Currency Ecosystem - Horizon UI Pro Demo

This is a sample Next.js + TypeScript application that demonstrates integrating [Horizon UI Pro](https://horizon-ui.com/) (a private package) with a minimal backend API modeling the **RULE native currency ecosystem**.

## About the RULE Ecosystem

The RULE ecosystem is a credit-building native currency platform that allows users to:

- **Manage RULE Balance**: Track and add RULE native currency to your account
- **Create Credit-Building Products**: Add financial products that help build credit
- **Secondary Market**: List products on a demo secondary market for trading

This sample provides a minimal implementation to demonstrate these workflows.

## Project Structure

```
horizon-ui-pro-nextjs-ts/
├── pages/
│   ├── _app.tsx          # App component with global styles
│   ├── index.tsx         # Main dashboard page
│   └── api/
│       └── rules.ts      # API route with in-memory store
├── components/
│   ├── Layout.tsx        # Layout wrapper component
│   └── ProductCard.tsx   # Product display component
├── styles/
│   └── globals.css       # Global CSS styles
├── .devcontainer/
│   └── devcontainer.json # DevContainer configuration
├── .npmrc.template       # Template for NPM authentication
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── README.md             # This file
```

## API Documentation

The `/api/rules` endpoint provides a simple in-memory store for the demo:

### GET /api/rules

Returns the current state:

```json
{
  "balance": 1000,
  "products": [],
  "marketListings": []
}
```

### POST /api/rules

Performs actions on the store. Include an `action` field in the request body:

#### Add Balance

```json
{
  "action": "addBalance",
  "amount": 100
}
```

#### Add Product

```json
{
  "action": "addProduct",
  "product": {
    "name": "Credit Builder Loan",
    "description": "A small loan to help build credit history",
    "price": 500
  }
}
```

#### List to Market

```json
{
  "action": "listToMarket",
  "productId": "product-id-here"
}
```

> **Note**: This API uses an in-memory store. All data is lost when the server restarts. This is intentional for demo purposes.

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Access to the private `@horizon/ui-pro` package (requires NPM_TOKEN)

## Installation

### Step 1: Configure NPM Authentication

The Horizon UI Pro package is a private npm package. You need to configure authentication:

1. Copy the template file:

   ```bash
   cp .npmrc.template .npmrc
   ```

2. Edit `.npmrc` and replace `YOUR_NPM_TOKEN_HERE` with your actual NPM token:

   ```
   //registry.npmjs.org/:_authToken=YOUR_ACTUAL_TOKEN
   ```

> ⚠️ **IMPORTANT**: Never commit the `.npmrc` file with your actual token! The `.npmrc` file is gitignored. Only commit `.npmrc.template`.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using GitHub Codespaces

### Setting up NPM_TOKEN in Codespaces

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Codespaces**
3. Add a new secret named `NPM_TOKEN` with your npm authentication token
4. Create a new Codespace from the repository

The DevContainer is configured to use the `NPM_TOKEN` secret automatically.

### Alternative: Manual Setup in Codespaces

1. Open the Codespace
2. Create the `.npmrc` file from the template:

   ```bash
   cd samples/horizon-ui-pro-nextjs-ts
   cp .npmrc.template .npmrc
   ```

3. Edit `.npmrc` and add your token
4. Run `npm install`

## Using VS Code DevContainers

1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Set the `NPM_TOKEN` environment variable locally before opening the container:

   ```bash
   export NPM_TOKEN=your_token_here
   ```

3. Open the folder in VS Code and click "Reopen in Container"
4. The container will automatically run `npm install`

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm start` - Start production server

## Horizon UI Pro Integration

This sample includes placeholder imports for Horizon UI Pro components. Once you have the private package installed:

1. Uncomment the import in `pages/_app.tsx`:

   ```tsx
   import "@horizon/ui-pro/dist/css/horizon-ui-pro.css";
   ```

2. Uncomment component imports in `pages/index.tsx`, `components/Layout.tsx`, and `components/ProductCard.tsx`

3. Replace the custom components with Horizon UI Pro components

## Security Notes

- **Never commit secrets or tokens** to the repository
- The `.npmrc` file is gitignored for security
- Use `.npmrc.template` as a reference for what the file should look like
- In CI/CD, use environment variables or secret managers
- For Codespaces, use GitHub Codespaces Secrets
- For local development, set environment variables or use a local `.npmrc`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Horizon UI Pro](https://horizon-ui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

This sample is provided as-is for demonstration purposes.
