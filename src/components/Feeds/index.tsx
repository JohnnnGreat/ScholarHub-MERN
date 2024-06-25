"use client";
import React from "react";
import { feedRecentCard } from "@/components/constant";
import RecentFeedsCard from "./RecentFeedsCard";
import FeedsFollowersCard from "./FeedsFollowersCard";

const FeedComponentIndex = ({ resInfo }: any) => {
  return (
    <div className="mt-[6rem] relative">
      <div className="max-w-7xl mx-auto grid-feeds">
        <div className="w-full border rounded-[15px] border-[#ffffff25] p-[1rem]"></div>
        <div className="w-full border rounded-[15px] border-[#ffffff25] p-[1rem]">
          <h1 className="font-bold my-[1rem] text-[1.5rem] text-white">Recent Articles</h1>
          {resInfo.map((feed: any, index: number) => (
            <RecentFeedsCard key={index} resourceInfo={feed} />
          ))}
          {resInfo.map((feed: any, index: number) => (
            <FeedsFollowersCard key={index} resourceInfo={feed} />
          ))}
        </div>
        <div className=" hidden md:inline-block border rounded-[15px]">John\</div>
      </div>
    </div>
  );
};

export default FeedComponentIndex;
