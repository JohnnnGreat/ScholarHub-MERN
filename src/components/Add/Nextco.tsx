"use client";
import React from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";

import { useAddNewResource } from "@/utils/queries";
import { useRouter } from "next/navigation";
import { DatePicker, Tooltip } from "antd";
import { popularSubjectAreas } from "../constant";
import { Form, useForm, Controller } from "react-hook-form";
import { z } from "zod";
// import { formSchema } from "@/utils/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { IResource, IUser } from "@/types";
// const { Option } = Select;
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  datePublished: z.date(),
  subjectArea: z.string(),
  coAuthors: z.string().min(3, "Title must be at least 3 characters"),
  pageNo: z.string(),
  edition: z.string().min(3, "Title must be at least 3 characters"),
  parentOrganization: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Title must be at least 3 characters"),
  published: z.string(),
  resourceType: z.string().min(3, "Title must be at least 3 characters").optional(),
  resourceEmbeddedNote: z.string().min(3, "Title must be at least 3 characters"),
});

const NextCom = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  // });
  // const option = ["yes", "no"];

  // const router = useRouter();
  // const {
  //   mutateAsync: addResourceToDb,
  //   isPending: isCreatingNewUser,
  //   isError,
  // } = useAddNewResource();

  // const inputNextUi = [
  //   "shadow-xl",
  //   "bg-default-200/50",
  //   "dark:bg-default/60",
  //   "backdrop-blur-xl",
  //   "backdrop-saturate-200",
  //   "hover:bg-default-200/70",
  //   "dark:hover:bg-default/70",
  //   "group-data-[focus=true]:bg-default-200/50",
  //   "dark:group-data-[focus=true]:bg-default/60",
  //   "!cursor-text",
  //   "border-[1px] border-[#ffffff59] placeholder:text-[#ffffffa1] text-[#76ABAE!important]",
  // ];

  // const onSubmit = (data: IResource) => {
  //   console.log("wokr");
  //   console.log(data);
  // };

  // const onerror = (e) => {
  //   console.log(e);
  // };
  return (
    // <div>
    //   <div className="min-h-screen text-white flex justify-center items-center mt-[5.5rem]">
    //     <div className="w-full max-w-2xl p-8 rounded">
    //       <h1 className="text-3xl golden-font">Add a Paper</h1>
    //       <p className="text-[#ffffff6c] mb-6">Add the basic meta data about the resource</p>

    //       {/* Form Inputs */}
    //       <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onerror)}>
    //         <Input
    //           label="Title"
    //           {...register("title", { required: true })}
    //           errorMessage={errors?.title && "Title is required"}
    //           classNames={{
    //             inputWrapper: inputNextUi,
    //           }}
    //           placeholder="Title of Resource"
    //           isRequired
    //         />
    //         <div className="grid grid-cols-2 gap-4">
    //           <DatePicker className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-[10px] placeholder:text-[#ffffffa1 !important] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] " />

    //           <Controller
    //             name="subjectArea"
    //             control={control}
    //             rules={{ required: true }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Select
    //                 label="Subject Area"
    //                 className="max-w-xs"
    //                 onBlur={onBlur}
    //                 onChange={onChange}
    //                 errorMessage={errors?.datePublished && "Date Published is Required"}
    //                 selectedKeys={value ? [value] : []}
    //               >
    //                 {popularSubjectAreas?.map((item, index) => (
    //                   <SelectItem key={index}>{item}</SelectItem>
    //                 ))}
    //               </Select>
    //             )}
    //           />
    //         </div>
    //         <Input
    //           label="Co Authors One"
    //           placeholder="Separate Authors with commas"
    //           classNames={{
    //             inputWrapper: inputNextUi,
    //           }}
    //           {...register("coAuthors")}
    //         />
    //         <div className="grid grid-cols-3 gap-4">
    //           <Input
    //             label="Page No."
    //             placeholder="Total Pages"
    //             classNames={{
    //               inputWrapper: inputNextUi,
    //             }}
    //             {...register("pageNo", { required: true })}
    //             errorMessage={errors?.pageNo && "Page No is Required"}
    //           />
    //           <Input
    //             label="Edition"
    //             placeholder="Resource Edition"
    //             classNames={{
    //               inputWrapper: inputNextUi,
    //             }}
    //             {...register("edition")}
    //           />
    //           <Input
    //             label="Parent Organization"
    //             placeholder="Parent Organization or Institution"
    //             classNames={{
    //               inputWrapper: inputNextUi,
    //             }}
    //             {...register("parentOrganization")}
    //             {...register("parentOrganization")}
    //           />
    //         </div>
    //         <Textarea
    //           label="Description"
    //           placeholder="Write short description or abstract of resource"
    //           classNames={{
    //             inputWrapper: inputNextUi,
    //           }}
    //           rows={4}
    //           {...register("description", { required: true })}
    //           errorMessage={errors?.pageNo && "Description is Required"}
    //         />

    //         <Controller
    //           name="published"
    //           control={control}
    //           rules={{ required: true }}
    //           render={({ field: { onChange, onBlur, value } }) => (
    //             <Select
    //               label="Published?"
    //               className="max-w-xs"
    //               onBlur={onBlur}
    //               onChange={onChange}
    //               errorMessage={errors?.published && "Date Published is Required"}
    //             >
    //               {option?.map((item, index) => (
    //                 <SelectItem key={index}>{item}</SelectItem>
    //               ))}
    //             </Select>
    //           )}
    //         />
    //         <Input
    //           label="Resource Embedded Note"
    //           placeholder="Enter any further embedded notes"
    //           classNames={{
    //             inputWrapper: inputNextUi,
    //           }}
    //           {...register("resourceEmbeddedNote")}
    //         />
    //         <button type="submit" color="warning">
    //           Submit
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div>Hello</div>
  );
};

export default NextCom;
