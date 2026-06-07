import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_DRIVE_API_KEY!;
const ROOT_FOLDER = process.env.GOOGLE_DRIVE_FOLDER_ID!;

async function getFolderContents(folderId: string) {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&key=${API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return data.files || [];
}

export async function GET() {
  try {
    const folders = await getFolderContents(ROOT_FOLDER);

    const result = await Promise.all(
      folders.map(async (folder: any) => {
        const files = await getFolderContents(folder.id);

        const subfolders = await Promise.all(
          files
            .filter(
              (file: any) =>
                file.mimeType ===
                'application/vnd.google-apps.folder'
            )
            .map(async (subfolder: any) => ({
              id: subfolder.id,
              name: subfolder.name,
              files: await getFolderContents(subfolder.id),
            }))
        );

        return {
          id: folder.id,
          name: folder.name,
          files,
          subfolders,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Drive data' },
      { status: 500 }
    );
  }
}