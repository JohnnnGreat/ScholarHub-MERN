"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "@/utils/framermotion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { Avatar } from "@nextui-org/react";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
const Header = ({ user, userInfo }: { user: boolean; userInfo: any }) => {
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

  const handleClick = (key: any) => {
    if (key === "profile") {
      console.log(key);
      router.push("/profile");
    } else if (key === "logout") {
      handleLogout();
    }
  };

  return (
    <div className="w-full flex  justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="px-[1rem] z-40 gap-[1rem] fixed top-[.7rem] flex justify-between items-center h-[70px] mx-auto border border-[#76abaea8] b-blur rounded-full w-[400px] md:w-[80%] md:max-w-[1109px]"
      >
        <Link
          href="/"
          className="flex-grow md:flex-grow-0 text-[24px] head-f golden-font ml-[1rem]"
        >
          Scholar Hub
        </Link>
        <div className="hidden md:flex gap-x-[1rem] items-center">
          <Link href="#" className="hover:text-gray-400">
            Discover
          </Link>
          <Link href="#" className="hover:text-gray-400">
            My Products
          </Link>
          <Link href="#" className="hover:text-gray-400">
            About
          </Link>
          <Link href="#" className="hover:text-gray-400">
            Contact
          </Link>
        </div>
        {isAuthenticated ? (
          <Dropdown backdrop="opaque">
            <DropdownTrigger>
              <Avatar
                className="cursor-pointer"
                isBordered
                showFallback
                name={userInfo?.fullname?.slice(0, 2)}
                src="https://images.unsplash.com/broken"
                as="button"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key) => {
                handleClick(key);
              }}
              variant="faded"
            >
              <DropdownItem
                key="profile"
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                }
              >
                My Profile
              </DropdownItem>

              <DropdownItem
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                }
                key="logout"
                className="text-danger"
                color="danger"
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
          <Link href="#" className="block px-2 py-1 hover:text-gray-400">
            Discover
          </Link>
          <Link href="#" className="block px-2 py-1 hover:text-gray-400">
            My Products
          </Link>
          <Link href="#" className="block px-2 py-1 hover:text-gray-400">
            About
          </Link>
          <Link href="#" className="block px-2 py-1 hover:text-gray-400">
            Contact
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hidden md:md:block bg-[#76ABAE] text-black px-10 py-3 rounded-full hover:bg-teal-700"
            >
              {signInOut ? "Logout" : <span className="loading loading-dots loading-md"></span>}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
