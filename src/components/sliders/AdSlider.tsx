import NextImage from '@/components/NextImage';
import * as React from 'react';
import Slider from 'react-slick';

// interface AdSliderInterface {
//   banner: any[];
// }

export default function AdSlider() {
  const settings = {
    speed: 500,
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    <NextImage
      key={99}
      width={320}
      height={369}
      alt=''
      src='/images/ad_slider_image.png'
    />,
    <NextImage
      key={101}
      width={320}
      height={369}
      alt=''
      src='/images/ad_slider_image.png'
    />,
    <NextImage
      key={301}
      width={320}
      height={369}
      alt=''
      src='/images/ad_slider_image.png'
    />,
  ];

  return (
    <>
      <div className='h-full w-full min-w-[250px] max-w-[320px] overflow-hidden rounded-[20px] lg:w-[320px]'>
        <Slider {...settings}>
          {slides.map((slide, i: number) => (
            <div
              key={i}
              className='h-[369px] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-white lg:w-[917px]'
            >
              {slide}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
