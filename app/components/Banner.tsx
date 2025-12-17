"use client";

import React from "react";
import { sliderOne, sliderTwo, sliderThree } from "@/app/assets";
import Image from "next/image";
import { Clock, Smartphone, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    image: sliderOne,
    title: "Latest Smartphones",
    subtitle: "Get the best products for you",
    description: "Browse the latest phones in the Market and get the one you've dreamt of",
  },
  {
    image: sliderTwo,
    title: "Premium Watches",
    subtitle: "Timeless Elegance",
    description: "Discover our collection of premium watches that combine style and functionality",
  },
  {
    image: sliderThree,
    title: "Top Accessories",
    subtitle: "Complete Your Look",
    description: "Find the perfect accessories to complement your tech lifestyle",
  },
];

const infoCards = [
  {
    icon: Clock,
    title: "Working Hours",
    subtitle: "Saturday - Thursday",
    description: "7:00 AM - 8:00 PM",
  },
  {
    icon: Smartphone,
    title: "Order by Phone",
    subtitle: "+880 1234 567890",
    description: "Call us anytime",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    subtitle: "Mirpur, Dhaka",
    description: "Bangladesh",
  },
  {
    icon: Mail,
    title: "Email Us",
    subtitle: "support@niceshop.com",
    description: "Get an invoice",
  },
];

const Banner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="relative">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[500px] lg:h-[700px] bg-gradient-to-r from-slate-100 to-slate-200">
                {/* Image Section */}
                <div className="absolute inset-0 lg:left-auto lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full"
                  >
                    <div className="absolute inset-0 bg-designColor/20 lg:w-1/3 lg:left-0 z-0" />
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain lg:object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="max-w-xl lg:max-w-2xl"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm md:text-base uppercase tracking-wider text-zinc-600 mb-4"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-zinc-900"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-base md:text-lg text-zinc-600 mb-8 max-w-md"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button
                          size="lg"
                          className="bg-designColor hover:bg-designColor/90 text-white font-semibold"
                        >
                          Shop Now
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 lg:left-8" />
        <CarouselNext className="right-4 lg:right-8" />
      </Carousel>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden lg:block"
      >
        <div className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-designColor/10 flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-designColor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-zinc-600">{card.subtitle}</p>
                    <p className="text-xs text-zinc-500">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;