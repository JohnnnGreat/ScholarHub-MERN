"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, Input, Tag, Tooltip, Tabs } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EditOutlined,
  BookOutlined,
  SettingOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import MyResource from "./MyResource";

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const ProfileMainComponent = ({ userEmail }: any) => {
  const supabase = createClient();
  const [userData, setUserData] = useState<any>(null);
  const [relatedUsers, setRelatedUsers] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", userEmail)
        .single();

      setUserData(data);
    };

    fetchData();

    const channels = supabase
      .channel("custom-filter-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "User" }, async (payload) => {
        console.log(payload);
        fetchData();
      })
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const fetchRelated = async () => {
      console.log(userData?.researchType);
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("researchType", userData?.researchType);

      const relatedResearchers = data?.filter((item: any, index) => {
        return item.email !== userData?.email;
      });
      setRelatedUsers(relatedResearchers);
    };

    fetchRelated();

    const channels = supabase
      .channel("custom-filter-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "User" }, async (payload) => {
        console.log(payload);
        fetchRelated();
      })
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [userData]);

  return (
    <div className="mt-[6rem] max-w-[1100px] mx-auto">
      <Content className="p-4">
        <div className="bg-[#1E242C] text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <Tabs defaultActiveKey="1" type="card">
              <Tabs.TabPane tab="My Resource" key="1">
                <MyResource email={userEmail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Profile" key="2">
                <div className="flex items-center my-[2rem]  flex-wrap md:flex-nowrap justify-center">
                  <Avatar size={200} icon={<UserOutlined />} className="bg-orange-500 mr-4" />
                  <div>
                    <h2 className="text-[40px] golden-font text-white flex items-center text-center w-full md:text-left">
                      {userData?.fullname}
                      <Tooltip title="Edit Profile">
                        <Button type="text" icon={<EditOutlined />} className="ml-2 text-white" />
                      </Tooltip>
                    </h2>
                    <p className="text-[#ffffff88] text-[16px] flex items-center mt-[.7rem] max-w-[500px]">
                      <BookOutlined className="mr-2" />
                      {userData?.bio}
                    </p>
                    <p className="flex items-center text-[#ffffff88] text-[16px] mt-[.7rem]">
                      <MailOutlined className="mr-2" />
                      {userData?.email}
                    </p>
                    <p className="flex items-center text-[#ffffff88] text-[16px] mt-[.7rem] ">
                      <SettingOutlined className="mr-2" />
                      {userData?.researchType}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <div className="py-2 px-6 rounded-full border border-[#76abaea1] text-[#ffffff88]">
                        Science
                      </div>
                      <div className="py-2 px-6 rounded-full border border-[#76abaea1]">
                        Science
                      </div>
                      <div className="py-2 px-6 rounded-full border border-[#76abaea1]">
                        Science
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-white text-xl mb-4 golden-font">
                      Researchers with similar Interest
                    </h3>
                    <div>
                      {relatedUsers.map((researcher: any, index: number) => (
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
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-white text-xl ">Make Outline</h3>
                    <p className="text-[#ffffff88] text-[13px]">
                      Make An Outline of your Next Research
                    </p>
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
          </div>
        </div>
      </Content>
    </div>
  );
};

export default ProfileMainComponent;
