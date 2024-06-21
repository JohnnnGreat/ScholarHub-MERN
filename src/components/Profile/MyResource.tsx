"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";
import { Pagination, divider } from "@nextui-org/react";
import { IResource } from "@/types";
import { message } from "antd";
import Link from "next/link";

const MyResource = ({ email }: { email?: string }) => {
  const supabase = createClient();
  const [resources, setResources] = useState<IResource[]>([]);
  const [total, setTotal] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const PAGE_SIZE = 7;

  const fetchData = async (page: number) => {
    setLoading(true);
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("Resource")
      .select("*", { count: "exact" })
      .range(from, to)
      .eq("uploadBy", email);

    console.log(error);
    if (error) {
      message.error("Error Fetching Resoure");
    } else {
      setResources(data);
      setTotal(count);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const subscribeToChanges = () => {
    const channels = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "Resource" }, (payload) => {
        fetchData(currentPage);
      })
      .subscribe();

    return channels;
  };
  useEffect(() => {
    subscribeToChanges();

    return () => {
      subscribeToChanges().unsubscribe();
    };
  }, [subscribeToChanges]);
  return (
    <div>
      <div className="flex justify-end  my-[.8rem]">
        <Link
          href="/addresource"
          className="bg-[#76ABAE] rounded-md text-black py-[.8rem] px-[1rem]"
        >
          Add a New Resource
        </Link>
      </div>

      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <div>
          {resources.map((item) => (
            <ResourceCard resource={item} />
          ))}
        </div>
      )}

      <Pagination
        total={Math.ceil(total ? total / PAGE_SIZE : 0)}
        initialPage={currentPage}
        onChange={handlePageChange}
        className="mt-[20px]"
      />
    </div>
  );
};

export default MyResource;
