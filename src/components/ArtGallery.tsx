"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';
import Logo from "../../public/art/sirenCall2023/logo.png";

type Artwork = {
  title: string;
  description: string;
  imageUrl: string;
};

interface ArtGalleryProps {
  artworks: Artwork[];
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ artworks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const showPrev = () =>
    setSelectedIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  const showNext = () =>
    setSelectedIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));

  return (
    <div className="art-gallery">
<div className="w-120 mx-auto mb-4 pt-15">
      <Image
        src={Logo}
        alt="Siren Call Logo"
        width={1000}
        height={1000}
        className="w-full h-auto"
      />
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="bg-white rounded-sm shadow-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              width={1200}
              height={800}
              layout="responsive"
              className="object-cover w-full h-full"
            />
            <div className="p-6">
              <h3 className="font-semibold text-xl">{artwork.title}</h3>
              <p className="text-gray-600">{artwork.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl z-50"
            >
              <X size={32} />
            </button>

            <Zoom>
              <Image
                src={artworks[selectedIndex].imageUrl}
                alt={artworks[selectedIndex].title}
                width={2000}
                height={2000}
                layout="responsive"
                className="rounded-xl object-contain"
              />
            </Zoom>

            {/* Flechas solo en pantallas medianas o mayores */}
            <button
              onClick={showPrev}
              className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-40 hover:bg-opacity-60 p-2 rounded-full"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={showNext}
              className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-40 hover:bg-opacity-60 p-2 rounded-full"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGallery;
