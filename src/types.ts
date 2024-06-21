export interface IResource {
  title: string;
  description: string;
  datePublished: string;
  subjectArea: string;
  coAuthors: string;
  pageNo: string | number;
  edition: number;
  published: boolean;
  resourceType: string;
  resourceEmbeddedNote: string;
  uploadBy: string | null;
  privacy: string;
  thumbnail: string;
  fileUrl: string;
  id: string;
  parentOrganization: string;
  views: string;
}

export interface INote {
  text: string;
  title: string;
}

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  researchType: string | undefined;
  bio: string;
  followers?: any;
  publications?: number | string;
  onboardingSet?: boolean;
  institutionName: string;
  faculty: string;
  noPublications: number;
  subjectArea: string;
}
