import React from "react";
import { Login } from "@/components/Authentication/Login";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
const RegisterPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/profile");
  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default RegisterPage;
