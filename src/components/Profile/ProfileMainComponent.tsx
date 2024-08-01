"use client";

// Import necessary modules and components
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileSection from "./ProfileSection";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useGetRelatedResearchers } from "@/utils/queries";
import Link from "next/link";
import { Input, Textarea } from "@nextui-org/input";
import MyResource from "./MyResource";
import Notice from "./Notice";
import { getRelatedUsers, welcomeEmail } from "@/utils/request";
import { Avatar as AntAvatar, message } from "antd";
import { INote, IUser } from "@/types";
import { noteSchema } from "@/utils/schema";

/* =================== PROFILE MAIN COMPONENT: WRAPPER COMPONENT ==================== */

const ProfileMainComponent = ({ userInfo }: { userInfo: IUser }) => {
  // 1. Initialize Supabase client
  // 2. State to manage loading status
  // 3. Fetch related researchers data
  // 4. State to manage list of related users
  // 5. Fetch related user information based on research type and email
  // 6. Function to subscribe to database changes
  // 7. Initialize form handling with react-hook-form
  const supabase = createClient();
  const [pageLoading, setPageLoading] = useState(false);
  const { data } = useGetRelatedResearchers(userInfo?.researchType, userInfo?.email);
  const researchRe = data as IUser[];
  const [users, setUsers] = useState(researchRe);
  const fetchUserInfo = async (researchType: string | undefined, emailArg: string) => {
    const userInfoResponse = await getRelatedUsers(researchType, emailArg);
    return userInfoResponse;
  };
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INote>({
    resolver: zodResolver(noteSchema),
  });

  // Effect to fetch user information when `users` state changes
  useEffect(() => {
    fetchUserInfo(userInfo?.researchType, userInfo?.email).then((res) => {
      console.log(res);
    });
  }, [users]);

  // Effect to subscribe and clean up subscription to database changes
  useEffect(() => {
    const channels = subscribeToChanges();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase]);

  // Handle note form submission
  const onSubmit = (data: INote) => {
    console.log(data);
  };

  // Handle sending welcome email
  const handleSendEmail = async () => {
    const sendWelcomeEmail = await welcomeEmail(userInfo?.id);
    console.log(sendWelcomeEmail);
  };

  // State to manage user followers
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

  // Handle follow functionality
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
          message.error(error?.message);
        }
      }
    } else {
      message.error("Email already follows the user");
    }
  };

  return (
    <>
      {pageLoading ? (
        <div className="h-auto fixed top-0 bottom-0 w-full flex items-center justify-center">
          Loading
        </div>
      ) : (
        <div id="page-p" className="overflow-hidden relative mt-[6rem] max-w-[1100px] mx-auto">
          <div className="md:p-4">
            <div className="bg-[#1E242C] text-white p-2 md:p-5 rounded-lg">
              <Button onClick={handleSendEmail}>Send Email Notification</Button>
              <Notice user={userInfo} />
              <div className="flex flex-col">
                <Tabs variant="solid" aria-label="Options">
                  <Tab key="photos" title="My Resource">
                    <MyResource email={userInfo?.email} />
                  </Tab>
                  <Tab key="profile" title="Profile">
                    <div className="flex flex-col md:flex-row items-center my-[2rem] gap-x-[2rem] justify-center">
                      <AntAvatar
                        style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }}
                        src={userInfo?.profileUrl}
                        size={200}
                      >
                        {userInfo?.fullname?.slice(0, 2)}
                      </AntAvatar>
                      <ProfileSection userProfileInformation={userInfo} />
                    </div>
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <svg
                        width="1198"
                        height="930"
                        viewBox="0 0 1198 930"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_f_5_19)">
                          <circle
                            cx="584.5"
                            cy="411.5"
                            r="313.5"
                            fill="#5A93E9"
                            fillOpacity="0.12"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_f_5_19"
                            x="-29"
                            y="-202"
                            width="1227"
                            height="1227"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feGaussianBlur
                              stdDeviation="150"
                              result="effect1_foregroundBlur_5_19"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Researchers with Similar Interest */}
                      <div className="col-span-1 md:col-span-2 lg:col-span-2 border p-6 rounded-[10px] border-[#76abae86] b-blur">
                        <h3 className="text-white text-xl mb-4 golden-font">
                          Researchers with similar Interest
                        </h3>
                        {researchRe?.map((item: IUser) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-[1rem] border-b border-[#ffffff3a] py-[.9rem]"
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
                                <h1 className="text-[#EEEEEE] product-font">{item?.fullname}</h1>
                                <div className="text-[#eeeeee81]">
                                  <p>
                                    {item?.noPublications | 0} publications{" "}
                                    {item?.followers ? JSON.parse(item?.followers).length : 0}{" "}
                                    followers
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
