import { Metadata } from "next";
// import { headers } from "next/headers";
import React from "react";
import { getResourceById } from "@/utils/request/server";

export const generateMetadata = async (headers: any): Promise<Metadata> => {
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
