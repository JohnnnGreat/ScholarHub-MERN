import { createClient } from "@/utils/supabase/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const FeedsPage = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  const userId = urlObject?.searchParams?.get("userId") || "";

  if (!userId) {
    return redirect("/auth/login");
  }

  const supabase = createClient();

  return <div>FeedsPage</div>;
};
