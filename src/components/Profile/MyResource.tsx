"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";
import { Pagination } from "antd";

const MyResource = ({ email }: { email: string }) => {
  const [resources, setResources] = useState<any[] | any>([]);
  const [total, setTotal] = useState<number | any>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const PAGE_SIZE = 6;

  const fetchData = async (page: number) => {
    setLoading(true);
    const supabase = createClient();
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("Resource")
      .select("*", { count: "exact" })
      .eq("uploadBy", email)
      .range(from, to);
    console.log(data, count);
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setResources(data);
      setTotal(count);
    }
    setLoading(false);
  };

  const supabase = createClient();
  useEffect(() => {
    const channels = supabase
      .channel("custom-filter-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "User" }, async (payload) => {
        console.log(payload);
        fetchData(currentPage);
      })
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [supabase]);

  const handlePageChange = (page: any) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-300 mb-6">Your Resource</h1>
      {loading ? (
        <div className="text-center text-gray-300">Loading...</div>
      ) : (
        resources.map((resource: any) => <ResourceCard key={resource.id} resource={resource} />)
      )}
      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MyResource;
