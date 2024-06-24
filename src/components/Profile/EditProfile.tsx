"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Upload,
  Button as AntButton,
  notification,
} from "antd";
import { useUpdateUserInfo } from "@/utils/queries";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/button";

import { IResource, IUser } from "@/types";
import { UploadOutlined } from "@ant-design/icons";
import { createClient } from "@/utils/supabase/client";

const EditProfileComponent = ({ userData }: { userData: IUser }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutateAsync: updateUserInfo, isPending } = useUpdateUserInfo();
  const onFinish = async (values: any) => {
    const response = await updateUserInfo({ id: userData?.id, updateInfo: values });
    message.success("Profile Updated");
    router.push("/profile");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      fullname: userData?.fullname,
      bio: userData?.bio,
    });
  }, [form, userData]);

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const handleProfileFileChange = (info: any) => {
    if (info.file.status === "done") {
      console.log(info.file.originFileObj);
      notification.success({
        message: `${info.file.name} file uploaded successfully`,
      });
    } else if (info.file.status === "error") {
      notification.error({
        message: `${info.file.name} file upload failed.`,
      });
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const fileName = `${Date.now()}_${file.name}`;
    const supabase = createClient();
    try {
      const { data, error } = await supabase.storage
        .from("Files") // replace with your bucket name
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      const resourceFileUrl = supabase.storage.from("Files").getPublicUrl(fileName).data.publicUrl;
      console.log(resourceFileUrl);
      onSuccess(data);
      notification.success({
        message: `${file.name} file uploaded successfully`,
      });
    } catch (error) {
      onError(error);
      notification.error({
        message: `${file.name} file upload failed.`,
      });
    }
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
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                placeholder="Full Name"
                className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              />
            </Form.Item>

            <Form.Item label="Bio" name="bio">
              <Input.TextArea
                placeholder="Enter Your Bio"
                rows={4}
                className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="submit"
                isLoading={isPending}
                className="disabled:bg-[#8dcccf] block py-5 rounded-[10px] px-5 w-full bg-[#76ABAE] flex justify-center items-center text-[16px]"
              >
                Update
              </Button>
            </Form.Item>

            <Upload
              multiple={false}
              customRequest={customRequest}
              onChange={handleProfileFileChange}
            >
              <AntButton
                icon={<UploadOutlined />}
                className="w-full bg-[#ffffff18] text-[#ffffff96] py-[2rem!important] flex items-center justify-center border-[#eeeeee54!important] hover:bg-[#ffffff18!important] hover:border-[#76ABAE]"
              >
                Attach Resource File
              </AntButton>
            </Upload>
          </Form>
        </div>
      </div>
      {/* <NextCom /> */}
    </div>
  );
};

export default EditProfileComponent;
