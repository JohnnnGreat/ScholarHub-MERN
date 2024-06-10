import ResearchType from "@/components/Onboarding/ResearchType";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "What type of Researcher are you?",
};

const ResearcherType = () => {
  return <ResearchType />;
};

export default ResearcherType;
