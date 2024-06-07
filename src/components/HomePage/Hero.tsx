"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { navVariants, shakeAnimation, zoomAnimation } from "@/utils/framermotion";
import Link from "next/link";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="py-[1rem] px-[.6rem] md:px-0 bg-[#222831] h-screen text-white flex items-center justify-center">
      <svg
        width="600"
        height="681"
        viewBox="0 0 700 781"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 opacity-10 md:opacity-100"
      >
        <g filter="url(#filter0_f_4_3)">
          <circle cx="86.5" cy="324.5" r="313.5" fill="#5A93E9" fill-opacity="0.24" />
        </g>
        <defs>
          <filter
            id="filter0_f_4_3"
            x="-527"
            y="-289"
            width="1227"
            height="1227"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_4_3" />
          </filter>
        </defs>
      </svg>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="px-[1rem] z-40 fixed top-[1rem] flex justify-between items-center h-[70px] mx-auto border border-[#76abaea8] bg-[#ffffff0c] backdrop-blur-2xl backdrop-opacity-50 rounded-full w-[400px] md:w-[80%] md:max-w-[1109px]"
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
        <Link
          href="/auth"
          className="hidden md:md:block bg-[#76ABAE] text-black px-10 py-3 rounded-full hover:bg-teal-700"
        >
          Sign Up
        </Link>
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
        <div className="md:hidden fixed top-16 z-20 mt-[1rem] left-0 right-0 bg-[#222831] backdrop-blur-lg backdrop-opacity-50 rounded-lg mx-4 p-4">
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
      <div className="text-center mt-24 mb-16">
        <h1 className="golden-font text-[35px] md:text-6xl lg:[45px] mb-4">
          Connecting <span className="text-[#76ABAE]">researchers</span>,<br />
          powering <span>discoveries</span>
        </h1>
        <p className=" mx-auto font-light text-[16px] md:text-[18px] mb-10 w-full md:w-[70%] text-[#ffffffbd]">
          Unlock the power of a vibrant global community of researchers, scholars, and innovators.
          ScholarHub is your gateway to a world of groundbreaking discoveries, collaboration, and
          knowledge-sharing.
        </p>
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-[.7rem] justify-center flex-wrap mt-[.2rem] md:mt-[4rem] md:w-[800px]">
          <div className="bg-gray-800 px-12 py-3 border border-[#76abae79] rounded-full flex items-center">
            <motion.span animate="shake" variants={shakeAnimation} className="mr-2">
              🔍
            </motion.span>{" "}
            Discover
          </div>
          <div className="hidden md:inline-block bg-gray-800 px-12 py-3 border border-[#76abae79] rounded-full items-center">
            <motion.span animate="zoom" variants={zoomAnimation} className="mr-2">
              📢
            </motion.span>{" "}
            Showcase
          </div>
          <div className="bg-gray-800 px-12 py-3 border border-[#76abae79] rounded-full hover:bg-gray-700 flex items-center">
            <span className="mr-2">🤝</span> Collaborate
          </div>
        </div>
      </div>
    </div>
  );
}
