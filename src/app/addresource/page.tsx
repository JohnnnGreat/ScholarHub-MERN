import AddResourceField from "@/components/Add/AddResourceField";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add a Resource - Research Hub",
  description:
    "Contribute to the Research Hub by adding new resources. Fill in the details about research papers, articles, or other valuable materials.",
  keywords:
    "add resource, research hub, contribute, research papers, academic articles, add research",

  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

const AddPage = () => {
  return (
    <div>
      <AddResourceField />
    </div>
  );
};

export default AddPage;
