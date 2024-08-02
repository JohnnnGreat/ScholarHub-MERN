import UserComponent from "@/components/User";
import { createClient } from "@/utils/supabase/server";

import { headers } from "next/headers";
import React from "react";

const UserPage = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  const userId = urlObject?.searchParams?.get("userId") || "";
  const supabase = createClient();
  // Fetch the User Information from supabase
  const { data, error } = await supabase.from("User").select("*").eq("id", userId).single();

  // Get All resources Uploaded By the User
  const { data: resources, error: errorFetchingResources } = await supabase
    .from("Resource")
    .select("*")
    .eq("uploadBy", data?.email);
  return <UserComponent userId={userId} userInfo={data} resourcesByUser={resources} />;
};

export default UserPage;
