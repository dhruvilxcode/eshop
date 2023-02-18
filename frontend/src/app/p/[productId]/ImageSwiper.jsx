"use client";

import Image from "next/image";

export default function ImageSwiper({ images }) {
  return (
    <div className="flex flex-col gap-4">
      {images.map((img, index) => (
        <div key={index} className="w-full">
          <Image
            src={img.secure_url}
            alt="product image"
            className="w-full object-cover rounded-xl"
            width={500}
            height={700}
          />
        </div>
      ))}
    </div>
  );
}
