import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const response = await req.json();

  console.log(response);
  try {
    // const {data, error}= await supabase.auth.signUp({req.body})
  } catch (error) {}
};
