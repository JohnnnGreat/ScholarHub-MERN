import { headers } from "next/headers";
import React from "react";
import { getResourceById, getUserInfoByEmail } from "@/utils/request/server";
import { updateViews } from "@/utils/request";
import SingleResourceComponent from "@/components/SingleResource";
import Head from "next/head";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata(headers);

const SingleResource = async () => {
  const header = headers();
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const userId = urlObject?.pathname.split("/")[2];
  const { data, error } = await getResourceById(userId);
  const userI = await getUserInfoByEmail(data?.uploadBy);

  // Update Reads
  const response = await updateViews(data?.id, data?.views);
  console.log(response);
  return (
    <>
      <SingleResourceComponent resInfo={data} userInfo={userI?.data} />;
    </>
  );
};

export default SingleResource;
