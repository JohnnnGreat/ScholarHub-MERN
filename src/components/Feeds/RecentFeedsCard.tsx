// import modules
import React from "react";
import { Avatar as AntAvatar } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Menu, Dropdown } from "antd";
import { DeleteOutlined, StarOutlined, DownOutlined } from "@ant-design/icons";

const RecentFeedsCard = ({ resourceInfo }: any) => {
  const handleMenuClick = (e: any) => {
    if (e.key === "delete") {
      // Handle delete action
      console.log("Delete action triggered");
    } else if (e.key === "favorite") {
      // Handle add to favorite action
      console.log("Add to favorite action triggered");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
      <Menu.Item key="favorite" icon={<StarOutlined />}>
        Add to Favorite
      </Menu.Item>
    </Menu>
  );
  return (
    <Link
      href={`/resource/${resourceInfo.id}`}
      className="p-[1rem] bg-[#2D3440] inline-block rounded-[10px] mb-[1rem] w-full "
    >
      <div>
        <div className="flex justify-between">
          {resourceInfo?.privacy === "public" ? (
            <p className="bg-[#366531] text-[#52FF00] py-[.5rem] px-[1rem] text-[12px] rounded-full">
              PDF AVAILABLE
            </p>
          ) : (
            <p>PDF ON REQUEST</p>
          )}
          <Dropdown overlay={menu}>
            <MoreOutlined className="cursor-pointer" color="#ffff" />
          </Dropdown>
        </div>
        <h1 className="golden-font text-[#76ABAE] text-[20px] mt-[.9rem]">{resourceInfo?.title}</h1>
        <p className="text-[#ffffff4f] text-[13px]">Posted By</p>
        <div className="flex gap-[1rem] mt-[.8rem] items-center">
          <AntAvatar
            style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }}
            size={50}
            className="w-[100px]"
            src={resourceInfo?.userInfo?.profileUrl}
          >
            {resourceInfo?.fullname?.slice(0, 2)}
          </AntAvatar>
          <div className="flex-1">
            <h1 className="text-[#EEEEEE] product-font">{resourceInfo?.userInfo?.fullname}</h1>
            <p className="text-[#ffffff54]">
              {JSON.parse(resourceInfo?.userInfo?.followers).length} followers
            </p>
          </div>
          <Button>Download</Button>
        </div>
      </div>
    </Link>
  );
};

export default RecentFeedsCard;
