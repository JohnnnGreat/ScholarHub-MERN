import Privacy from "@/components/Add/Privacy";
import { headers } from "next/headers";
import React from "react";

const ResourcePrivacy = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("resourceId") || "";
  return <Privacy id={postId} />;
};

export default ResourcePrivacy;
