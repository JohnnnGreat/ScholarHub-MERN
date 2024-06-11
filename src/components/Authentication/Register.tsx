"use client";
import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useCreateNewUser } from "@/utils/queries";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Register = () => {
  const { mutateAsync: registerUser, isPending: isCreatingNewUser, isError } = useCreateNewUser();
  const [openResearchType, setOpenResearchType] = useState(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    const response = await registerUser(values);

    if (response?.code) message.error(response.code);
    if (response?.name) message.error(response.name);

    if (response?.status === 201) {
      notification.success({
        message: "Account Created Successfully !!!😊",
      });
    }

    // router.push("/auth/researchtype");
  };
  return (
    <>
      <div className="relative top-0">
        <h2 className="text-3xl text-white mb-3 golden-font  text-center">Join ScholarHub Today</h2>
        <p className="mb-4 text-center text-[#ffffff8e] text-[14px]">
          To provide you with a personalized experience and tailor our features to your needs,
          please let us know what type of researcher you are. This will help us recommend relevant
          content, connections, and tools that suit your research journey.
        </p>

        <Form
          name="normal_login"
          className="login-form w-full flex flex-col"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              type="text"
              className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email Address!" }]}
          >
            <Input
              type="text"
              className="mb-0 w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
              placeholder="Email Address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              placeholder="Password"
              className="w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
            />
          </Form.Item>
          <Form.Item>
            <button
              htmlType="submit"
              disabled={isCreatingNewUser && true}
              className="disabled:bg-[#649294] py-3 rounded-full px-5 w-full bg-[#76ABAE!important] flex justify-center items-center text-[16px]"
            >
              {!isCreatingNewUser ? (
                "Register"
              ) : (
                <span className="loading loading-dots loading-md"></span>
              )}
            </button>
            <p className="text-center mt-[.8rem] text-[14px] text-[#ffffffb6]">Or</p>
          </Form.Item>
          <button className="px-[2rem] text-[#76ABAE] border hover:bg-transparent py-2 rounded-full w-fit mx-auto border-[#ffffff4b] bg-transparent h-auto flex gap-3 items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.8912 14.2254H29.75V14.1666H17V19.8333H25.0063C23.8383 23.132 20.6997 25.5 17 25.5C12.3059 25.5 8.50004 21.6941 8.50004 17C8.50004 12.3059 12.3059 8.49998 17 8.49998C19.1668 8.49998 21.1381 9.3174 22.6391 10.6526L26.6461 6.64556C24.116 4.28752 20.7315 2.83331 17 2.83331C9.1765 2.83331 2.83337 9.17644 2.83337 17C2.83337 24.8235 9.1765 31.1666 17 31.1666C24.8236 31.1666 31.1667 24.8235 31.1667 17C31.1667 16.0501 31.069 15.1229 30.8912 14.2254Z"
                fill="#FFC107"
              />
              <path
                d="M4.4668 10.4061L9.12125 13.8196C10.3807 10.7015 13.4308 8.49998 17 8.49998C19.1668 8.49998 21.1381 9.3174 22.6391 10.6526L26.6461 6.64556C24.116 4.28752 20.7315 2.83331 17 2.83331C11.5586 2.83331 6.83971 5.90535 4.4668 10.4061Z"
                fill="#FF3D00"
              />
              <path
                d="M17.0001 31.1667C20.6593 31.1667 23.9842 29.7663 26.4981 27.489L22.1135 23.7787C20.6434 24.8968 18.847 25.5015 17.0001 25.5C13.3153 25.5 10.1866 23.1505 9.00793 19.8716L4.38818 23.431C6.73277 28.0188 11.4942 31.1667 17.0001 31.1667Z"
                fill="#4CAF50"
              />
              <path
                d="M30.8911 14.2255H29.75V14.1667H17V19.8334H25.0063C24.4476 21.4033 23.4411 22.7752 22.1113 23.7795L22.1135 23.7781L26.498 27.4883C26.1878 27.7702 31.1667 24.0834 31.1667 17C31.1667 16.0501 31.0689 15.1229 30.8911 14.2255Z"
                fill="#1976D2"
              />
            </svg>
            Continue with Google
          </button>
        </Form>
        <div className="mt-1 text-gray-400 text-[14px] text-center">
          Have an account?{" "}
          <a href="#" className="text-[#76ABAE] hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
