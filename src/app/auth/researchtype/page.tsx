import ResearchType from "@/components/Onboarding/ResearchType";
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "What type of Researcher are you?",
};

const ResearcherType = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("userId") || "";

  return <ResearchType id={postId} />;
};

export default ResearcherType;
