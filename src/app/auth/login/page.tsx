import React from "react";
import { Login } from "@/components/Authentication/Login";
import { createClient } from "@/utils/supabase/server";

const RegisterPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Login />
    </div>
  );
};

export default RegisterPage;
