import Image from "next/image";
import React from "react";
import { Button, Skeleton } from "antd";
import { CalendarOutlined, TeamOutlined, LockOutlined, FileTextOutlined } from "@ant-design/icons";
import SkeletalmageLoading from "../SkeletalmageLoading";
import Link from "next/link";

const FinalComponent = ({ data }: { data: any }) => {
  return (
    <main className=" items-center mt-[6rem] max-w-2xl mx-auto px-8">
      <h1 className="text-[36px] golden-font text-left text-white w-full ">
        Just One Thing Left, Preview!!!
      </h1>
      <p className="text-[#ffffff6c] mb-6">A preview of your resource</p>

      <div className="mt-8 flex bg-[#2E3642]  rounded-[10px] flex-col md:flex-row  p-6 shadow-lg">
        <div className="w-48 s">
          <SkeletalmageLoading url={data?.thumbnail} />
        </div>
        <div className="md:ml-6 mt-6 md:mt-0">
          <h2 className="text-2xl  text-[#76ABAE] golden-font">{data?.title}</h2>

          <p className="text-gray-400 mt-1">
            <TeamOutlined className="mr-2" />
            Dr. Sarah Johnson, University of California, Berkeley
          </p>
          <p className="text-gray-300 mt-4">{data?.notes}</p>

          <div className="flex gap-[.7rem]">
            <p className="text-gray-400 mt-4">
              <LockOutlined className="mr-2" />
              {data?.privacy}
            </p>
            <p className="text-gray-400 mt-4">
              <FileTextOutlined className="mr-2" />
              {data?.pageNo} Pages
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full max-w-3xl text-center">
        <p className="text-left golden-font text-[32px] text-white">This is your File</p>
        <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <iframe className="w-full h-[700px]" src={data?.fileUrl}></iframe>
        </div>
      </div>

      <Link
        href="/profile"
        type="primary"
        className="disabled:bg-[#8dcccf] text-white hover:bg-[#5e898b] block py-4 rounded-[10px] px-5 w-full mt-[1.3rem] bg-[#76ABAE!important] flex justify-center items-center text-[16px]"
      >
        Complete
      </Link>
    </main>
  );
};

export default FinalComponent;
