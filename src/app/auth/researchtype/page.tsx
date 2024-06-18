import ResearchType from "@/components/Onboarding/ResearchType";
import { message } from "antd";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { createClient } from "@/utils/supabase/server";
export const metadata: Metadata = {
  title: "What type of Researcher are you?",
};

const ResearcherType = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  const userId = urlObject?.searchParams?.get("code") || "";
  console.log(userId);
  // if (!postId) {
  //   <div>You are not permitted to view this page</div>;
  //   return redirect("/auth");
  // }
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  return <ResearchType id={userId} />;
};

export default ResearcherType;
