import { researcherType } from "./../../components/constant";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  Resource,
  addResourceToDb,
  createNewUser,
  updatePrivacy,
  updateResearcherType,
  updateFile,
  getRelatedUsers,
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

export const useGetRelatedResearchers = (researcherType: string, email: string) => {
  return useQuery({
    queryKey: ["GET_RELATED_RESEARCHER"],
    queryFn: () => getRelatedUsers(researcherType, email),
  });
};
