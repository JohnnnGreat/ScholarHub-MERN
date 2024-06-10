import DisplayImageComponent from "@/components/Add/DisplayImage";
import { headers } from "next/headers";
import React from "react";

const DisplayImage = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("resourceId") || "";
  return <DisplayImageComponent id={postId} />;
};

export default DisplayImage;
