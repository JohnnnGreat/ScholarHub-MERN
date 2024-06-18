"use client";
// import * as Tabs from "@radix-ui/react-tabs";
import { createClient } from "@/utils/supabase/client";

import ProfileSection from "./ProfileSection";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useGetRelatedResearchers } from "@/utils/queries";
import Link from "next/link";
import { Input, Textarea } from "@nextui-org/input";
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MyResource from "./MyResource";
import { INote, IResource, IUser } from "@/types";
import Notice from "./Notice";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/utils/request";

const ProfileMainComponent = ({ userInfo }: { userInfo: IUser }) => {
  const [pageLoading, setPageLoading] = useState(false);
  console.log(userInfo);
  const { data } = useGetRelatedResearchers(userInfo?.researchType, userInfo?.email);
  const researchRe = data as IUser[];

  const noteSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    text: z.string().min(3, "Text must be at least 3 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INote>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = (data: INote) => {
    console.log(data);
  };

  return (
    <>
      {pageLoading ? (
        <div className="h-auto fixed top-0 bottom-0 w-full flex items-center justify-center">
          Loading
        </div>
      ) : (
        <div id="page-p" className="mt-[6rem] max-w-[1100px] mx-auto">
          <div className="p-4">
            <div className="bg-[#1E242C] text-white p-6 rounded-lg">
              <Notice user={userInfo && userInfo} />
              <div className="flex flex-col">
                <Tabs variant="solid" aria-label="Options">
                  <Tab key="photos" title="My Resource">
                    <MyResource email={userInfo?.email} />
                  </Tab>
                  <Tab key="profile" title="Profile">
                    <div className="flex flex-col md:flex-row items-center my-[2rem] gap-x-[2rem] justify-center">
                      <div className="bg-orange-500 rounded-full w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center">
                        <span className="text-4xl md:text-6xl text-white">U</span>
                      </div>
                      <ProfileSection userData={userInfo} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 p-6 rounded-lg bg-[#2a2f38]">
                        <h3 className="text-white text-xl mb-4 golden-font">
                          Researchers with similar Interest
                        </h3>
                        {researchRe?.map((item: IUser) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-[1rem] border-b border-[#ffffff3a] py-[.9rem]"
                          >
                            <div className="w-[40px] h-[40px] rounded-full bg-[#ffffff6b]"></div>
                            <div className="flex justify-between w-full items-center">
                              <div>
                                <h1 className="text-[#EEEEEE]">{item?.fullname}</h1>
                                <div className="text-[#eeeeee81]">
                                  10 publications . 100 followers
                                </div>
                              </div>
                              <Link className="text-[#76abae91]" href="/">
                                View Profile
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-white text-xl">Make Outline</h3>
                        <p className="text-[#ffffff88] text-[13px] golden-font">
                          Make An Outline of your Next Research
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Input
                            type="text"
                            className="mt-[1rem] w-full"
                            variant="bordered"
                            label="Email"
                            {...register("title")}
                          />
                          <p
                            className={`text-red-500 text-[14px] ${
                              errors?.title?.message ? "" : "hidden"
                            }`}
                          >
                            {errors?.title?.message}
                          </p>
                          <Textarea
                            label="Description"
                            variant="bordered"
                            placeholder="Enter your description"
                            disableAnimation
                            disableAutosize
                            classNames={{
                              base: "mt-[1rem] w-full",
                              input: "resize-y min-h-[40px]",
                            }}
                            {...register("text")}
                          />
                          <p
                            className={`text-red-500 text-[14px] ${
                              errors?.text?.message ? "" : "hidden"
                            }`}
                          >
                            {errors?.text?.message}
                          </p>
                          <button
                            type="submit"
                            className="bg-[#76ABAE] w-full py-2 text-white rounded mt-[1rem]"
                          >
                            Done Outlining?
                          </button>
                        </form>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="activity" title="Activity">
                    <div>Tab 2</div>
                  </Tab>
                  <Tab key="analytics" title="Analytics">
                    <div>Tab 2</div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMainComponent;
