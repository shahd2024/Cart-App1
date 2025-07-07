import axios from "axios";
import React, { useEffect, useState } from "react";

export function Brands() {
    let [brand,setbrand]=useState(null)
     let [loading,setloading]=useState(false)
   function getAllbrands() {
         setloading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({data})=>
      {
            setloading(false)
         console.log(data.data);
         
       
         setbrand(data.data)

      }
      )
      .catch((error)=>{
            setloading(false)
         console.log(error);
         
      })
   }
   useEffect(()=>{
      getAllbrands()
   },[])
     if(loading){
        return <div class="sk-chase mx-auto max-sm:mt-[100px] sm:mt-[110px] md:mt-[100px] lg:mt-[90px] xl:mt-[90px]">
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
    <div className="container mx-auto max-sm:mt-[100px] sm:mt-[110px] md:mt-[100px] lg:mt-[90px] xl:mt-[90px] ">
   <div className="grid max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-2">
      {brand?.map((pro)=><div className="mx-3 rounded rounded-2 border-2 border-[#bdb2b2] pb-4 hover:shadow-xl hover:shadow-[green] my-2">
         <img src={pro.image} alt="" className=" w-full object-fit-cover" />
         <h2 className=" mt-6  text-2xl text-center font-semibold">{pro.name}</h2>
      </div>)}
   </div>
  </div>
    </>
   )
}