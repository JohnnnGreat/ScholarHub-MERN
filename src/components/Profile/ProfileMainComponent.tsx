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
import { getRelatedUsers, getUserInfo } from "@/utils/request";
import { welcomeEmail } from "@/utils/request";
import { Avatar } from "antd";

const ProfileMainComponent = ({ userInfo }: { userInfo: IUser }) => {
  const supabase = createClient();
  const [pageLoading, setPageLoading] = useState(false);

  const { data } = useGetRelatedResearchers(userInfo?.researchType, userInfo?.email);
  const researchRe = data as IUser[];
  const [users, setUsers] = useState(researchRe);
  const fetchUserInfo = async (researchType: string | undefined, emailArg: string | undefined) => {
    const userInfoResponse = await getRelatedUsers(researchType, emailArg);
    return userInfoResponse;
  };
  useEffect(() => {
    fetchUserInfo(userInfo?.researchType, userInfo?.email).then((res) => {
      console.log(res);
    });
  }, [users]);

  const subscribeToChanges = () => {
    const channels = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "User" }, (payload) => {
        console.log("updated", payload);

        setUsers(researchRe);
      })
      .subscribe();

    return channels;
  };

  useEffect(() => {
    subscribeToChanges();

    return () => {
      supabase.removeChannel(subscribeToChanges());
    };
  }, [supabase]);

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

  const handleSendEmail = async () => {
    const sendWelcomeEmail = await welcomeEmail(userInfo?.id);
    console.log(sendWelcomeEmail);
  };

  type followersType = string | string[];
  const [userMainFollowers, setUserMainFollowers] = useState(() => {
    try {
      return userInfo?.followers
        ? JSON.parse(userInfo?.followers ? userInfo?.followers : "[]")
        : [];
    } catch (e) {
      console.error("Failed to parse followers", e);
      return [];
    }
  });
  console.log(userMainFollowers);
  const handleFollow = async (email: string, followeeId: string, followeeFollowers: string) => {
    if (!userMainFollowers.includes(email)) {
      const updatedFollowers = [...userMainFollowers, email];
      setUserMainFollowers(updatedFollowers);

      const { data: updateMainUser, error: mainError } = await supabase
        .from("User")
        .update({ followers: JSON.stringify(updatedFollowers) })
        .eq("id", userInfo.id);

      if (mainError) {
        console.error(mainError);
      }

      const followeeFollowersArray = followeeFollowers ? JSON.parse(followeeFollowers) : [];
      if (!followeeFollowersArray.includes(userInfo.email)) {
        const updatedFolloweeFollowers = [...followeeFollowersArray, userInfo.email];
        const { data, error } = await supabase
          .from("User")
          .update({ followers: JSON.stringify(updatedFolloweeFollowers) })
          .eq("id", followeeId);

        if (error) {
          console.error(error);
        }
      }
    } else {
      console.log("Email already follows the user");
    }
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
              <Button onClick={handleSendEmail}>Send Email Notification</Button>
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
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Researchers with Similar Interest */}
                      <div className="col-span-1 md:col-span-2 lg:col-span-2 p-6 rounded-lg bg-[#2a2f38]">
                        <h3 className="text-white text-xl mb-4 golden-font">
                          Researchers with similar Interest
                        </h3>
                        {researchRe?.map((item: IUser) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-[1rem] border-b border-[#ffffff3a] py-[.9rem]"
                          >
                            <Avatar
                              style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }}
                              size={50}
                            >
                              {item?.fullname?.slice(0, 2)}
                            </Avatar>
                            <div className="flex flex-wrap justify-between w-full items-center">
                              <div>
                                <h1 className="text-[#EEEEEE]">{item?.fullname}</h1>
                                <div className="text-[#eeeeee81]">
                                  {item?.noPublications | 0} publications{" "}
                                  {item?.followers ? JSON.parse(item?.followers).length : 0}{" "}
                                  followers
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <Link className="text-[#76abae91]" href={`/user/${item?.id}`}>
                                  View Profile
                                </Link>
                                {!userMainFollowers?.includes(item?.email) ? (
                                  <button
                                    onClick={() =>
                                      handleFollow(item?.email, item?.id, item?.followers)
                                    }
                                  >
                                    Follow
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Make Outline */}
                      <div className="col-span-1 bg-gray-900 p-6 rounded-lg">
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
