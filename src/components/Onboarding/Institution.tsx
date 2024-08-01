"use client";
import React, { useState } from "react";
import { useUpdateResearcherType } from "@/utils/queries";
import { message } from "antd";
import { popularSubjectAreas, researcherType } from "../constant";
import { Checkbox, Form, Input as AntInput, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Textarea } from "@nextui-org/input";
import { useUpdateInstitution } from "@/utils/queries";
import { welcomeEmail } from "@/utils/request";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const { Option } = Select;

const inputNextUi = [
  "shadow-xl",
  "bg-default-200/50",
  "dark:bg-default/60",
  "backdrop-blur-xl",
  "backdrop-saturate-200",
  "hover:bg-default-200/70",
  "dark:hover:bg-default/70",
  "group-data-[focus=true]:bg-default-200/50",
  "dark:group-data-[focus=true]:bg-default/60",
  "!cursor-text",
  "border-[1px] border-[#ffffff59] placeholder:text-[#ffffffa1] text-[#76ABAE!important] w-[100%!important]",
];

const Institution = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    mutateAsync: updateInstitution,
    isPending: isUpdatingUser,
    isError,
  } = useUpdateInstitution();

  const noteSchema = z.object({
    institutionName: z.string().min(3, "Title must be at least 3 characters"),
    faculty: z.string().min(3, "Text must be at least 3 characters"),
    subjectArea: z.string(),
  });

  interface IInstitution {
    institutionName: string;
    faculty: string;
    subjectArea: string;
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IInstitution>({
    resolver: zodResolver(noteSchema),
  });

  async function onSubmit(dataInstitution: IInstitution) {
    const { data: res, error } = await updateInstitution({ selectedOption: dataInstitution, id });
    if (error) {
      console.log("An Error Occured");
      return;
    }

    const sendWelcomeEmail = await welcomeEmail(id);
    return router.push("/profile");
  }

  function onerror(e: any) {
    console.log(e);
  }
  return (
    <>
      <div className="w-full">
        <h2 className="text-3xl text-white mb-3 golden-font  text-center">Institution Details</h2>

        <form onSubmit={handleSubmit(onSubmit, onerror)}>
          <Input
            type="text"
            classNames={{
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
                "border-[1px] border-[#ffffff59] placeholder:text-[#ffffffa1] text-[#76ABAE!important]",
              ],
            }}
            variant="bordered"
            label="Institution Name"
            {...register("institutionName")}
          />
          <p
            className={`text-red-500 text-[14px] ${
              errors?.institutionName?.message ? "" : "hidden"
            }`}
          >
            {errors?.institutionName?.message}
          </p>
          <Input
            type="Faculty"
            classNames={{
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",

                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
                "border-[1px] w-[100%] mt-[.8rem] border-[#ffffff59] placeholder:text-[#ffffffa1] text-[#76ABAE!important]",
              ],
            }}
            // className="w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
            variant="bordered"
            label="faculty"
            {...register("faculty")}
          />
          <p className={`text-red-500 text-[14px] ${errors?.faculty?.message ? "" : "hidden"}`}>
            {errors?.faculty?.message}
          </p>
          <Controller
            name="subjectArea"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                showSearch
                filterSort={(optionA: any, optionB: any) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                value={value}
                onChange={onChange}
                placeholder="Subject Area"
                className="w-[100%] mt-[.8rem] border-[#ffffff59] placeholder:text-[#ffffffa1] text-[#76ABAE!important]"
              >
                {popularSubjectAreas.map((item, index) => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            )}
          />
          <p className={`text-red-500 text-[14px] ${errors?.subjectArea?.message ? "" : "hidden"}`}>
            {errors?.subjectArea?.message}
          </p>

          <Button
            isLoading={isUpdatingUser}
            type="submit"
            className="bg-[#76ABAE] w-full py-2 text-white rounded mt-[1rem]"
          >
            Continue
          </Button>
        </form>
      </div>
    </>
  );
};

export default Institution;
