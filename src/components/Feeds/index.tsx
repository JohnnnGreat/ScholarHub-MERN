"use client";
import React from "react";
import { feedRecentCard } from "@/components/constant";
import RecentFeedsCard from "./RecentFeedsCard";
import FeedsFollowersCard from "./FeedsFollowersCard";
import { Avatar as AntAvatar, message } from "antd";
import { useGetRelatedResearchers } from "@/utils/queries";
import { IUser } from "@/types";
import Link from "next/link";

const FeedComponentIndex = ({ resInfo, userInfo }: any) => {
  const { data, isPending } = useGetRelatedResearchers(userInfo?.researchType, userInfo?.email);
  const researchRe = data as IUser[];

  return (
    <div className="mt-[6rem] relative">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[1.4rem] text-white">Search For A Resource</h1>
        <input type="text" placeholder="Enter a Subject Title or Subject Area" />
      </div>
      <div className="max-w-7xl mx-auto grid-feeds">
        <div className="w-full border rounded-[15px] border-[#ffffff25] p-[1rem]">
          <div className="w-full flex justify-center">
            <AntAvatar
              style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }}
              src={userInfo?.profileUrl}
              size={150}
            >
              {userInfo?.fullname?.slice(0, 2)}
            </AntAvatar>
          </div>
          {/* Profile Content Information */}
          <div className="mt-[1.4rem]">
            <Link
              href="/profile"
              className="hover:underline text-center text-[1.7rem] inline-block"
            >
              {userInfo?.fullname}
            </Link>
            <div className="grid grid-cols-2 gap-[.9rem] mt-[1rem]">
              <div className="py-[.7rem] px-[.9rem] rounded-[10px] bg-[#1317299c]">
                <h1 className="text-white text-[14px]">No. Publications</h1>
                <p className="text-gray-400 text-[14px]">{userInfo?.noPublications}</p>
              </div>
              <div className="py-[.4rem] px-[.6rem] rounded-[10px] bg-[#1317299c]">
                <h1 className="text-white text-[14px]">Research Type</h1>
                <p className="text-gray-400 text-[14px]">{userInfo?.researchType}</p>
              </div>
              <div className="py-[.4rem] px-[.6rem] rounded-[10px] bg-[#1317299c]">
                <h1 className="text-white text-[14px]">Institution</h1>
                <p className="text-gray-400 text-[14px]">{userInfo?.institutionName}</p>
              </div>
              <div className="py-[.4rem] px-[.6rem] rounded-[10px] bg-[#1317299c]">
                <h1 className="text-white text-[14px]">Followers</h1>
                <p className="text-gray-400 text-[14px]">0</p>
              </div>
            </div>
          </div>

          {/* Other Related Researchers */}
          {isPending ? (
            <div className="mt-[2rem] flex flex-col">
              Loading Data <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-[1rem] p-2 rounded-[10px] ">
              <h3 className="text-white text-xl mb-4 golden-font">
                Researchers with similar Interest
              </h3>
              {researchRe?.map((item: IUser) => (
                <div
                  key={item.id}
                  className="flex items-center gap-[1rem] border-b border-[#ffffff57] py-[.9rem] mt-[1rem]"
                >
                  <div className="w-[70px]">
                    <AntAvatar
                      style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }}
                      size={50}
                      className="w-[100px]"
                      src={item?.profileUrl}
                    >
                      {item?.fullname?.slice(0, 2)}
                    </AntAvatar>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                      <h1 className="text-[#EEEEEE] product-font text-[14px]">{item?.fullname}</h1>
                      <div className="text-[#eeeeee81]">
                        <p className="text-[14px]">
                          {item?.noPublications | 0} publications{" "}
                          {item?.followers ? JSON.parse(item?.followers).length : 0} followers
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <Link
                        className="text-[#76abae91] hover:text-[#76abaefd]"
                        href={`/user/${item?.id}`}
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
