import AddResourceField from "@/components/Add/AddResourceField";
import { getResourceData } from "@/utils/request";
import { Metadata } from "next";
import { headers } from "next/headers";
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

const AddPage = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  console.log(urlObject);
  const postId = urlObject?.searchParams?.get("resourceId") || "";
  const isEdit = urlObject?.searchParams?.get("isEdit") || false;

  const { data, error } = await getResourceData(postId);
  return (
    <div>
      <AddResourceField isEdit={isEdit} postId={postId} resourceInfo={data} />
    </div>
  );
};

export default AddPage;
