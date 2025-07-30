"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 items-center justify-center">
      {/* Main Image */}
      <div
        className="relative bg-white w-92 h-92 rounded-lg overflow-hidden group flex items-center justify-center"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={alt}
          width={480}
          height={720}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex w-fit flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 items-center justify-center mt-4 md:mt-0 overflow-x-auto md:overflow-x-visible">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-20 h-26 md:w-28 md:h-32 rounded border-2 overflow-hidden transition-all ${
              index === currentIndex
                ? "border-foreground ring-2 ring-primary"
                : "border-tertiary hover:border-foreground"
            }`}
            onClick={() => goToSlide(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${alt} thumbnail ${index + 1}`}
              width={240}
              height={480}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
