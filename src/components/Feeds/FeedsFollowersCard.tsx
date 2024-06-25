import { Avatar as AntAvatar, Image } from "antd";
import { Menu, Dropdown } from "antd";
import {
  BookOutlined,
  CommentOutlined,
  LikeOutlined,
  FileSearchOutlined,
  MoreOutlined,
  HeartOutlined,
  StarOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const getShortDescription = (description: string, maxLength = 400) => {
  if (description?.length <= maxLength) return description;
  return `${description?.substring(0, maxLength)}...`;
};
export default function FeedsFollowersCard({ resourceInfo }: any) {
  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case "save":
        console.log("Save post for later");
        break;
      case "comment":
        console.log("Comment on post");
        break;
      case "like":
        console.log("Like post");
        break;
      case "request":
        console.log("Request for post");
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="save" icon={<BookOutlined />}>
        Save post for later
      </Menu.Item>
      <Menu.Item key="comment" icon={<CommentOutlined />}>
        Comment on post
      </Menu.Item>
      <Menu.Item key="like" icon={<LikeOutlined />}>
        Like post
      </Menu.Item>
      <Menu.Item key="request" icon={<FileSearchOutlined />}>
        Request for post
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="p-[1.5rem] bg-[#2D3440] inline-block rounded-[10px] mb-[1rem] w-full">
      <div className=" sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto  rounded-lg overflow-hidden ">
        <div>
          <div className="flex items-center mb-4 gap-3">
            <AntAvatar
              style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }}
              size={50}
              className="w-[100px]"
              src={resourceInfo?.userInfo?.profileUrl}
            >
              {resourceInfo?.fullname?.slice(0, 2)}
            </AntAvatar>
            <div>
              <h2 className="text-white font-semibold text-sm sm:text-base">
                {resourceInfo?.userInfo?.fullname} | {resourceInfo?.userInfo?.institutionName}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                {resourceInfo?.followers ? JSON.parse(resourceInfo?.followers).length : 0} followers
              </p>
            </div>
            <button className="ml-auto text-gray-400">
              <Dropdown overlay={menu}>
                <MoreOutlined className="cursor-pointer" color="#ffff" />
              </Dropdown>
            </button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">{resourceInfo?.title}</h1>
          <p className="text-gray-300 mb-4 text-sm sm:text-base">
            {getShortDescription(resourceInfo?.description, 200)}
          </p>
          <Link className="hover:text-gray-400" href={`/resource/${resourceInfo.id}`}>
            View Resource
          </Link>
        </div>
        <Image
          height={300}
          width={"100%"}
          className="object-cover rounded-[10px] w-[100!important] mt-7"
          alt="Resource Thumbnail"
          src={resourceInfo?.thumbnail}
          fallback="data:image/png;base64,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"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-400 hover:text-white">
            <HeartOutlined className="mr-1" />
            <span>Like</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-white">
            <StarOutlined className="mr-1" />
            <span>Favorite</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-white">
            <ShareAltOutlined className="mr-1" />
            <span>Share</span>
          </button>
        </div>
        <button className="flex items-center text-gray-400 hover:text-white">
          <DownloadOutlined className="mr-1" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}
