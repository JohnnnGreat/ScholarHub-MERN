import Register from "@/components/Authentication/Register";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Get Started By Creating a new Account",
};
const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
