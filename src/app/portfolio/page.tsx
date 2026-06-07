'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
};

type DriveSubfolder = {
  id: string;
  name: string;
  files: DriveFile[];
};

type DriveFolder = {
  id: string;
  name: string;
  files: DriveFile[];
  subfolders?: DriveSubfolder[];
};

function ArtworkImage({
  image,
  onClick,
}: {
  image: DriveFile;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className="
        mb-6
        break-inside-avoid
        cursor-pointer
      "
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {!loaded && !image.mimeType.includes('video') && (
          <div
            className="
              absolute
              inset-0
              bg-neutral-200
              animate-pulse
            "
          />
        )}

       {image.mimeType.includes('video') ? (
            <iframe
              src={`https://drive.google.com/file/d/${image.id}/preview`}
              className="
                w-full
                aspect-video
                rounded-sm
                border-0
              "
              allow="autoplay"
            />
          ) : (
          <Image
            src={`https://drive.google.com/thumbnail?id=${image.id}&sz=w2000`}
            alt={image.name}
            width={1200}
            height={1200}
            unoptimized
            onLoad={() => setLoaded(true)}
            className={`
              w-full
              h-auto
              rounded-sm
              transition-all
              duration-700
              ease-out
              hover:scale-[1.01]

              ${
                loaded
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-[1.03]'
              }
            `}
          />
        )}
      </div>
    </motion.div>
  );
}

function FeaturedArtworkImage({
  image,
  onClick,
}: {
  image: DriveFile;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="max-w-[1300px] mx-auto ">
        {!loaded && (
          <div className="aspect-[16/9] bg-neutral-200 animate-pulse" />
        )}

        <Image
          src={`https://drive.google.com/thumbnail?id=${image.id}&sz=w3000`}
          alt={image.name}
          width={3000}
          height={2000}
          unoptimized
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto rounded-sm transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </motion.div>
  );
}

function PortfolioContent() {

  const [folders, setFolders] = useState<DriveFolder[]>([]);
const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);
  
  const searchParams = useSearchParams();

const initialCategory =
  searchParams.get('category') === 'fine-arts'
    ? 'fine arts'
    : searchParams.get('category') ===
      'character-design'
    ? 'character design'
    : 'character design';

const [activeCategory, setActiveCategory] =
useState(initialCategory);



useEffect(() => {
  const category = searchParams.get('category');

  if (category === 'fine-arts') {
    setActiveCategory('fine arts');
  } else if (category === 'character-design') {
    setActiveCategory('character design');
  } else if (category === 'illustrations') {
    setActiveCategory('illustrations');
  }
}, [searchParams]);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  useEffect(() => {
    fetch('/api/drive')
      .then((res) => res.json())
      .then((data) => setFolders(data));
  }, []);

  const [characterFilter, setCharacterFilter] =
  useState('all');
  
  const [zoomed, setZoomed] = useState(false);
  const [lastTap, setLastTap] = useState(0);

const [position, setPosition] = useState({
  x: 0,
  y: 0,
});

const [dragging, setDragging] = useState(false);

const [dragStart, setDragStart] = useState({
  x: 0,
  y: 0,
});

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !zoomed) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  window.addEventListener(
    'mousemove',
    handleMouseMove
  );

  window.addEventListener(
    'mouseup',
    handleMouseUp
  );

  return () => {
    window.removeEventListener(
      'mousemove',
      handleMouseMove
    );

    window.removeEventListener(
      'mouseup',
      handleMouseUp
    );
  };
}, [dragging, zoomed, dragStart]);

  const currentFolder = folders.find(
    (folder) =>
      folder.name.trim().toLowerCase() ===
      activeCategory.toLowerCase()
  );

