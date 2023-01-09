import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import'swiper/css/autoplay'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './PSlider.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import Pic1 from '../.././images/pic.jpg'
import Pic2 from '../.././images/home-img.png'
import Pic3 from '../.././images/pic.jpg'
import { excerpt } from '../../utility';
import { Slide } from 'react-toastify';
import Slides from './Slides';


const PSlider = ({petition}) => {
  
  return (
    <div className='PSlider-container'>
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{delay:3000}}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {petition.map((slide)=>{
            return(
            <SwiperSlide>
              <Slides imageUrl={slide.imageUrl} title={slide.title} description={slide.description} goal={slide.goal} id={slide.id}/>
            </SwiperSlide>
            )
        })}
      ...
    </Swiper>
    </div>
  )
}

export default PSlider