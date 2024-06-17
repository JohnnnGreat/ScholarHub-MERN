import ProfileMainComponent from "@/components/Profile/ProfileMainComponent";
import { getUserInfo } from "@/utils/request";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const ProfilePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userInfo = await getUserInfo(user?.email);
  console.log(userInfo);

  return <ProfileMainComponent userInfo={userInfo} />;
};

export default ProfilePage;
