"use client";
import React, { useEffect, useState } from "react";
import ButtonsNot from "./ButtonsNot";
import { IUser } from "@/types";
import { getUserInfo } from "@/utils/request";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const Notice = ({ user }: { user: IUser | undefined }) => {
  const supabase = createClient();

  const [userSub, setUserSub] = useState<IUser | null>(null);
  const fetchUserInfo = async (emailArg: string | undefined) => {
    const userInfoResponse = await getUserInfo(emailArg);
    return userInfoResponse;
  };
  useEffect(() => {
    fetchUserInfo(user?.email).then((res) => {
      setUserSub(res);
    });
  }, []);
  const subscribeToChanges = () => {
    const channels = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "User" }, (payload) => {
        console.log(payload);
        fetchUserInfo(user?.email).then((res) => {
          setUserSub(res);
        });
      })
      .subscribe();

    return channels;
  };

  console.log(subscribeToChanges());

  useEffect(() => {
    subscribeToChanges();

    return () => {
      subscribeToChanges().unsubscribe();
    };
  }, [subscribeToChanges]);

  const handleUpdate = async () => {
    const supabase = createClient();
    console.log(userSub);
    const response = await supabase
      .from("User")
      .update({ onboardingSet: true })
      .eq("id", userSub?.id);

    return response;
    // return router.push(`/auth/researchtype?userId=${id}`);
  };

  return (
    <>
      {!userSub?.onboardingSet && (
        <div role="alert" className="alert flex items-center mb-[1rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="flex-1">Hi {user?.fullname} Your info isnt set yet!</span>
          <div>
            <button className="btn btn-sm font-light">Deny</button>
            <Link
              href={`/auth/researchtype?userId=${userSub?.id}`}
              className="btn btn-sm btn-primary font-light"
            >
              Click to Set
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Notice;
