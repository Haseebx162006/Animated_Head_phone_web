import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sony WH-1000XM6 | Silence, Perfected",
  description: "Flagship wireless noise cancelling headphones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white selection:bg-sony-blue selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
