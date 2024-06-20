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
  }, [userSub]);
  const subscribeToChanges = () => {
    const channels = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "User" }, (payload) => {
        console.log("updated", payload);
        fetchUserInfo(user?.email).then((res) => {
          setUserSub(res);
        });
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

  return (
    <>
      {!userSub?.onboardingSet && (
        <div
          role="alert"
          className="alert flex flex-wrap items-center mb-[1rem] md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="flex-1 md:text-left">Hi {user?.fullname} Your info isnt set yet!</span>
          </div>
          <div className="mt-2 md:mt-0 md:flex md:items-center">
            <button className="btn btn-sm font-light mr-2">Deny</button>
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
