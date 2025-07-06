import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export function CategorySlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay:true
  };
  let [loading,setloading]=useState(false)
    let [allcategories,setallcategories]=useState([])
   function getAllcategories() {
      setloading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((response)=>{
      console.log(response.data.data);
     setallcategories(response.data.data)
      setloading(false)
      }).catch((error)=>{
         console.log(error);
         setloading(false)
         
      })
   }
   useEffect(()=>{
     getAllcategories()
   },[])
   if (loading){
      return <div class="sk-chase mx-auto mt-8">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>
   }
   return(
    <>
    <div className="container mx-auto mt-[70px] ">
        <Slider {...settings} className=" ">
    {allcategories.map((categ)=><div className="w-1/6 max-sm:w-full " > 
    <Link >
    <div className="first m-5  w-full" key={categ.id}>
    
    <img src={categ?.image} alt="" className="w-full  pb-2 h-[200px] max-sm::h-[100px] object-cover" />
    
</div>
</Link>
</div>)}
    </Slider>
    </div>
    
    </>
   )
}