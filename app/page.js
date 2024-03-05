'use client'
import BasicTable from "@/components/table/BasicTable";
import ExpandRowTable from "@/components/table/ExpandRowTable";
import { useEffect, useState } from 'react';

const images = [
  "/tech.gif",
  "/earth.gif",
  "/doddle.gif",
  "/chill.webp",
  "/bg.gif"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);

  useEffect(() => {
    const preloadImages = () => {
      const imagesArray = [];
      for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
        imagesArray.push(img);
      }
      setPreloadedImages(imagesArray);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 30000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-10 h-screen overflow-hidden md:w-full lg:max-w-7xl mx-auto">
      {preloadedImages.length > 0 && (
          <>
            {preloadedImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={`background-${index}`}
                className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 object-cover"
                style={{ opacity: index === currentIndex ? 1 : 0 }}
              />
            ))}
          </>
        )}
      <div className="h-full w-full border-4 bg-white/60 backdrop-blur-xl border-blue-400 overflow-auto rounded-2xl scrollbar scrollbar-thumb-sky-500" style={{ position: 'relative' }}>
        
        <ExpandRowTable/>
        {/* <BasicTable/> */}
      </div>
    </main>
  );
}