// src/pages/art-gallery.tsx

import React from "react";
import Image from "next/image";
import ArtGallery from "../../../components/ArtGallery";
import Logo from "../an33dl/public/logo.png";

const artworks = [
    {
        title: "Character Lineup",
        description: "Description for artwork 5",
        imageUrl: "/art/sirenCall2023/5.jpg", 
      },
  {
    title: "Qpid",
    description: "Reference Sheet",
    imageUrl: "/art/sirenCall2023/1.jpg", 
  },
  {
    title: "E.L.",
    description: "Description for artwork 2",
    imageUrl: "/art/sirenCall2023/2.jpg",
  },
  {
    title: "Chérie",
    description: "Description for artwork 3",
    imageUrl: "/art/sirenCall2023/3.jpg", 
  },
  {
    title: "TriXX",
    description: "Description for artwork 4",
    imageUrl: "/art/sirenCall2023/4.jpg",
  },
  {
    title: "Logo",
    description: "This is the logo of the series",
    imageUrl: "/art/sirenCall2023/logo.jpg", 
  },
];

const ArtGalleryPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">

      
      <ArtGallery artworks={artworks} />
    </div>
  );
};

export default ArtGalleryPage;
