import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStack from "@/components/queryClient";
import AuthProvider from "@/context/AuthContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStack>
        <AuthProvider>
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </AuthProvider>
      </TanStack>
    </html>
  );
}
