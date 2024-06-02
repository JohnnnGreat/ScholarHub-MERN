import axios from "axios";
export const createNewUser = async (user: any) => {
  console.log("sss");
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      next: { revalidate: 1000 },
      body: JSON.stringify(user),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
