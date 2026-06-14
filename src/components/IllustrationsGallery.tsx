'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArtworkImage } from './ArtworkImage';
import { DriveFile } from '../../src/types';

interface Props {
  images: DriveFile[];
  activeCategory: string;
  setSelectedIndex: (index: number) => void;
}

export default function IllustrationsGallery({
  images,
  activeCategory,
  setSelectedIndex,
}: Props) {
  const pattern = [
    'col-span-12', // Hero

    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-6',

    'col-span-12 md:col-span-8',
    'col-span-12 md:col-span-4',

    'col-span-12 md:col-span-4',
    'col-span-12 md:col-span-8',

    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-6',
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="
          max-w-[1400px]
          mx-auto
          grid
          grid-cols-12
          gap-5
          items-start
        "
      >
        {images.map((image, index) => {
          const layout = pattern[index % pattern.length];

          return (
            <div
              key={image.id}
              className={`
                ${layout}
                w-full
                overflow-hidden
              `}
            >
              <ArtworkImage
                image={image}
                onClick={() => setSelectedIndex(index)}
                showCaption={false}
              />
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}