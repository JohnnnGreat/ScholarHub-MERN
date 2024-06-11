import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStack from "@/components/queryClient";
import AuthProvider from "@/context/AuthContext";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <TanStack>
        <AuthProvider>
          <body className={inter.className}>
            <Header user={user ? true : false} />
            {children}
          </body>
        </AuthProvider>
      </TanStack>
    </html>
  );
}
