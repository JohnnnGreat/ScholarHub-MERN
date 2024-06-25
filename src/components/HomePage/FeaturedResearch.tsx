"use client";
import { containerVariants, interceptConfigs, itemVariants } from "@/utils/framermotion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { IResource } from "@/types";
import { Divider } from "antd";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function FeaturedResearch() {
  const [ref, inView] = useInView({ ...interceptConfigs, threshold: 0.4 });
  const supabase = createClient();
  const [res, setRes] = useState<IResource[] | any>([]);
  const handleTwoViewCounts = async () => {
    try {
      const { data: resources, error } = await supabase
        .from("Resource")
        .select("*")
        .order("views", { ascending: false })
        .limit(2);

      if (error) {
        console.error("Error fetching top resources:", error);
        return [];
      }

      // Fetch user information for each resource
      const resourcesWithUserInfo = await Promise.all(
        resources.map(async (resource: any) => {
          const { data: userData, error: userError } = await supabase
            .from("User")
            .select("*")
            .eq("email", resource.uploadBy)
            .single();

          if (userError) {
            console.error("Error fetching user data:", userError);
            return { ...resource, userInfo: null };
          }

          return { ...resource, userInfo: userData };
        })
      );

      setRes(resourcesWithUserInfo);
    } catch (err) {
      return err;
    }
  };
  const getShortDescription = (description: string, maxLength = 400) => {
    if (description?.length <= maxLength) return description;
    return `${description?.substring(0, maxLength)}...`;
  };
  useEffect(() => {
    handleTwoViewCounts();
  }, [res]);

  return (
    <section className="py-16 bg-[#222831] relative">
      <div className="absolute w-full h-full flex items-center justify-center">
        <svg
          width="1198"
          height="930"
          viewBox="0 0 1198 930"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_5_19)">
            <circle cx="584.5" cy="411.5" r="313.5" fill="#5A93E9" fill-opacity="0.12" />
          </g>
          <defs>
            <filter
              id="filter0_f_5_19"
              x="-29"
              y="-202"
              width="1227"
              height="1227"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_5_19" />
            </filter>
          </defs>
        </svg>
      </div>
      <svg
        width="315"
        height="314"
        viewBox="0 0 315 314"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <line
          x1="19.0605"
          y1="-41.2293"
          x2="247.495"
          y2="160.863"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
        <line
          x1="-48.3032"
          y1="34.9168"
          x2="180.131"
          y2="237.01"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
        <line
          x1="-40.2294"
          y1="178.469"
          x2="161.863"
          y2="-49.9658"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
        <line
          x1="35.9168"
          y1="245.833"
          x2="238.01"
          y2="17.3979"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
      </svg>

      <div className="max-w-[1100px] gap-[1rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2">
        {res?.map((item: any) => (
          <div key={item?.id}>
            <div className="bg-[#ffffff0c]  backdrop-blur-lg backdrop-opacity-50 rounded-[20px] p-6 border border-[#76abae57] text-white">
              <h3 className="text-3xl text-grid font-semibold golden-font">
                {getShortDescription(item?.title, 46)}
              </h3>
              <p className="mt-1 text-[#76ABAE]">
                {item?.userInfo?.fullname} · {item?.userInfo?.institutionName}
              </p>
              <Divider />
              <p>
                {item?.views} Views | {item?.published ? "Published" : "Un-Published"} |
                {item?.subjectArea}
              </p>
              <p className="mt-2 text-gray-400">{getShortDescription(item?.description, 100)}</p>
              <Link
                href={`/resource/${item?.id}`}
                className="mt-6 golden-font flex gap-[1rem] items-center justify-center bg-[#eeeeee] w-full text-black px-6 py-4 text-center rounded-[10px] text-[18px] hover:bg-[#e7e7e7]"
              >
                View Paper
                <ArrowRightOutlined />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
