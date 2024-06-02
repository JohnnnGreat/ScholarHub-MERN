import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createNewUser } from "../request";

export const useCreateNewUser = () => {
  return useMutation({ mutationFn: (user) => createNewUser(user) });
};
