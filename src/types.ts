export interface IResource {
  title: string;
  description: string;
  datePublished: string;
  subjectAreas: string;
  coAuthors: string;
  pageNo: string | number;
  edition: number;
  published: boolean;
  resourceType: string;
  resourceEmbeddedNotes: string;
  uploadBy: string | null;
  privacy: string;
  thumbnail: string;
  fileUrl: string;
  id: string;
  
}

export interface INote {
  text: string;
  title: string;
}

export interface IUser {
  fullname: string;
  email: string;
  researchType: string;
  bio: string;
  followers: number;
  publications: number;
}
