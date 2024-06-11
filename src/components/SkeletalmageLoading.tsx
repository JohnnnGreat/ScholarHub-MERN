"use client";
import { Skeleton } from "antd";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

const SkeletalmageLoading = ({ url }: { url: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => {
        setImageLoaded(true);
      };
    }
  }, [url]);
  return (
    <>
      {!imageLoaded && <Skeleton.Image active style={{ width: "192px", height: "256px" }} />}
      <img
        src={url}
        alt="Resource Thumbnail"
        width={192}
        height={256}
        className={`rounded-md ${imageLoaded ? "block" : "hidden"}`}
        // onLoad={handleImageLoad}
      />
    </>
  );
};

export default SkeletalmageLoading;
