import Institution from "@/components/Onboarding/Institution";
import { Metadata } from "next";
import React from "react";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Choose Institution",
};

const InstitutionPage = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  const userId = urlObject?.searchParams?.get("userId") || "";

  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  return <Institution id={userId} />;
};

export default InstitutionPage;
