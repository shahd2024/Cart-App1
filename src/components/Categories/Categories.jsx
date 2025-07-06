import axios from "axios";
import React, { useEffect, useState } from "react";

export function Categories() {
   let [categ,setcateg]=useState(null)
   let [loading,setloading]=useState(false)
   function getAllcategories() {
      setloading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>
      {
          setloading(false)
         console.log(data.data);
         setcateg(data.data)

      }
      )
      .catch((error)=>{
          setloading(false)
         console.log(error);
         
      })
   }
   useEffect(()=>{
      getAllcategories()
   },[])
   if(loading){
        return <div class="sk-chase mx-auto mt-[80px]">
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
  <div className="container mx-auto mt-[90px] ">
   <div className="grid max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2">
      {categ?.map((pro)=><div className="rounded rounded-2 border-2 border-[#bdb2b2] pb-4 hover:shadow-xl hover:shadow-[green] w-[90%] my-2">
         <img src={pro.image} alt="" className="h-[300px] w-full object-fit-cover" />
         <h2 className=" mt-6 text-[green] text-2xl text-center font-semibold">{pro.name}</h2>
      </div>)}
   </div>
  </div>
    </>
   )
}