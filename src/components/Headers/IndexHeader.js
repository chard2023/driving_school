/*eslint-disable*/
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

// reactstrap components
import { Container } from "reactstrap";

// core components
import "./IndexHeader.scss"

function IndexHeader() {
  SwiperCore.use([Autoplay]);
  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img src={require('assets/img/carousel-1a.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-1b.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-1c.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-2.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-3.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-4.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-5.png')} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('assets/img/carousel-6.png')} alt="Slide 1" />
        </SwiperSlide>

      </Swiper>
    </div>
  );
}

export default IndexHeader;
