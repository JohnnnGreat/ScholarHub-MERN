import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  Resource,
  addResourceToDb,
  createNewUser,
  updatePrivacy,
  updateResearcherType,
  updateFile,
} from "../request";

export const useCreateNewUser = () => {
  return useMutation({ mutationFn: (user) => createNewUser(user) });
};

export const useUpdateResearcherType = () => {
  return useMutation({
    mutationFn: (payload: { selectedOption: string; id: string }) => updateResearcherType(payload),
  });
};

export const useAddNewResource = () => {
  return useMutation({
    mutationFn: (resource: Resource) => addResourceToDb(resource),
  });
};

export const useUpdatePrivacy = (): any => {
  return useMutation({
    mutationFn: (payload: { privacy: string; resourceId: string } | any): Promise<any> =>
      updatePrivacy(payload),
  });
};

export const useUpdateFile = (): any => {
  return useMutation({
    mutationFn: (filePayload) => updateFile(filePayload),
  });
};
