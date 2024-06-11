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
  console.log(resourceFilePath);
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

export const getResourceData = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/resource/${id}`);
    return await response.json();
  } catch (error) {
    return error;
  }
};
