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

export const updateResearcherType = async ({
  selectedOption,
  id,
}: {
  selectedOption: string;
  id: string;
}) => {
  try {
    const response = await fetch("/api/onboarding/researcher", {
      method: "POST",
      body: JSON.stringify({ selectedOption, id }),
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};
// {
//   selectedOption: {
//     institutionName: string;
//     faculty: string;
//     subjectArea: string;
//   }
//   id: string;
// }
export const updateInstitution = async ({
  selectedOption,
  id,
}: {
  selectedOption: { institutionName: string; faculty: string; subjectArea: string };
  id: string;
}) => {
  console.log(selectedOption, id);
  try {
    const response = await fetch("/api/onboarding/institution", {
      method: "POST",
      body: JSON.stringify({ selectedOption, id }),
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const addResourceToDb = async (resource: Resource): Promise<any> => {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const response = await supabase
      .from("Resource")
      .insert([{ ...resource, uploadBy: user?.email }])
      .select();

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

export const updateFile = async (filePayload: any) => {
  const supabase = createClient();
  const { resourceId } = filePayload;
  try {
    const { resourceFile, thumbnail } = filePayload;
    const { thumbnailUrl, resourceFileUrl } = await uploadFile({ resourceFile, thumbnail });

    const response = await supabase
      .from("Resource")
      .update({ thumbnail: thumbnailUrl, fileUrl: resourceFileUrl })
      .eq("id", resourceId);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const uploadFile = async (Files: {
  thumbnail: File;
  resourceFile: File;
}): Promise<{ thumbnailUrl: string; resourceFileUrl: string } | any> => {
  const supabase = createClient();
  const { resourceFile, thumbnail } = Files;
  const thumbnailPath = `thumbnails/${Date.now()}_${thumbnail.name}`;
  const resourceFilePath = `resources/${Date.now()}_${resourceFile.name}`;

  try {
    const { data: thumbnailData, error: thumbnailError } = await supabase.storage
      .from("Thumbnail")
      .upload(thumbnailPath, thumbnail);

    if (thumbnailError) {
      throw thumbnailError;
    }

    const { data: resourceFileData, error: resourceFileError } = await supabase.storage
      .from("Files")
      .upload(resourceFilePath, resourceFile);

    if (resourceFileError) {
      throw resourceFileError;
    }

    const thumbnailUrl = supabase.storage.from("Thumbnail").getPublicUrl(thumbnailPath)
      .data.publicUrl;

    const resourceFileUrl = supabase.storage.from("Files").getPublicUrl(resourceFilePath)
      .data.publicUrl;

    return { thumbnailUrl, resourceFileUrl };
  } catch (error) {
    return error;
  }
};

export const getResourceData = async (id: string | undefined) => {
  const environment = process.env.NODE_ENV;
  try {
    const response = await fetch(
      `http://${
        environment === "development" ? "localhost:3000" : "scholar-six.vercel.app"
      }/api/resource/${id}`
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getUserInfo = async (email: string | undefined) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("User").select("*").eq("email", email).single();

    return data;
  } catch (error) {
    return error;
  }
};

export const getRelatedUsers = async (researchType: any, email: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("researchType", researchType);

    const relatedResearchers = data?.filter((item: any, index) => {
      return item.email !== email;
    });

    return relatedResearchers;
  } catch (error) {
    return error;
  }
};

export const deleteResource = async (resourceId: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("Resource").delete().eq("id", resourceId);

    if (error) {
      throw new Error();
    }

    return { data, error };
  } catch (error) {
    throw new Error();
  }
};

export const signInUser = async (user: any): Promise<any> => {
  const supabase = createClient();
  try {
    const response = await supabase.auth.signInWithPassword(user);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleUpdate = async (id: string) => {
  const supabase = createClient();
  try {
    const response = await supabase.from("User").update({ onboardingSet: true }).eq("id", id);

    return response;
    // return router.push(`/auth/researchtype?userId=${id}`);
  } catch (error) {
    return error;
  }
};

export const handleSendNotificationRequestMail = async (information: any) => {
  try {
    const response = await fetch("/api/notify", {
      method: "POST",
      body: JSON.stringify(information),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const updateViews = async (id: string, views: number) => {
  const supabase = createClient();
  try {
    const response = await supabase
      .from("Resource")
      .update({ views: views + 1 })
      .eq("id", id);

    return response;
    // return router.push(`/auth/researchtype?userId=${id}`);
  } catch (error) {
    return error;
  }
};

export const welcomeEmail = async (id: string) => {
  console.log(id);
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("User").select("*").eq("id", id);
    console.log(data);
    if (error) {
      throw Error("Failed to get User");
      return;
    }

    // return router.push(`/auth/researchtype?userId=${id}`);
  } catch (error) {
    return error;
  }
};

// const handleSendWelcomeEmail = (id) => {};

export const handleTwoViewCounts = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("Resource")
      .select("*")
      .order("views", { ascending: false })
      .limit(2);

    if (error) {
      console.error("Error fetching top resources:", error);
      return [];
    }

    return data;
  } catch (err) {
    return err;
  }
};
