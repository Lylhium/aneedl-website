'use client';

import { useEffect, useState } from 'react';
import { DriveFolder, DriveFile } from '../../../types';
import IllustrationsGallery from '../../../components/IllustrationsGallery';
import Lightbox from '../../../components/Lightbox';

export default function IllustrationsPage() {
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/drive')
      .then((res) => res.json())
      .then((data) => setFolders(data));
  }, []);

  const currentFolder = folders.find(
    (folder) => folder.name.trim().toLowerCase() === 'illustrations'
  );
  
  const fineArtsFolder = folders.find(
    (folder) => folder.name.trim().toLowerCase() === 'fine arts'
  );

  const sortByNumber = (files: DriveFile[]) =>
    [...files].sort((a, b) => {
      const numA = parseInt(a.name.match(/^\d+/)?.[0] || '9999');
      const numB = parseInt(b.name.match(/^\d+/)?.[0] || '9999');
      return numA - numB;
    });

  const illustrationImages = currentFolder?.files.filter(
    (file) => file.mimeType.includes('image') || file.mimeType.includes('video')
  ) || [];

  const fineArtsImages = fineArtsFolder?.files.filter(
    (file) => file.mimeType.includes('image') || file.mimeType.includes('video')
  ) || [];

  const allImages = [
    ...sortByNumber(illustrationImages),
    ...sortByNumber(fineArtsImages),
  ];

  return (
    <main className="bg-[#f3f3f3] min-h-screen pt-6">
      <section className="max-w-[950px] mx-auto px-6 pb-20">
        <IllustrationsGallery
          images={allImages}
          activeCategory="illustrations"
          setSelectedIndex={setSelectedIndex}
        />
      </section>

      <Lightbox 
        images={allImages} 
        selectedIndex={selectedIndex} 
        setSelectedIndex={setSelectedIndex} 
      />
    </main>
  );
}