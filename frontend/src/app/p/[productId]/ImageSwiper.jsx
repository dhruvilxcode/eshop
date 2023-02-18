"use client";
import React from "react"
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

// export default function ImageSwiper({ images }) {
//   return (
//     <div className="flex flex-col gap-4">
//       {images.map((img, index) => (
//         <div key={index} className="w-full">
//           <Image
//             src={img.secure_url}
//             alt="product image"
//             className="w-full object-cover rounded-xl"
//             width={500}
//             height={700}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          console.log('clicked');
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function ImageSwiper({ images }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,

  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
       {images.map((img, index) => (
         <div key={index} className="-z-50 keen-slider__slide">
           <Image
             src={img.secure_url}
             alt="product image"
             className="w-full object-cover rounded-xl"
             width={400}
             height={600}
           />
         </div>
       ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider  mt-4 -z-50 thumbnail">
      {images.map((img, index) => (
         <div key={index} className="w-full keen-slider__slide cursor-pointer">
           <Image
             src={img.secure_url}
             alt="product image"
             className="w-full object-cover rounded-xl"
             width={300}
             height={300}
           />
         </div>
       ))}
      </div>
    </>
  );
}