import React from "react";

const Authentication = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#232932]">
      <div className="grid-auth">
        {/* Logo and Side Text */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/3 h-full bg-white p-10">
          <img src="/path/to/logo.png" alt="ScholarHub Logo" className="w-24 mb-4" />
          <div
            // initial={{ y: -100, opacity: 0 }}
            // animate={inView ? { y: 0, opacity: 1 } : {}}
            // transition={{ duration: 0.5 }}
            className="text-black text-xl font-bold"
          >
            Scholar Hub
          </div>
        </div>

        {/* Login Form */}
        <div className="flex flex-col items-center justify-center w-full md:w-2/3 border p-10 rounded-[3rem] mt-[3rem] mb-[-3rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
