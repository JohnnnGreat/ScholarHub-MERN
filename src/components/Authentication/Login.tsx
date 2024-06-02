"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <h2 className="text-3xl text-white mb-3 golden-font">Join ScholarHub Today</h2>
      <p className="mb-8 text-center text-[#ffffff8e]">
        Become part of a vibrant community of researchers and academics. Create an account to access
        exclusive features and stay connected with the latest research.
      </p>
      {/* <form className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          className="w-full bg-[#76ABAE] text-[#000000c0] py-2 rounded-md hover:bg-[#5a8688] transition-colors"
          type="submit"
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-400">OR</div>
        <button
          className="w-full bg-white text-black py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
          type="button"
        >
          <img src="/path/to/google-logo.png" alt="Google Logo" className="w-6 h-6 mr-2" />
          Continue with Google
        </button>
      </form> */}
      <Form
        name="normal_login"
        className="login-form bg-red-500"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            className="w-[80%] border border-[#ffffff59] bg-transparent"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      <div className="mt-4 text-gray-400">
        Have an account?{" "}
        <a href="#" className="text-teal-500 hover:underline">
          Sign in
        </a>
      </div>
    </>
  );
};

export default Login;
