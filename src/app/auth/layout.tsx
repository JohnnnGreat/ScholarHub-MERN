import Authentication from "@/components/Authentication";

import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {

  return <Authentication>{children}</Authentication>;
};

export default layout;
