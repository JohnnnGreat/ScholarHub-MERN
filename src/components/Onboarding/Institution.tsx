"use client";
import React, { useState } from "react";
import { useUpdateResearcherType } from "@/utils/queries";
import { message } from "antd";
import { researcherType } from "../constant";
import { Button, Checkbox, Form, Input } from "antd";

const Institution = () => {
  const onFinish = async () => {};

  const isCreatingNewUser = false;
  return (
    <>
      <div className="w-full">
        <h2 className="text-3xl text-white mb-3 golden-font  text-center">Institution Details</h2>

        <Form
          name="normal_login"
          className="login-form w-full flex flex-col"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="institution"
            rules={[{ required: true, message: "Please enter your institution name" }]}
          >
            <Input
              type="text"
              className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              placeholder="Institution Name"
            />
          </Form.Item>
          <Form.Item
            name="subject"
            rules={[{ required: true, message: "Subject Area is Required" }]}
          >
            <Input
              type="text"
              placeholder="Subject Area"
              className="w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
            />
          </Form.Item>
          <Form.Item name="faculty" rules={[{ required: true, message: "Faculty is Required" }]}>
            <Input
              type="text"
              placeholder="Faculty"
              className="w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isCreatingNewUser}
              className="disabled:bg-[#8dcccf] block py-5 rounded-full px-5 w-full bg-[#76ABAE] flex justify-center items-center text-[16px]"
            >
              {!isCreatingNewUser ? (
                "Complete"
              ) : (
                <span className="loading loading-dots loading-md"></span>
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Institution;
