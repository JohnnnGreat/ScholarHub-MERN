import FeedComponentIndex from "@/components/Feeds";
import { getUserInfo, handleTwoViewCounts } from "@/utils/request";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const FeedPage = async () => {
  const res = await handleTwoViewCounts();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userInfo = await getUserInfo(user?.email);

  return <FeedComponentIndex resInfo={res} userInfo={userInfo} />;
};

export default FeedPage;
