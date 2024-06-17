import React from "react";
import { Layout, Menu, Avatar, Button, Input, Tag, Tooltip, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileSection from "./ProfileSection";
import MyResource from "./MyResource";
const { TextArea } = Input;

const TabsComponent = ({ userInfo }: { userInfo: any }) => {
  return (
    <Tabs defaultActiveKey="1" type="card">
      <Tabs.TabPane tab="My Resource" key="1">
        <MyResource email={userInfo?.email} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Profile" key="2">
        <div className="flex items-center my-[2rem]  flex-wrap md:flex-nowrap justify-center">
          <Avatar size={200} icon={<UserOutlined />} className="bg-orange-500 mr-4" />
          <ProfileSection userData={userInfo} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-white text-xl mb-4 golden-font">
              Researchers with similar Interest
            </h3>
            <div>
              {/* {relatedUsers.map((researcher: any, index: number) => (
              <div
                key={index}
                className="flex items-center mb-4 bg-[#222831] p-4 rounded-[10px]"
              >
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  className="bg-gray-500 mr-4"
                />
                <div>
                  <h4 className="text-white">{researcher.fullname}</h4>
                  <p className="text-gray-400">
                    {!researcher.publications && 0} Publications,{" "}
                    {!researcher.followers && 0} followers
                  </p>
                  <Link href={`/profile?id=${researcher?.id}`} className="text-blue-500">
                    View Profile
                  </Link>
                </div>
              </div>
            ))} */}
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-white text-xl ">Make Outline</h3>
            <p className="text-[#ffffff88] text-[13px]">Make An Outline of your Next Research</p>
            <Input
              placeholder="Title"
              className="mb-4 mt-3 py-[.7rem] placeholder:text-[#ffffffaf] border-[#ffffff5b]"
            />
            <TextArea
              placeholder="Outline"
              rows={4}
              className="mb-4 bg-transparent placeholder:text-white border-[#ffffff5b] focus:bg-transparent"
            />
            <Button type="primary" className="bg-[#76ABAE!important] " block>
              Done Outlining?
            </Button>
          </div>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Activity" key="3">
        {/* Content for Activity */}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Analytics" key="4">
        {/* Content for Analytics */}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TabsComponent;
