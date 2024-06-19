import Register from "@/components/Authentication/Register";
import { Metadata } from "next";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Get Started By Creating a new Account",
};
const RegisterPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/profile");
  }
  return <Register />;
};

export default RegisterPage;
