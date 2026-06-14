'use client';

import { ArtworkImage, FeaturedArtworkImage } from './ArtworkImage';
import { DriveFile } from '../types'; 

interface Props {
  bugImages: DriveFile[];
  sirenImages: DriveFile[];
  mainImages: DriveFile[];
  setSelectedIndex: (index: number) => void;
}

export default function PortfolioGallery({ bugImages, sirenImages, mainImages, setSelectedIndex }: Props) {
  return (
    <>
      <h2 className="text-2xl font-black text-[#424242] bold mb-6 text-center">Bug Snacks</h2>
      {bugImages.length > 0 && (
        <div className="space-y-2">
          <FeaturedArtworkImage
            image={bugImages[0]}
            onClick={() => setSelectedIndex(0)}
          />
          <div className="md:grid-cols-2 gap-4">
            {bugImages.slice(1).map((image, index) => (
              <ArtworkImage
                key={image.id}
                image={image}
                onClick={() => setSelectedIndex(index + 1)}
                showCaption={false}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl text-[#424242] font-black mt-6 mb-6 text-center">Siren Call (2023)</h2>
      <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
        {sirenImages.map((image, index) => {
          const isLastSingle = sirenImages.length % 3 === 1 && index === sirenImages.length - 1;
          return (
            <div key={image.id} className={isLastSingle ? "xl:col-start-2" : ""}>
              <ArtworkImage
                image={image}
                onClick={() => setSelectedIndex(bugImages.length + index)}
                showCaption={false}
              />
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl text-[#424242] font-black mt-6 mb-6 text-center">miscellaneous</h2>
      <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
        {mainImages.map((image, index) => (
          <div key={image.id} className="mb-6 break-inside-avoid">
            <ArtworkImage
              image={image}
              onClick={() => setSelectedIndex(bugImages.length + sirenImages.length + index)}
              showCaption={false}
            />
          </div>
        ))}
      </div>
    </>
  );
}