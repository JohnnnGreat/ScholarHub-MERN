import EditProfileComponent from "@/components/Profile/EditProfile";
import { getUserInfo } from "@/utils/request";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import React from "react";

const EditProfile = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);
  const postId = urlObject?.searchParams?.get("resourceId") || "";

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userInfo = await getUserInfo(user?.email);
  
  return <EditProfileComponent userData={userInfo} />;
};

export default EditProfile;
