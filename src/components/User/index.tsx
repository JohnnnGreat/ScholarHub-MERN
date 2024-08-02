"use client";
import { IResource, IUser } from "@/types";
import Link from "next/link";
import React from "react";
import { Avatar as AntAvatar, message } from "antd";
import { getShortDescription } from "@/utils/shared";

const UserComponent = ({
  userId,
  userInfo,
  resourcesByUser,
}: {
  userId: string;
  userInfo: IUser;
  resourcesByUser: any;
}) => {
  console.log(userId, resourcesByUser);

  const calculateTimeAgo = (date: any) => {
    const now = new Date();
    const diffMs = (now as any) - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 10) {
      return `${diffMinutes} mins ago`;
    } else if (diffDays >= 10) {
      return `${diffDays} days ago`;
    } else if (diffDays < 10 && diffMinutes >= 10) {
      return `${diffHours} hours ago`;
    }
  };
  return (
    <>
      <div className="grid  p-4 mt-20 gap-2  md:overflow-hidden grid-profile">
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

          {/* Other Resources Uploaded by User */}
        </div>
        <div>
          <h1 className="text-[2.2rem]">Resources Uploaded by {userInfo?.fullname} </h1>
          <div>
            {resourcesByUser?.map((resource: IResource) => (
              <Link
                className="flex flex-col md:flex-row w-full gap-2 mt-4 border border-gray-600 rounded-2xl p-4"
                href={`/addresource?isEdit=true&resourceId=${resource?.id}`}
                key={resource.id}
              >
                <div className="w-full md:w-24">
                  <img
                    className="w-full h-24 rounded-2xl object-cover"
                    src={resource?.thumbnail}
                    alt={resource?.title}
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-white font-semibold text-[18px]">{resource?.title}</h1>
                  <p className="w-full">{getShortDescription(resource?.description)}</p>
                  <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4">
                    <div>
                      <h1 className="text-white ">Subject Area</h1>
                      <p>{resource?.subjectArea}</p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-700"></div>
                    <div>
                      <h1 className="text-white">Posted</h1>
                      <p>{calculateTimeAgo(new Date(resource?.createdAt))}</p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-700"></div>
                    <div>
                      <h1 className="text-white">Views</h1>
                      <p>{resource?.views}</p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-700"></div>
                    <div>
                      <h1 className="text-white">Pages</h1>
                      <p>{resource?.pageNo}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
