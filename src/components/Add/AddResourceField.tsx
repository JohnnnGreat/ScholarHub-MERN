"use client";
import React from "react";
import { Form, Input, DatePicker, Select, message } from "antd";
import { useAddNewResource } from "@/utils/queries";
import { useRouter } from "next/navigation";

import NextCom from "./Nextco";
import { Button } from "@nextui-org/button";

const { Option } = Select;

const AddResourceField = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const {
    mutateAsync: addResourceToDb,
    isPending: isCreatingNewUser,
    isError,
  } = useAddNewResource();

  const onFinish = async (values: any) => {
    const response = await addResourceToDb(values);

    const { data, error } = response;

    if (error) {
      message.error(error);
    }
    await message.success("Saved Successfully");
    return router.push(`addresource/resourceprivacy?resourceId=${data[0].id}`);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="min-h-screen  text-white flex justify-center items-center mt-[5.5rem]">
        <div className="w-full max-w-2xl p-8  rounded">
          <h1 className="text-3xl  golden-font">Add a Paper</h1>
          <p className="text-[#ffffff6c] mb-6">Add the basic meta data about the resource</p>
          <Form
            form={form}
            name="add-paper"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                placeholder="Title of Resource"
                className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Date Published"
                name="datePublished"
                rules={[{ required: true, message: "Please input the date published!" }]}
              >
                <DatePicker className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1 !important] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] " />
              </Form.Item>
              <Form.Item
                label="Subject Area"
                name="subjectArea"
                rules={[{ required: true, message: "Please input the subject area!" }]}
              >
                <Input
                  placeholder="Enter Subject Area"
                  className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
                />
              </Form.Item>
            </div>
            <Form.Item label="Co Authors One" name="coAuthors">
              <Input
                placeholder="Separate Authors with commas"
                className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              />
            </Form.Item>
            <div className="grid grid-cols-3 gap-4">
              <Form.Item label="Page No." name="pageNo">
                <Input
                  type="number"
                  placeholder="Total Pages"
                  className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
                />
              </Form.Item>
              <Form.Item label="Edition" name="edition">
                <Input
                  placeholder="Resource Edition"
                  className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
                />
              </Form.Item>
              <Form.Item label="Parent Organization" name="parentOrganization">
                <Input
                  placeholder="Parent Organization or Institution"
                  className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
                />
              </Form.Item>
            </div>
            <Form.Item label="Description" name="description">
              <Input.TextArea
                placeholder="Write short description or abstract of resource"
                rows={4}
                className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              />
            </Form.Item>
            <Form.Item
              label="Published?"
              name="published"
              rules={[{ required: true, message: "Please select the publication status!" }]}
            >
              <Select placeholder="Is the resource published?">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Resource Type"
              name="resourceType"
              rules={[{ required: true, message: "Please select the resource type!" }]}
            >
              <Select placeholder="Choose your resource type">
                <Option value="article">Article</Option>
                <Option value="book">Book</Option>
                <Option value="thesis">Thesis</Option>
                <Option value="report">Report</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Resource Embedded Note" name="resourceEmbeddedNote">
              <Input
                placeholder="Enter any futher embedded notes"
                className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={isCreatingNewUser && true}
                className="disabled:bg-[#8dcccf] block py-5 rounded-[10px] px-5 w-full bg-[#76ABAE] flex justify-center items-center text-[16px]"
              >
                {!isCreatingNewUser ? (
                  "Continue"
                ) : (
                  <span className="loading loading-dots loading-md"></span>
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <NextCom /> */}
    </div>
  );
};

export default AddResourceField;
