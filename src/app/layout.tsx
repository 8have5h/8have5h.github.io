// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your chosen font
import "./globals.css";
import { cn } from "@/lib/utils" // If using shadcn utils

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Example font setup

export const metadata: Metadata = {
  title: "Bhavesh Gurnani - Portfolio", // Customize title
  description: "Portfolio of Bhavesh Gurnani, Computer Science student at IIT Delhi.", // Customize description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning can sometimes help, but fixing the root cause is better */}
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased", // Base classes
          inter.variable // Apply font variable
        )}>
        {children}
        </body>
    </html>
  );
}