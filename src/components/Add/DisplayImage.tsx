"use client";
import React from "react";
import { useState } from "react";
import { Upload, message, notification, Button as AntButton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { useUpdateFile } from "@/utils/queries";
import { useRouter } from "next/navigation";
import { Button as NextButton } from "@nextui-org/button";
import { sendNotification } from "@/utils/request";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const DisplayImageComponent = ({ id }: { id: string }) => {
  const [thumbnail, setThumbnail] = useState<any>("");
  const [resourceFile, setResourceFile] = useState<any>("");
  const router = useRouter();
  const { mutateAsync: uploadFile, isPending: isUploadingResource, isError } = useUpdateFile();

  const handleThumbnailChange = async ({ file, onSuccess, onError }: any) => {
    const fileName = `${Date.now()}_${file.name}`; // Generate unique file name
    try {
      const { data, error } = await supabase.storage.from("Files").upload(fileName, file);
      if (error) throw error;

      const thumbnailUrl = supabase.storage.from("Files").getPublicUrl(fileName).data.publicUrl;
      const response = await supabase
        .from("Resource")
        .update({ thumbnail: thumbnailUrl })
        .eq("id", id);
      onSuccess(data);
      setThumbnail(thumbnailUrl);
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

  const handleResourceFileChange = async ({ file, onSuccess, onError }: any) => {
    const fileName = `${Date.now()}_${file.name}`; // Generate unique file name
    try {
      const { data, error } = await supabase.storage.from("Files").upload(fileName, file);
      if (error) throw error;

      const fileUrl = supabase.storage.from("Files").getPublicUrl(fileName).data.publicUrl;
      const response = await supabase.from("Resource").update({ fileUrl: fileUrl }).eq("id", id);
      onSuccess(data);
      setResourceFile(fileUrl);
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

  const handleSubmit = async () => {
    const res = await sendNotification(id);
    return router.push(`final?resourceId=${id}`);
  };

  return (
    <div className="min-h-screen  text-white flex justify-center items-center">
      <div className="w-full max-w-2xl p-8  rounded">
        <h1 className="text-3xl text-left golden-font">Display Image and Files Attachment</h1>
        <p className="text-left mb-6">Choose how you want your resource to be displayed.</p>

        <div className="mb-6">
          <Upload customRequest={handleThumbnailChange}>
            <AntButton
              icon={<UploadOutlined />}
              className="w-full bg-[#ffffff18] text-[#ffffff96] py-[2rem!important] flex items-center justify-center border-[#eeeeee54!important] hover:bg-[#ffffff18!important] hover:border-[#76ABAE]"
            >
              Upload Thumbnail
            </AntButton>
          </Upload>
          <p className="mt-2 text-sm text-gray-400 text-center">
            If thumbnail not set, resource display will have a default thumbnail. However, attaching
            a thumbnail increases search result occurrence of your resource.
          </p>
        </div>

        <Divider />
        <div className="mb-6">
          <Upload customRequest={handleResourceFileChange}>
            <AntButton
              icon={<UploadOutlined />}
              className="w-full bg-[#ffffff18] text-[#ffffff96] py-[2rem!important] flex items-center justify-center border-[#eeeeee54!important] hover:bg-[#ffffff18!important] hover:border-[#76ABAE]"
            >
              Attach Resource File
            </AntButton>
          </Upload>
          <p className="mt-2 text-sm text-gray-400 text-center">
            If no file is attached, your resource will be uploaded but will be saved as drafts. This
            will help in preventing spam resource uploads.
          </p>
        </div>

        <div className="flex justify-center">
          <NextButton
            type="submit"
            isLoading={isUploadingResource}
            onClick={handleSubmit}
            // disabled={isCreatingNewUser && true}
            className="disabled:bg-[#8dcccf] block py-5 rounded-[10px] px-5 w-full bg-[#76ABAE!important] flex justify-center items-center text-[16px]"
          >
            Next
          </NextButton>
        </div>
      </div>
    </div>
  );
};

export default DisplayImageComponent;
