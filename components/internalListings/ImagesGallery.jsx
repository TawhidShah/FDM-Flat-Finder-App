import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImagesGallery = ({ title, images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const onKeydown = (event) => {
      if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", onKeydown);

    return () => document.body.removeEventListener("keydown", onKeydown);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeRight = distance > minSwipeDistance;
    const isSwipeLeft = distance < -minSwipeDistance;

    if (isSwipeRight) {
      nextImage();
    } else if (isSwipeLeft) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-between p-8">
        <div></div>
        <h2 className="text-xl font-semibold text-white">
          {currentImageIndex + 1} / {images.length}{" "}
        </h2>
        <button className="text-white" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-between">
        <button
          className="hidden h-full p-4 text-white md:p-32 lg:inline-block"
          onClick={(e) => {
            prevImage();
            e.currentTarget.blur();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="z-10000 mx-auto max-h-[80vh] min-h-[60vh] w-full object-contain lg:max-w-[70vw] "
        />
        <button
          className="hidden h-full p-4 text-white md:p-32 lg:inline-block"
          onClick={(e) => {
            nextImage();
            e.currentTarget.blur();
          }}
          aria-label="Next image"
        >
          <ChevronRight className="ml-auto" />
        </button>
      </div>
    </div>
  );
};

export default ImagesGallery;
