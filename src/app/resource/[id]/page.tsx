import { headers } from "next/headers";
import React from "react";
import { getResourceById, getUserInfoByEmail } from "@/utils/request/server";
import { updateViews } from "@/utils/request";
import SingleResourceComponent from "@/components/SingleResource";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const header = headers();
  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const userId = urlObject?.pathname.split("/")[2];
  const { data, error } = await getResourceById(userId);

  if (error) {
    return {
      title: "Error",
      description: "Error loading resource",
    };
  }

  const { title, description, thumbnail } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: headerUrl,
      images: [{ url: thumbnail }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnail],
    },
  };
};

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

  return (
    <>
      <SingleResourceComponent resInfo={data} userInfo={userI?.data} />;
    </>
  );
};

export default SingleResource;
