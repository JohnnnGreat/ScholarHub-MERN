import DisplayImageComponent from "@/components/Add/DisplayImage";
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Display Image & File Attachment",
};

const DisplayImage = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("resourceId") || "";
  return <DisplayImageComponent id={postId} />;
};

export default DisplayImage;
