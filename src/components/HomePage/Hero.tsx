"use client";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { navVariants, shakeAnimation, zoomAnimation } from "@/utils/framermotion";
import Link from "next/link";

export default function Hero() {
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

      <div className="text-center mt-24 mb-16">
        <h1 className="golden-font text-grid text-[35px] md:text-6xl lg:[45px] mb-4">
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
