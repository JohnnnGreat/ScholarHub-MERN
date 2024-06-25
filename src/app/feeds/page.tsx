import FeedComponentIndex from "@/components/Feeds";
import { handleTwoViewCounts } from "@/utils/request";
import React from "react";

const FeedPage = async () => {
  const res = await handleTwoViewCounts();
  return <FeedComponentIndex resInfo={res} />;
};

export default FeedPage;
