"use client";
import React, { useState } from "react";
import { useUpdateResearcherType } from "@/utils/queries";
import { message, notification } from "antd";
import { researcherType } from "../constant";
import { useRouter } from "next/navigation";

const ResearchType = ({ id }: { id: string }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const {
    mutateAsync: updateResearchType,
    isPending: isUpdatingUser,
    isError,
  } = useUpdateResearcherType();
  const router = useRouter();

  const handleSelectedOption = async () => {
    const { data, error } = await updateResearchType({ selectedOption, id });

    if (isError) {
      console.log("An error had occured");
    }
    await notification.success({
      message: "Files submitted successfully.",
    });
    console.log(data, error);
    return router.push("/auth/institution");
  };

  return (
    <>
      <svg
        width="500"
        height="581"
        viewBox="0 0 700 781"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <g filter="url(#filter0_f_4_3)">
          <circle cx="86.5" cy="324.5" r="313.5" fill="#5A93E9" fill-opacity="0.24" />
        </g>
        <defs>
          <filter
            id="filter0_f_4_3"
            x="-527"
            y="-289"
            width="1227"
            height="1227"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_4_3" />
          </filter>
        </defs>
      </svg>
      <div className="relative z-10">
        <h2 className="text-3xl text-white mb-3 golden-font text-center transition-all">
          {" "}
          What Type of Researcher Are You?
        </h2>
        <p className="mb-8 text-center text-[#ffffff8e] text-[14px]">
          To provide you with a personalized experience and tailor our features to your needs,
          please let us know what type of researcher you are. This will help us recommend relevant
          content, connections, and tools that suit your research journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {researcherType.map((item) => (
            <div
              onClick={() => {
                setSelectedOption(item?.title);
              }}
              key={item.id}
              className={` ${
                item?.title === selectedOption && "border-[#76abae]"
              } hover:border-[#76abae] transition-all border border-[#ffffff3b] rounded-[20px] cursor-pointer p-[1rem]`}
            >
              <h1 className="text-[20px]  text-white my-1 golden-font">{item?.title}</h1>
              <p className="text-[14px] text-[#76abaeb7]">{item?.description}</p>
            </div>
          ))}
        </div>
        <button
          disabled={isUpdatingUser}
          onClick={handleSelectedOption}
          className="disabled:bg-[#8dcccf] block py-4 rounded-[20px] px-5 w-full bg-[#76ABAE] flex gap-[.8rem] justify-center items-center text-[16px] mt-[.7rem] text-[#232932]"
        >
          {!isUpdatingUser ? "Next" : <span className="loading loading-dots loading-md"></span>}
        </button>
      </div>
    </>
  );
};

export default ResearchType;
