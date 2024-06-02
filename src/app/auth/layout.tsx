import Authentication from "@/components/Authentication";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Authentication>{children}</Authentication>;
};

export default layout;
