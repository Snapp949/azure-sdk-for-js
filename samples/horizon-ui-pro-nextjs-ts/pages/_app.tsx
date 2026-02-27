import type { AppProps } from "next/app";
import "../styles/globals.css";

// Uncomment the following line once you have installed the private @horizon/ui-pro package:
// import "@horizon/ui-pro/dist/css/horizon-ui-pro.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
