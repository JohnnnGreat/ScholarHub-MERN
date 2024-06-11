import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const resp = new URL(req.url);
  const path = resp.pathname.split("/")[3];

  console.log(path);
  try {
    const response = await supabase.from("Resource").select("*").eq("id", path).single();
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
