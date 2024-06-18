import Authentication from "@/components/Authentication";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (user) {
  //   return redirect("/");
  // }
  return <Authentication>{children}</Authentication>;
};

export default layout;
