// src/pages/art-gallery.tsx

import React from "react";
import ArtGallery from "../../components/ArtGallery";

const artworks = [
  
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
