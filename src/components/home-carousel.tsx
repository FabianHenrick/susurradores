"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HomeCarousel() {
  return (
    <Carousel
      className=" relative -mt-[80px] w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      plugins={[
        Autoplay({
          delay: 8000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="">
          <div className="h-85 bg-red-400 flex items-center justify-center">
            <Image
              src="https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
              alt="Carousel image"
              fill
            />
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="h-160 bg-green-400 flex items-center justify-center">
            <Image
              src="https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
              alt="Carousel image"
              fill
            />
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="bg-blue-400 flex items-center justify-center">
            <Image
              src="https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
              alt="Carousel image"
              fill
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-4 z-10" />
      <CarouselNext className="right-4 z-10" />
    </Carousel>
  );
}
