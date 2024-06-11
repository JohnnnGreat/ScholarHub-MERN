import React from "react";
import { headers } from "next/headers";
import { Metadata } from "next";
import { getResourceData } from "@/utils/request";
import FinalComponent from "@/components/Add/Final";

export const metadata: Metadata = {
  title: "Preview",
};

const Final = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("resourceId") || "";

  const { data: resourceData, error } = await getResourceData(postId);

  return <FinalComponent data={resourceData} />;
};

export default Final;
