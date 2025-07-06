import React from "react";
import Slider from "react-slick";
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
export function MainSlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
   return(
    <>
  <div className="container mx-auto sm:mt-[70px]  ">
   <div className="grid max-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[70%_minmax(0,1fr)]">
   <div className="slider ">
         <Slider {...settings} className="">
      <img src={slider1} alt="" className="w-full h-[400px]"/>
       <img src={slider2} alt="" className="w-full h-[400px]"/>
        <img src={slider3} alt="" className="w-full h-[400px]"/>
    </Slider>
     
   </div>
   <div>
 <img src={slider2} alt="" className="w-full h-[200px]"/>
 <img src={slider3} alt="" className="w-full h-[200px]"/>
   </div>
   </div>

  </div>
    </>
   )
}