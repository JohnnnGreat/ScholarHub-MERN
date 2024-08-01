"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button as AntButton, message, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useUpdateUserInfo } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { IUser } from "@/types";

const supabase = createClient();

/* ===================EDIT PROFILE COMPONENT==================== */
const EditProfileComponent = ({ userData }: { userData: IUser }) => {
  // State for storing the profile image URL
  const [profileImageUrl, setProfileImageUrl] = useState(userData?.profileUrl);
  const router = useRouter();
  const [form] = Form.useForm(); // Form instance from Ant Design
  const { mutateAsync: updateUserInfo, isPending } = useUpdateUserInfo(); // Custom hook for updating user info

  // Effect to set initial form values when userData changes
  useEffect(() => {
    form.setFieldsValue({
      fullname: userData?.fullname,
      bio: userData?.bio,
    });

    // Clear Fields Value when the component is unmounted
    return form.setFieldsValue({
      fullname: "",
      bio: "",
    });
  }, [form, userData]);

  // Handler for successful form submission
  const handleFinish = async (values: any) => {
    try {
      await updateUserInfo({
        id: userData?.id,
        updateInfo: { ...values, profileUrl: profileImageUrl },
      });
      message.success("Profile Updated");
      router.push("/profile");
    } catch (error) {
      message.error("Profile Update Failed");
    }
  };

  // Handler for failed form submission
  const handleFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Custom request handler for file upload
  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    const fileName = `${Date.now()}_${file.name}`; // Generate unique file name
    try {
      const { data, error } = await supabase.storage.from("Files").upload(fileName, file);
      if (error) throw error;

      const resourceFileUrl = supabase.storage.from("Files").getPublicUrl(fileName).data.publicUrl;
      setProfileImageUrl(resourceFileUrl); // Update state with new image URL
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
    <div className="min-h-screen flex justify-center items-center mt-[5.5rem] text-white">
      <div className="w-full max-w-2xl p-8 rounded">
        <h1 className="text-3xl golden-font">Edit Your Profile</h1>
        <hr />
        <Form
          form={form}
          name="add-paper"
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input
              placeholder="Full Name"
              className="mb-0 w-full text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent border-[#ffffff59]"
            />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea
              placeholder="Enter Your Bio"
              rows={4}
              className="mb-0 w-full text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent border-[#ffffff59]"
            />
          </Form.Item>

          <Upload multiple={false} customRequest={handleUpload}>
            <AntButton
              icon={<UploadOutlined />}
              className="w-full bg-[#ffffff18] text-[#ffffff96] py-[2rem!important] flex items-center justify-center border-[#eeeeee54!important] hover:bg-[#ffffff18!important] hover:border-[#76ABAE]"
            >
              Attach Resource File
            </AntButton>
          </Upload>

          <Form.Item>
            <Button
              type="submit"
              isLoading={isPending}
              className="disabled:bg-[#8dcccf] block py-5 rounded-[10px] px-5 w-full bg-[#76ABAE] flex justify-center items-center text-[16px] mt-[1rem]"
            >
              Update
            </Button>
            {profileImageUrl && (
              <img className="w-[200px] mt-[1rem]" src={profileImageUrl} alt="Profile" />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileComponent;
