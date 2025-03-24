
import React from "react";
import { Inter } from "next/font/google";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Invoice Management System",
  description: "Modern invoice management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
