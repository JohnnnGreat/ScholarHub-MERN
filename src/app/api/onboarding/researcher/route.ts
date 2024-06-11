import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const body = await req.json();
  console.log(body);
  try {
    const { data: userData, error: findUserError } = await supabase
      .from("User")
      .select("*")
      .eq("email", body?.email);

    if (findUserError) {
      console.log("db eror", findUserError);
      return NextResponse.json(findUserError);
    }

    if (!userData) {
      return NextResponse.json("You are yet to register");
    }

    // Update Researcher Type Option
    const { data, error } = await supabase
      .from("User")
      .update({ researchType: body?.selectedOption })
      .eq("id", body?.id);

    const response = {
      data,
      error,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
