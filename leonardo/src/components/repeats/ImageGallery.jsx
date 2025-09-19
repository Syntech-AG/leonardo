import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-gray-100 rounded-md flex items-center justify-center">
        No Image
      </div>
    );
  }

  return (
    <div className="flex md:flex-row-reverse flex-col items-start max-lg:items-center max-md:gap-4">
      <div className="flex flex-col items-center gap-4 h-full">
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="h-full w-auto"
        />
        <div className="flex flex-row gap-4">
          <button onClick={handlePrev} className="bg-[#F6F6F6] p-1">
            <HiChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={handleNext} className=" bg-[#F6F6F6] p-1">
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex md:flex-col flex-row gap-4 pt-0 md:w-[30%] md:h-[90%]">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={` ring-2 ring-offset-2 ${
              currentIndex === index ? "ring-yellow-500" : "ring-transparent"
            }`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="" />
          </button>
        ))}
      </div>
    </div>
  );
}