const mainImages =
  currentFolder?.files.filter(
    (file) =>
      file.mimeType.includes('image') ||
      file.mimeType.includes('video')
  ) || [];

  const sirenImages =
    currentFolder?.subfolders
      ?.find((folder) => folder.name.toLowerCase() === 'siren call 2023')
      ?.files.filter((file) => file.mimeType.includes('image') ||
file.mimeType.includes('video')) || [];

  const bugImages =
    currentFolder?.subfolders
      ?.find((folder) => folder.name.toLowerCase() === 'bug snacks 2026')
      ?.files.filter((file) => file.mimeType.includes('image') ||
file.mimeType.includes('video')) || [];

 let images: DriveFile[] = [];

if (currentFolder) {
  if (
    activeCategory === 'character design' &&
    characterFilter !== 'all'
  ) {
    const selectedSubfolder =
      currentFolder.subfolders?.find(
        (folder: any) =>
          folder.name.toLowerCase() ===
          characterFilter.toLowerCase()
      );

    images =
      selectedSubfolder?.files.filter((file: DriveFile) =>
        file.mimeType.includes('image')
      ) || [];
  } else if (activeCategory === 'character design') {
    const mainImages =
      currentFolder.files.filter(
        (file: DriveFile) =>
          file.mimeType.includes('image')
      ) || [];

    const sirenCall =
      currentFolder.subfolders
        ?.find(
          (folder: any) =>
            folder.name.toLowerCase() ===
            'siren call 2023'
        )
        ?.files.filter((file: DriveFile) =>
          file.mimeType.includes('image')
        ) || [];

    const bugSnacks =
      currentFolder.subfolders
        ?.find(
          (folder: any) =>
            folder.name.toLowerCase() ===
            'bug snacks 2026'
        )
        ?.files.filter((file: DriveFile) =>
          file.mimeType.includes('image')
        ) || [];

    images = [
      ...bugSnacks,
      ...mainImages,
      ...sirenCall,
    ];
  } else {
images =
  currentFolder.files
    .filter(
      (file: DriveFile) =>
        file.mimeType.includes('image') ||
        file.mimeType.includes('video')
    )
    .sort((a, b) => {
      const numA = parseInt(a.name.match(/^\d+/)?.[0] || "9999");
      const numB = parseInt(b.name.match(/^\d+/)?.[0] || "9999");
      return numA - numB;
    }) || [];
  }
}

 const prevImage = () => {
  if (selectedIndex === null) return;

  setZoomed(false);
  setPosition({ x: 0, y: 0 });

  setSelectedIndex(
    selectedIndex === 0
      ? images.length - 1
      : selectedIndex - 1
  );
};

const nextImage = () => {
  if (selectedIndex === null) return;

  setZoomed(false);
  setPosition({ x: 0, y: 0 });

  setSelectedIndex(
    selectedIndex === images.length - 1
      ? 0
      : selectedIndex + 1
  );
};

const handleSwipe = () => {
  const distance = touchStart - touchEnd;

  if (distance > 50) {
    nextImage();
  }

  if (distance < -50) {
    prevImage();
  }
};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () =>
      window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <main className="bg-[#f3f3f3] min-h-screen pt-6">


      {/* GALLERY */}
      <section className="max-w-[1800px] mx-auto px-6 pb-20">
   {activeCategory === 'character design' &&
characterFilter === 'all' ? (
  <>
    <h2 className="text-3xl font-black mb-8 text-center">
      Bug Snacks
    </h2>

    <div className="flex flex-col gap-16">
      {bugImages.map((image, index) => (
        <FeaturedArtworkImage
          key={image.id}
          image={image}
          onClick={() =>
            setSelectedIndex(index)
          }
        />
      ))}
    </div>
    <h2 className="text-3xl font-black  mt-24 mb-8 text-center">
      Siren Call (2023)
    </h2>

    <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
      {sirenImages.map((image, index) => (
        <ArtworkImage
          key={image.id}
          image={image}
          onClick={() =>
            setSelectedIndex(
              bugImages.length +
              mainImages.length +
              index
            )
          }
        />
      ))}
    </div>

    <h2 className="text-3xl font-black mt-24 mb-8 text-center">
      miscellaneous
    </h2>

    <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
      {mainImages.map((image, index) => (
        <ArtworkImage
          key={image.id}
          image={image}
          onClick={() =>
            setSelectedIndex(
              bugImages.length + index
            )
          }
        />
      ))}
    </div>
  </>
) : (
  <AnimatePresence mode="wait">
    <motion.div
      key={activeCategory}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={
      activeCategory === 'fine arts'
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
        : 'columns-1 md:columns-2 xl:columns-3 gap-6'
    }
    >
 {images.map((image, index) => (
  <ArtworkImage
    key={image.id}
    image={image}
    onClick={() => setSelectedIndex(index)}
  />
))}
    </motion.div>
  </AnimatePresence>
)}
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
         <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={() => {
    setSelectedIndex(null);
    setZoomed(false);
    setPosition({ x: 0, y: 0 });
  }}
  className="
    fixed
    inset-0
    bg-black/95
    z-[9999]
    flex
    items-center
    justify-center
    overflow-hidden
  "
