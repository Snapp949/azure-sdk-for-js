import { ReactNode } from "react";

// Uncomment when Horizon UI Pro is installed:
// import { Sidebar, Navbar } from "@horizon/ui-pro";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout component that wraps all pages.
 * When Horizon UI Pro is installed, you can add their Sidebar and Navbar components here.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <div className="logo">RULE Dashboard</div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="#products">Products</a>
            <a href="#market">Market</a>
          </div>
        </nav>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>RULE Native Currency Ecosystem Demo</p>
        <p className="disclaimer">
          This is a demo application. Data is stored in-memory and is not persistent.
        </p>
      </footer>
    </div>
  );
}
