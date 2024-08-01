import { headers } from "next/headers";
import React from "react";

const UserPage = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  const userId = urlObject?.searchParams?.get("userId") || "";
  return <div>UserPage</div>;
};

export default UserPage;
