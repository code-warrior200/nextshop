'use client'
import React from 'react';
import Slider from "react-slick";
import {sliderOne} from "@/app/assets";
import Image from 'next/image';

const Banner = () => {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='lg:min-h-screen relative'>
      <Slider {...settings}>
        <div className='w-full py-32 lg:py-0 lg:h-screen bg-slate-200 relative'>
         <div className='w-full lg:w-1/3 hidden lg:inline-block h-full bg-designColor z-0 relative'>
          <Image src={sliderOne} alt='sliderfive' className='absolute object-cover right-0 lg:-right-48 lg:h-screen ' priority/>
         </div>
         <div className='lg:absolute lg:top-1/2 lg:left-2/3 transform lg:translate-x-1/2 lg:translate-y-1/2 flex flex-col items-center gap-5 '>
          <p>Get the best products for you</p>
          <p>
            Browse the latest phones in the Market and get the one dreamt for 
          </p>
         </div>
        </div>       
      </Slider>
    </div>
  )
}

export default Banner