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

export const registerSchema = z.object({
  email: z.string().min(3, "Title must be at least 3 characters"),
  password: z.string().min(3, "Text must be at least 3 characters"),
});

export const loginSchema = z.object({
  email: z.string().min(3, "Title must be at least 3 characters"),
  password: z.string().min(3, "Text must be at least 3 characters"),
});

// Schema validation for note form using Zod
export const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  text: z.string().min(3, "Text must be at least 3 characters"),
});
