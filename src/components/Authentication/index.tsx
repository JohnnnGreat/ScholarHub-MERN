import React from "react";

const Authentication = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden items-center justify-center bg-[#232932]">
      <div className="grid-auth grid justify-center">
        {/* Logo and Side Text */}
        <div className="hidden md:flex flex-col items-center justify-between w-1/3 h-full bg-white p-10">
          <div className="text-black text-xl golden-font">Scholar Hub</div>
          <button className="border py-5 px-6 rounded-full">Login</button>
        </div>

        {/* Login Form */}
        <div className=" flex overflow-y-auto relative top-0 flex-col items-start justify-start w-full md:w-2/3 border border-[#ffffff3b] p-10 rounded-[3rem] mt-[6rem] mb-[-2rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
