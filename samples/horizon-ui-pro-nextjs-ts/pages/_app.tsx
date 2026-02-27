/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  Next.js App Component - Application wrapper.
*/

// Placeholder import for Horizon UI Pro CSS - uncomment when private package is configured
// import '@horizon-ui/react/dist/styles.css';

import type { AppProps } from 'next/app';

/**
 * Custom App component for Next.js.
 * 
 * This component wraps all pages and can be used to:
 * - Persist layout between page changes
 * - Keep state when navigating pages
 * - Inject global CSS
 * - Add global providers
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
