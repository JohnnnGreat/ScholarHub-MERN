import React from "react";

const Authentication = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden items-center justify-center bg-[#232932]">
      <div className="grid-auth">
        {/* Logo and Side Text */}
        <div className="hidden md:flex flex-col items-center justify-between w-1/3 h-full bg-white p-10">
          <div
            // initial={{ y: -100, opacity: 0 }}
            // animate={inView ? { y: 0, opacity: 1 } : {}}
            // transition={{ duration: 0.5 }}
            className="text-black text-xl golden-font"
          >
            Scholar Hub
          </div>
          <button className="border py-5 px-6 rounded-full">Login</button>
        </div>

        {/* Login Form */}
        <div className="flex flex-col items-center justify-center w-[400px] md:w-2/3 border border-[#ffffff3b] p-10 rounded-[3rem] mt-[3rem] mb-[-2rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
