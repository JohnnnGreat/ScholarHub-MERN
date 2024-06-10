import Institution from "@/components/Onboarding/Institution";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Choose Institution",
};

const InstitutionPage = () => {
  return <Institution />;
};

export default InstitutionPage;
