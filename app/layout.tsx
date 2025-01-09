import type {Metadata} from "next";
import "./globals.scss";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "Pertamina Retail",
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

