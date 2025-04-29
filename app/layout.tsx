import type { Metadata } from "next";
import "./globals.scss";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import ProgressBar from "@/components/ProgressBar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Tradisco Global Inovasi",
  description: "",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TG1YPERRSE"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TG1YPERRSE');
          `}
        </Script>
      </head>
      <ReactQueryClientProvider>
        <body>
          <Header />
          {children}
          <Footer />
          <ProgressBar />
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
