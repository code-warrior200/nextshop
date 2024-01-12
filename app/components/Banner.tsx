'use client'
import React from 'react';
import Slider from "react-slick";
import {sliderSix, sliderTwo, sliderThree} from "@/app/assets/slider";
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
        <div>
         <div>
          <Image src={sliderTwo} alt='sliderSix' className='' priority />
         </div>
        </div>       
      </Slider>
    </div>
  )
}

export default Banner