import { IUser } from "@/types";
import { BookOutlined, EditOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Link from "next/link";
import React from "react";

/* =================== PROFILE SECTION COMPONENT ==================== */

const ProfileSection = ({ userProfileInformation }: { userProfileInformation: IUser }) => {
  return (
    <div>
      <h2 className="text-[40px] golden-font text-white flex items-center text-center w-full md:text-left">
        {userProfileInformation?.fullname}
        <Tooltip title="Edit Profile">
          <Link
            href={`/editprofile?userId=${userProfileInformation?.id}`}
            className="ml-2 text-[20px] text-white"
          >
            <EditOutlined size={10} />
          </Link>
        </Tooltip>
      </h2>
      <p className="text-[#ffffff88] text-[16px] flex  mt-[.7rem] max-w-[500px]">
        <BookOutlined className="mr-2" />
        {userProfileInformation?.bio}
      </p>
      <p className="flex items-center text-[#ffffff88] text-[16px] mt-[.7rem]">
        <MailOutlined className="mr-2" />
        {userProfileInformation?.email}
      </p>
      <p className="flex items-center text-[#ffffff88] text-[16px] mt-[.7rem] ">
        <SettingOutlined className="mr-2" />
        {userProfileInformation?.researchType}
      </p>
      <div className="flex space-x-2 mt-2">
        <div className="py-2 px-6 rounded-full border border-[#76abaea1] text-[#ffffff88]">
          Science
        </div>
        <div className="py-2 px-6 rounded-full border border-[#76abaea1]">Science</div>
        <div className="py-2 px-6 rounded-full border border-[#76abaea1]">Science</div>
      </div>
    </div>
  );
};

export default ProfileSection;
