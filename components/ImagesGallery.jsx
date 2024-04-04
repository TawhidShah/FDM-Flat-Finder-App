import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImagesGallery = ({ title, images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      <div className="flex justify-between p-8">
        <div></div>
        <h2 className="text-xl font-semibold text-white">
          {currentImageIndex + 1} / {images.length}{" "}
        </h2>
        <button className="text-white" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <button
          className="absolute left-0 ml-20 h-full w-1/2 text-white"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="z-10000 object-cover"
        />
        <button
          className="absolute right-0 mr-20 h-full w-1/2 text-white"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="ml-auto" />
        </button>
      </div>
    </div>
  );
};

export default ImagesGallery;
