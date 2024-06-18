import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/auth");
  // }
  return <div>{children}</div>;
};

export default layout;
