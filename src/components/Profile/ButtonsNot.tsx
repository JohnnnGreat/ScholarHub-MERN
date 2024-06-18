"use client";
import { IUser } from "@/types";
import { useHandleUpdate } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ButtonsNot = ({ userD }: { userD: IUser }) => {
  const router = useRouter();

  const handleUpdate = async () => {
    const supabase = createClient();
    const response = await supabase
      .from("User")
      .update({ onboardingSet: true })
      .eq("id", userD?.id);

    return response;
    // return router.push(`/auth/researchtype?userId=${id}`);
  };
  return (
    <div>
      <button className="btn btn-sm font-light">Deny</button>
      <Link
        href={`/researchtype?userId=${userD?.id}`}
        className="btn btn-sm btn-primary font-light"
      >
        Click to Set
      </Link>
    </div>
  );
};

export default ButtonsNot;
