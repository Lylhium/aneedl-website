// types.ts
export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
};

export type DriveSubfolder = {
  id: string;
  name: string;
  files: DriveFile[];
};

export type DriveFolder = {
  id: string;
  name: string;
  files: DriveFile[];
  subfolders?: DriveSubfolder[];
};