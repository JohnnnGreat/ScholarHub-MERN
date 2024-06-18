"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Textarea } from "@nextui-org/input";
import { useSignInUser } from "@/utils/queries";
import { useRouter } from "next/navigation";

export const Login = () => {
  const { mutateAsync: loginUser, isPending: isCreatingNewUser, isError } = useSignInUser();
  const router = useRouter();

  const noteSchema = z.object({
    email: z.string().min(3, "Title must be at least 3 characters"),
    password: z.string().min(3, "Text must be at least 3 characters"),
  });

  interface ILogin {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (dataV: ILogin) => {
    const { data, error } = await loginUser(dataV);

    if (error) {
      console.log(error.message);
    }
    router.push("/profile");
  };
  return (
    <div className="relative top-0">
      <h2 className="text-3xl text-white mb-3 golden-font  text-center">Login to Continue</h2>
      <p className="mb-4 text-center text-[#ffffff8e] text-[14px]">
        To provide you with a personalized experience and tailor our features to your needs, please
        let us know what type of researcher you are. This will help us recommend relevant content,
        connections, and tools that suit your research journey.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          label="Email"
          {...register("email")}
        />
        <p className={`text-red-500 text-[14px] ${errors?.email?.message ? "" : "hidden"}`}>
          {errors?.email?.message}
        </p>
        <Input
          type="password"
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
              "border-[1px] mt-[.8rem] border-[#ffffff59] placeholder:text-[#ffffffa1] text-[#76ABAE!important]",
            ],
          }}
          // className="w-[100%] mx-[auto !important] text-[#76ABAE] py-3 px-5 rounded-full placeholder:text-[#ffffffa1] border bg-transparent hover:bg-transparent focus:bg-transparent invalid:bg-transparent border-[#ffffff59] "
          variant="bordered"
          label="Password"
          {...register("password")}
        />
        <p className={`text-red-500 text-[14px] ${errors?.password?.message ? "" : "hidden"}`}>
          {errors?.password?.message}
        </p>

        <button type="submit" className="bg-[#76ABAE] w-full py-2 text-white rounded mt-[1rem]">
          Login
        </button>
      </form>
      <div className="mt-1 text-gray-400 text-[14px] text-center">
        Have an account?{" "}
        <a href="#" className="text-[#76ABAE] hover:underline">
          Sign in
        </a>
      </div>
    </div>
  );
};
