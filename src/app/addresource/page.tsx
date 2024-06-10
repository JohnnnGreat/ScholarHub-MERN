import AddResourceField from "@/components/Add/AddResourceField";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add a Resource",
};
const AddPage = () => {
  return (
    <div>
      <AddResourceField />
    </div>
  );
};

export default AddPage;
