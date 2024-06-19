import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const { selectedOption, id } = await req.json();

  try {
    // const { data: userData, error: findUserError } = await supabase
    //   .from("User")
    //   .select("*")
    //   .eq("email", body?.email);

    // if (findUserError) {
    //   console.log("db eror", findUserError);
    //   return NextResponse.json(findUserError);
    // }

    // if (!userData) {
    //   return NextResponse.json("You are yet to register");
    // }

    // Update Researcher Type Option
    const { data: updateOnboardRes, error: updateOnboardError } = await supabase
      .from("User")
      .update(selectedOption)
      .eq("id", id);

    if (updateOnboardError) {
      return NextResponse.json("An error had occured");
    }

    // Update OnboardSet
    const response = await supabase.from("User").update({ onboardingSet: true }).eq("id", id);

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
