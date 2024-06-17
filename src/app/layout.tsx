import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStack from "@/components/queryClient";

import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextUIProvider } from "@nextui-org/system";

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
        <AntdRegistry>
          <body className="dark text-foreground h-max ">
            <NextUIProvider>
              <Header user={user ? true : false} />
              {children}
            </NextUIProvider>
          </body>
        </AntdRegistry>
      </TanStack>
    </html>
  );
}
