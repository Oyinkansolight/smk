import * as React from 'react';
import Slider from 'react-slick';

import NextImage from '@/components/NextImage';

// interface InstitutionSliderInterface {
//   banner: any[];
// }

export default function InstitutionSlider() {
  const settings = {
    speed: 500,
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const tab_settings = {
  //   speed: 500,
  //   dots: false,
  //   infinite: true,
  //   autoplay: true,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  // };

  // const mobile_settings = {
  //   speed: 500,
  //   dots: false,
  //   infinite: true,
  //   autoplay: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const slides = [
    <NextImage
      key={99}
      width={917}
      height={408}
      alt=''
      src='/images/slider_image_1.png'
    />,
    <NextImage
      key={101}
      width={917}
      height={408}
      alt=''
      src='/images/slider_image_1.png'
    />,
    <NextImage
      key={301}
      width={917}
      height={408}
      alt=''
      src='/images/slider_image_1.png'
    />,
  ];

  // const slides = banner.map((b) => (
  //   <NextImage
  //     key={99}
  //     width={562}
  //     height={248}
  //     alt={b.redirectUrl}
  //     src={b.url}
  //     className='bg-contain'
  //   />
  // ));

  return (
    <>
      <div className='w-full min-w-[34.125rem] max-w-[917px] overflow-hidden rounded-[20px] lg:w-[917px]'>
        <Slider {...settings}>
          {slides.map((slide, i: number) => (
            <div
              key={i}
              className='h-[408px] w-full max-w-[917px] overflow-hidden rounded-[20px] bg-white lg:w-[917px]'
            >
              {slide}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
