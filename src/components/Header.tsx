"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "@/utils/framermotion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Header = ({ user }: { user: any }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(user);
  const [signInOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    setIsSigningOut(true);
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push("/auth");
    setIsSigningOut(false);
  };
  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="px-[1rem] z-40 fixed top-[.7rem] flex justify-between items-center h-[70px] mx-auto border border-[#76abaea8] b-blur rounded-full w-[400px] md:w-[80%] md:max-w-[1109px]"
      >
        <div className="text-[24px] golden-font ml-[1rem]">Scholar Hub</div>
        <div className="hidden md:flex gap-x-[1rem] items-center">
          <a href="#" className="hover:text-gray-400">
            Discover
          </a>
          <a href="#" className="hover:text-gray-400">
            My Products
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hidden md:md:block bg-[#76ABAE] text-black px-10 py-3 rounded-full hover:bg-teal-700"
          >
            {!signInOut ? "Logout" : <span className="loading loading-dots loading-md"></span>}
          </button>
        ) : (
          <Link
            href="/auth"
            className="hidden md:md:block bg-[#76ABAE] text-black px-10 py-3 rounded-full hover:bg-teal-700"
          >
            Sign Up
          </Link>
        )}

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </motion.div>

      {isOpen && (
        <div className="md:hidden fixed top-16 z-20 mt-[1rem] left-0 right-0 bg-[#222831] backdrop-blur-lg backdrop-opacity-50 rounded-lg mx-4 p-4 w-[100%important]">
          <a href="#" className="block px-2 py-1 hover:text-gray-400">
            Discover
          </a>
          <a href="#" className="block px-2 py-1 hover:text-gray-400">
            My Products
          </a>
          <a href="#" className="block px-2 py-1 hover:text-gray-400">
            About
          </a>
          <a href="#" className="block px-2 py-1 hover:text-gray-400">
            Contact
          </a>
          <button className="w-full mt-2 bg-[#76ABAE] text-black px-4 py-2 rounded-full hover:bg-teal-700">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
