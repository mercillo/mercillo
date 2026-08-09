import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Marlon Mercillo — software engineer and DJ based in San Diego. Portfolio, projects, and mixes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mercillo.com"),
  title: "Mercillo — Software Engineer & DJ",
  description: siteDescription,
  openGraph: {
    title: "Mercillo — Software Engineer & DJ",
    description: siteDescription,
    url: "https://mercillo.com",
    siteName: "Mercillo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercillo — Software Engineer & DJ",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
