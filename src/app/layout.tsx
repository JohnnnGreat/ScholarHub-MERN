import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStack from "@/components/queryClient";

import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextUIProvider } from "@nextui-org/system";
import PDFWorker from "@/components/pdfWorker";

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
        <body className="dark text-foreground h-max ">
          <PDFWorker>
            <NextUIProvider>
              <Header user={user ? true : false} userInfo={user} />
              {children}
            </NextUIProvider>
          </PDFWorker>
        </body>
      </TanStack>
    </html>
  );
}
