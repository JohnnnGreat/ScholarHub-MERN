"use client";
import { containerVariants, interceptConfigs, itemVariants } from "@/utils/framermotion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function FeaturedResearch() {
  const [ref, inView] = useInView({ ...interceptConfigs, threshold: 0.4 });
  return (
    <section className="py-16 bg-[#222831] relative">
      <div className="absolute w-full h-full flex items-center justify-center">
        <svg
          width="1198"
          height="930"
          viewBox="0 0 1198 930"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_5_19)">
            <circle cx="584.5" cy="411.5" r="313.5" fill="#5A93E9" fill-opacity="0.12" />
          </g>
          <defs>
            <filter
              id="filter0_f_5_19"
              x="-29"
              y="-202"
              width="1227"
              height="1227"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_5_19" />
            </filter>
          </defs>
        </svg>
      </div>
      <svg
        width="315"
        height="314"
        viewBox="0 0 315 314"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <line
          x1="19.0605"
          y1="-41.2293"
          x2="247.495"
          y2="160.863"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
        <line
          x1="-48.3032"
          y1="34.9168"
          x2="180.131"
          y2="237.01"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
        <line
          x1="-40.2294"
          y1="178.469"
          x2="161.863"
          y2="-49.9658"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
        <line
          x1="35.9168"
          y1="245.833"
          x2="238.01"
          y2="17.3979"
          stroke="#76ABAE"
          stroke-opacity="0.12"
        />
      </svg>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center"
          ref={ref}
        >
          <h2 className="text-3xl  text-white sm:text-[48px] golden-font">Featured Research</h2>
          <p className="mt-4 text-[20px] font-light leading-6 text-gray-400">
            Explore the latest, most influential, and thought-provoking research papers,
            publications, and datasets curated by our editorial team.
          </p>
          <a
            href="#"
            className="mt-4 inline-block text-white golden-font hover:text-teal-700 w-full"
          >
            View All Papers
          </a>
        </motion.div>

        <motion.div
          animate="visible"
          variants={itemVariants}
          className="mt-12 grid gap-8 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1"
        >
          {[1, 2].map((item) => (
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              key={item}
              className="bg-[#ffffff0c] backdrop-blur-lg backdrop-opacity-50 rounded-lg p-6 border border-[#76abae57] text-white"
            >
              <h3 className="text-2xl font-semibold golden-font">
                Innovations in Renewable Energy Storage
              </h3>
              <p className="mt-2 text-[#76ABAE]">
                Dr. Sarah Johnson · University of California, Berkeley
              </p>
              <p className="mt-4 text-gray-400">
                Groundbreaking advancements in battery technology are paving the way for a
                sustainable energy future. This study explores novel energy storage solutions that
                could revolutionize the integration of renewable power sources.
              </p>
              <a
                href="#"
                className="mt-6 golden-font inline-block bg-[#eeeeee] w-full text-black px-6 py-5 text-center rounded-[10px] text-[20px] hover:bg-[#e7e7e7]"
              >
                View Paper
              </a>
            </motion.nav>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
