import { z } from "zod";

export const formSchema = z.object({
  title: z.string().optional(),
  datePublished: z.date(),
  subjectArea: z.string(),
  coAuthors: z.string(),
  pageNo: z.number(),
  edition: z.string(),
  parentOrganization: z.string(),
  description: z.string(),
  published: z.string(),
  resourceType: z.string(),
  resourceEmbeddedNote: z.string(),
});
