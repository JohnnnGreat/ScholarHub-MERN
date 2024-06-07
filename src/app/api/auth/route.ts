import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const body = await req.json();
  console.log(body);
  try {
    const { data: dataDb, error: dbError } = await supabase.auth.signUp({
      email: body?.email,
      password: body?.password,
    });

    if (dbError) {
      console.log("db eror", dbError);
      return NextResponse.json(dbError);
    }

    // Add New User to the Database
    const { data, error } = await supabase.from("User").select("*").eq("email", body?.email);
    console.log(data);
    if (!data) {
      return NextResponse.json("User Already Existsy");
    }

    const response = await supabase.from("User").insert([body]);

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