>
            {/* CLOSE */}
        <button
            onClick={() => setSelectedIndex(null)}
              className="
                absolute
                top-5
                right-5
                z-[10000]

                w-12
                h-12

                rounded-full
                bg-black/60

                flex
                items-center
                justify-center

                text-white
                text-3xl

                hover:bg-black
                transition
              "
            >
              ✕
            </button>

            {/* PREV */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                }}
                className="
                absolute
                cursor-pointer
                left-4
                md:left-8
                top-1/2
                -translate-y-1/2

                z-[10000]

                w-16
                h-16

                rounded-full
                bg-black/60

                flex
                items-center
                justify-center

                hover:bg-black
                transition
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* NEXT */}
           <button
            onClick={(e) => {
                e.stopPropagation();
                nextImage();
            }}
            className="
                absolute
                cursor-pointer
                right-4
                md:right-8
                top-1/2
                -translate-y-1/2

                z-[10000]

                w-16
                h-16

                rounded-full
                bg-black/60

                flex
                items-center
                justify-center

                hover:bg-black
                transition
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* IMAGE */}
        <motion.img
        
       onTouchStart={(e) => {
  const now = Date.now();
  const DOUBLE_TAP_DELAY = 300;

  if (now - lastTap < DOUBLE_TAP_DELAY) {
    if (zoomed) {
      setZoomed(false);
      setPosition({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  }

  setLastTap(now);

  if (zoomed) {
    const touch = e.touches[0];

    setDragging(true);

    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  }
}
}
onTouchMove={(e) => {
  if (!zoomed) return;

  const touch = e.touches[0];

  setPosition({
    x: touch.clientX - dragStart.x,
    y: touch.clientY - dragStart.y,
  });
}}
  key={images[selectedIndex].id}
  src={`https://drive.google.com/thumbnail?id=${images[selectedIndex].id}&sz=w3000`}
  alt={images[selectedIndex].name}
  onClick={(e) => e.stopPropagation()}
  onDoubleClick={(e) => {
    e.stopPropagation();

    if (zoomed) {
      setZoomed(false);
      setPosition({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  }}
  onMouseDown={(e) => {
    if (!zoomed) return;

    setDragging(true);

    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    
  }}
  onTouchEnd={() => {
  setDragging(false);
}}
  
  animate={{
    scale: zoomed ? 2 : 1,
    x: position.x,
    y: position.y,
  }}
  transition={{
    duration: 0.2,
  }}
  className={`
    max-w-[95vw]
    max-h-[92vh]
    object-contain
    select-none
    ${
  zoomed
    ? dragging
      ? 'cursor-grabbing'
      : 'cursor-grab'
    : 'cursor-zoom-in'
    }
    `}
/>

            {/* COUNTER */}
            <div
              className="
                absolute
                bottom-6
                left-1/2
                -translate-x-1/2

                px-4
                py-2

                rounded-full
                bg-black/60

                text-white
              "
            >
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}