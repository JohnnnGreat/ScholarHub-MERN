import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  Resource,
  addResourceToDb,
  createNewUser,
  updatePrivacy,
  updateResearcherType,
} from "../request";

export const useCreateNewUser = () => {
  return useMutation({ mutationFn: (user) => createNewUser(user) });
};

export const useUpdateResearcherType = () => {
  return useMutation({
    mutationFn: (typeOfResearcher: string) => updateResearcherType(typeOfResearcher),
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
