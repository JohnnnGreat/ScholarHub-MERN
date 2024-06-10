"use client";
import { useState } from "react";
import { Button, message } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useUpdatePrivacy } from "@/utils/queries";
import { useRouter } from "next/navigation";

const Privacy = ({ id }: { id: string }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const {
    mutateAsync: updatePrivacyFn,
    isPending: isCreatingNewUser,
    isError,
  } = useUpdatePrivacy();

  const handleSelectOption = (option: string | null) => {
    setSelectedOption(option);
  };

  const updatePrivacy = async () => {
    if (!selectedOption) return message.error("You haven't selected any option");
    const response = await updatePrivacyFn({ privacy: selectedOption, resourceId: id });
    const { data, error } = response;
    if (error) {
      await message.error(error);
    }

    await message.success("Privacy Updated Successfully");
    return router.push(`displayimage?resourceId=${id}`);
  };
  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mt-[5.5rem] mx-auto p-8">
        <h1 className="text-[36px] golden-font text-left text-white w-full ">Resource Privacy</h1>
        <p className=" mb-8 w-full font-light">
          Choose how you want your resource to be displayed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-[2rem]">
          <div
            onClick={() => handleSelectOption("public")}
            className={`cursor-pointer p-6 transition-all border rounded-[10px] bg-[#ffffff18] ${
              selectedOption === "public" ? "border-[#76ABAE]" : "border-[#eeeeee54]"
            }`}
          >
            <CheckCircleOutlined className="text-3xl mb-4" />
            <h2 className="text-xl mb-2 golden-font text-white">Set Resource to Public</h2>
            <p>
              Setting your resource to this option will make your resource be available to everyone.
              Individuals with interest in your resource can download it right away.
            </p>
          </div>

          <div
            onClick={() => handleSelectOption("on-request")}
            className={`cursor-pointer p-4 border rounded-[10px] bg-[#ffffff18] ${
              selectedOption === "on-request" ? "border-[#76ABAE]" : "border-[#eeeeee54]"
            }`}
          >
            <InfoCircleOutlined className="text-3xl mb-4" />
            <h2 className="text-xl mb-2 golden-font text-white">Set Resource to On-Request</h2>
            <p>
              Resource will be displayed in feeds, but access will be based strictly on request.
              This will make your resource available to only specific individuals you accept.
              Recommended only on private resource.
            </p>
          </div>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          onClick={updatePrivacy}
          disabled={isCreatingNewUser}
          className="disabled:bg-[#8dcccf] hover:bg-[#5e898b] block py-6 rounded-[10px] px-5 w-full mt-[1.3rem] bg-[#76ABAE!important] flex justify-center items-center text-[16px]"
        >
          {!isCreatingNewUser ? (
            "Continue"
          ) : (
            <span className="loading loading-dots loading-md"></span>
          )}
        </Button>
      </main>
    </div>
  );
};

export default Privacy;
