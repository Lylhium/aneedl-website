'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DriveFile } from '../types';

interface LightboxProps {
  images: DriveFile[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

export default function Lightbox({
  images,
  selectedIndex,
  setSelectedIndex,
}: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [imgSrc, setImgSrc] = useState('');

  const touchStartX = useRef(0);

  useEffect(() => {
    if (selectedIndex === null) return;

    setImgSrc(
      `https://drive.google.com/thumbnail?id=${images[selectedIndex].id}&sz=w2000`
    );
  }, [selectedIndex, images]);

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
  }, [selectedIndex, images.length]);

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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, zoomed, dragStart]);

  if (
    selectedIndex === null ||
    !images[selectedIndex]
  )
    return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setSelectedIndex(null);
          setZoomed(false);
          setPosition({ x: 0, y: 0 });
        }}
        onTouchStart={(e) => {
          touchStartX.current =
            e.targetTouches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (zoomed) return;

          const touchEndX =
            e.changedTouches[0].clientX;

          const distance =
            touchStartX.current - touchEndX;

          if (distance > 50) nextImage();
          if (distance < -50) prevImage();
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="
            absolute
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="
            absolute
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
        <motion.img
          key={images[selectedIndex].id}
          src={imgSrc}
          alt={images[selectedIndex].name}
          loading="eager"
          onError={() => {
            if (imgSrc.includes('w2000')) {
              setImgSrc(
                `https://drive.google.com/thumbnail?id=${images[selectedIndex].id}&sz=w1000`
              );
            } else if (
              imgSrc.includes('w1000')
            ) {
              setImgSrc(
                `https://drive.google.com/thumbnail?id=${images[selectedIndex].id}&sz=w600`
              );
            }
          }}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => {
            e.stopPropagation();

            setZoomed(!zoomed);
            setPosition({ x: 0, y: 0 });
          }}
          onMouseDown={(e) => {
            if (!zoomed) return;

            setDragging(true);

            setDragStart({
              x: e.clientX - position.x,
              y: e.clientY - position.y,
            });
          }}
          onTouchStart={(e) => {
            const now = Date.now();

            if (now - lastTap < 300) {
              setZoomed(!zoomed);
              setPosition({ x: 0, y: 0 });
            }

            setLastTap(now);

            if (zoomed) {
              setDragging(true);

              setDragStart({
                x:
                  e.touches[0].clientX -
                  position.x,
                y:
                  e.touches[0].clientY -
                  position.y,
              });
            }
          }}
          onTouchMove={(e) => {
            if (!zoomed) return;

            setPosition({
              x:
                e.touches[0].clientX -
                dragStart.x,
              y:
                e.touches[0].clientY -
                dragStart.y,
            });
          }}
          onTouchEnd={() => setDragging(false)}
          animate={{
            scale: zoomed ? 2 : 1,
            x: position.x,
            y: position.y,
          }}
          transition={{ duration: 0.2 }}
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
    </AnimatePresence>
  );
}