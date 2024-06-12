import ProfileMainComponent from "@/components/Profile/ProfileMainComponent";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const ProfilePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function getData() {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("email", user?.email)
      .single();
    return data;
  }

  const channels = supabase
    .channel("custom-filter-channel")
    .on("postgres_changes", { event: "*", schema: "public", table: "User" }, async (payload) => {
      console.log(payload);
      await getData();
    })
    .subscribe();

  return <ProfileMainComponent userEmail={user?.email} />;
};

export default ProfilePage;
