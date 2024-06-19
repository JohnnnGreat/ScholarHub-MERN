"use server";

import { createClient } from "../supabase/server";

export const getResourceById = async (id: string): Promise<any> => {
  try {
    const supabase = createClient();
    const response = await supabase.from("Resource").select("*").eq("id", id).single();
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserInfoByEmail = async (email: string): Promise<any> => {
  console.log(email);
  try {
    const supabase = createClient();
    const response = await supabase.from("User").select("*").eq("email", email).single();
    return response;
  } catch (error) {
    return error;
  }
};
