"use client";
import { IResource, IUser } from "@/types";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Image, Avatar } from "antd";
import Head from "next/head";
import { useState } from "react";
import { handleSendNotificationRequestMail } from "@/utils/request";
import { message as antmessage } from "antd";
const SingleResourceComponent = ({
  resInfo,
  userInfo,
}: {
  resInfo: IResource;
  userInfo: IUser;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = (fileName: string, fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    const payload = {
      requesterName: email,
      sendTo: userInfo?.email,
      resourceTitle: resInfo?.title,
      resourceDescription: resInfo?.description,
      resourceLink: `http://localhost:3000/resource/${resInfo?.id}`,
    };

    const { success, message } = await handleSendNotificationRequestMail(payload);
    if (success) {
      antmessage.success(message);
    }
    setShowModal(false);
    setIsLoading(false);
  };
  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="md"
        placement={"bottom-center"}
        backdrop="blur"
        classNames={{
          body: "py-6",
          base: "border-[#292f46] bg-[#76ABAE] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalHeader className="text-white golden-font font-light">
            Send Notice for Request
          </ModalHeader>
          <ModalBody>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} variant="light" onClick={handleSendRequest}>
              Send Request
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="w-full p-4 mt-[5.5rem]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <div className="bg-[#76abae41] golden-font text-sm font-semibold rounded-lg text-[#95dbdfce] py-2 px-3">
              {resInfo?.privacy?.toUpperCase()}
            </div>
            <div className="bg-[#6f6f6f52] text-sm rounded-lg font-semibold text-[#ffffffc0] py-2 px-3">
              {resInfo?.subjectArea?.toUpperCase()}
            </div>
          </div>
          <h1 className="text-white text-4xl lg:text-5xl font-bold mt-2">{resInfo?.title}</h1>
          {resInfo?.parentOrganization && (
            <p className="text-sm text-gray-400">{resInfo?.parentOrganization}</p>
          )}
          <div className="flex flex-col md:flex-row items-start md:items-center mt-4">
            <div className="flex-1">
              <h1 className="text-[#76ABAE] font-semibold">Description/Abstract</h1>
              <p className="font-extralight text-[#ffffff7e]">{resInfo?.description}</p>
              <div className="flex gap-3 mt-4 items-center">
                <Avatar style={{ backgroundColor: "#76ABAE", verticalAlign: "middle" }} size={50}>
                  {userInfo?.fullname?.slice(0, 2)}
                </Avatar>
                <div>
                  <h1 className="text-white">{userInfo?.fullname}</h1>
                  <p className="font-thin text-sm">
                    {userInfo?.institutionName} | {userInfo?.followers ? userInfo?.followers : 0}{" "}
                    followers
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4">
              <Image
                height={300}
                className="object-cover rounded-lg w-[100!important] md:w-[200px]"
                alt="Resource Thumbnail"
                src={resInfo?.thumbnail}
                fallback="data:image/png;base64,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"
              />
            </div>
          </div>
          {resInfo?.privacy === "public" ? (
            <Button
              onClick={() => {
                handleDownload(resInfo?.title?.trim(), resInfo?.fileUrl);
              }}
              startContent={<DownloadOutlined />}
            >
              Download
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-[#76abae41] my-2 text-sm font-semibold rounded-lg text-[#95dbdfce] py-2 px-3"
            >
              Request for Resource
            </Button>
          )}
          <div className="w-full mt-4">
            <iframe className="w-full h-[700px]" src={resInfo?.fileUrl}></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleResourceComponent;
