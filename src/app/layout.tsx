// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        </body>
    </html>
  );
}