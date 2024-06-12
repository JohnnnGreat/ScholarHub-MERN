import ResearchType from "@/components/Onboarding/ResearchType";
import { message } from "antd";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "What type of Researcher are you?",
};

const ResearcherType = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("userId") || "";

  if (!postId) {
    <div>You are not permitted to view this page</div>;
    return redirect("/auth");
  }

  return <ResearchType id={postId} />;
};

export default ResearcherType;
