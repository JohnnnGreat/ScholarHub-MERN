"use client";
import React from "react";
import { useState } from "react";
import { Upload, Button, message, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { useUpdateFile } from "@/utils/queries";
import { useRouter } from "next/navigation";

const DisplayImageComponent = ({ id }: { id: string }) => {
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [resourceFile, setResourceFile] = useState<any>(null);
  const router = useRouter();
  const { mutateAsync: uploadFile, isPending: isCreatingNewUser, isError } = useUpdateFile();

  const handleThumbnailChange = (info: any) => {
    if (info.file.status === "done") {
      setThumbnail(info.file.originFileObj);
      notification.success({
        message: `${info.file.name} file uploaded successfully`,
      });
      // message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      notification.error({
        message: `${info.file.name} file upload failed.`,
      });
    }
  };

  const handleResourceFileChange = (info: any) => {
    console.log(info);
    if (info.file.status === "done") {
      setResourceFile(info.file.originFileObj);
      notification.success({
        message: `${info.file.name} file uploaded successfully`,
      });
    } else if (info.file.status === "error") {
      notification.error({
        message: `${info.file.name} file upload failed.`,
      });
    }
  };

  const handleSubmit = async () => {
    console.log(thumbnail, resourceFile);
    if (!thumbnail || !resourceFile) {
      notification.warning({
        message: "Please upload both files.",
      });
      return;
    }

    const { data, error } = await uploadFile({ thumbnail, resourceFile, resourceId: id });
    if (error) {
      return await notification.error({
        message: "File submission failed.",
      });
    }
    await notification.success({
      message: "Files submitted successfully.",
    });

    return router.push(`final?resourceId=${id}`);
  };

  return (
    <div className="min-h-screen  text-white flex justify-center items-center">
      <div className="w-full max-w-2xl p-8  rounded">
        <h1 className="text-3xl text-left golden-font">Display Image and Files Attachment</h1>
        <p className="text-left mb-6">Choose how you want your resource to be displayed.</p>

        <div className="mb-6">
          <Upload onChange={handleThumbnailChange}>
            <Button
              icon={<UploadOutlined />}
              className="w-full bg-[#ffffff18] text-[#ffffff96] py-[2rem!important] flex items-center justify-center border-[#eeeeee54!important] hover:bg-[#ffffff18!important] hover:border-[#76ABAE]"
            >
              Upload Thumbnail
            </Button>
          </Upload>
          <p className="mt-2 text-sm text-gray-400 text-center">
            If thumbnail not set, resource display will have a default thumbnail. However, attaching
            a thumbnail increases search result occurrence of your resource.
          </p>
        </div>

        <Divider />
        <div className="mb-6">
          <Upload onChange={handleResourceFileChange}>
            <Button
              icon={<UploadOutlined />}
              className="w-full bg-[#ffffff18] text-[#ffffff96] py-[2rem!important] flex items-center justify-center border-[#eeeeee54!important] hover:bg-[#ffffff18!important] hover:border-[#76ABAE]"
            >
              Attach Resource File
            </Button>
          </Upload>
          <p className="mt-2 text-sm text-gray-400 text-center">
            If no file is attached, your resource will be uploaded but will be saved as drafts. This
            will help in preventing spam resource uploads.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            // disabled={isCreatingNewUser && true}
            className="disabled:bg-[#8dcccf] block py-5 rounded-[10px] px-5 w-full bg-[#76ABAE!important] flex justify-center items-center text-[16px]"
          >
            {!isCreatingNewUser ? (
              "Continue"
            ) : (
              <span className="loading loading-bars loading-sm"></span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisplayImageComponent;
