import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStack from "@/components/queryClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStack>
        <body className={inter.className}>{children}</body>
      </TanStack>
    </html>
  );
}
