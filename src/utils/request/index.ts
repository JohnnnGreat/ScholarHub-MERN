import { createClient } from "../supabase/client";

export interface Resource {
  title: string;
  datePublished: string;
  subjectArea: string;
  coAuthorsOne?: string;
  pageNo?: string;
  edition?: string;
  parentOrganization?: string;
  description?: string;
  published: string; // Assuming published is a string, could be a boolean if 'yes'/'no' should be true/false
  resourceType: string;
  resourceEmbeddedNote?: string;
}

export const createNewUser = async (user: any) => {
  try {
    const response = await fetch("api/auth", {
      method: "POST",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const updateResearcherType = async (researcherType: string) => {
  try {
    const response = await fetch("api/onboarding/researcher", {
      method: "POST",
      body: JSON.stringify(researcherType),
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const addResourceToDb = async (resource: Resource): Promise<any> => {
  const supabase = createClient();
  try {
    const response = await supabase.from("Resource").insert([resource]).select();

    return response;
  } catch (error) {
    return error;
  }
};

export const updatePrivacy = async ({
  privacy,
  resourceId,
}: {
  privacy: string;
  resourceId: string;
}): Promise<any> => {
  const supabase = createClient();

  try {
    const response = await supabase
      .from("Resource")
      .update({ privacy: privacy })
      .eq("id", resourceId);

    return response;
  } catch (error) {
    return error;
  }
};
