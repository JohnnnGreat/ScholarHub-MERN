import { headers } from "next/headers";
import React from "react";

const SingleResource = () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  console.log(urlObject);
  return <div>SingleResource</div>;
};

export default SingleResource;
