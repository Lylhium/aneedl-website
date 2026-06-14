'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DriveFile } from '../../src/types';

export function ArtworkImage({
  image,
  onClick,
  showCaption = false,
}: {
  image: DriveFile;
  onClick: () => void;
  showCaption?: boolean;
}) {
  // Empezamos pidiendo una miniatura de buena calidad
  const [imgSrc, setImgSrc] = useState(
    `https://drive.google.com/thumbnail?id=${image.id}&sz=w1000`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="cursor-pointer mb-2 w-full"
      onClick={onClick}
    >
      <div className="w-full rounded-sm overflow-hidden">
        {image.mimeType.includes('video') ? (
          <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-sm overflow-hidden">
            <iframe
              src={`https://drive.google.com/file/d/${image.id}/preview`}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <motion.img
            src={imgSrc}
            alt={image.name}
            loading="lazy"
            className="w-full h-auto transition-transform duration-300 hover:scale-[1.01]"
            onError={() => {
              // Si falla la grande, intentamos con una mediana para evitar que se rompa
              if (imgSrc.includes('w1000')) {
                setImgSrc(`https://drive.google.com/thumbnail?id=${image.id}&sz=w600`);
              }
            }}
          />
        )}
      </div>
      {showCaption && (
        <h2 className="text-xl font-bold mt-2 text-center break-words">
          {image.name}
        </h2>
      )}
    </motion.div>
  );
}

export function FeaturedArtworkImage({
  image,
  onClick,
}: {
  image: DriveFile;
  onClick: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(
    `https://drive.google.com/thumbnail?id=${image.id}&sz=w2000`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="max-w-[1300px] mx-auto">
        {image.mimeType.includes('video') ? (
           <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-sm overflow-hidden">
            <iframe
              src={`https://drive.google.com/file/d/${image.id}/preview`}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <motion.img
             src={imgSrc}
            alt={image.name}
            loading="lazy"
            className="
                block
                w-full
                h-auto
                rounded-sm
            "
            onError={() => {
              if (imgSrc.includes('w2000')) {
                setImgSrc(`https://drive.google.com/thumbnail?id=${image.id}&sz=w1000`);
              }
            }}
          />
        )}
      </div>
    </motion.div>
  );
}