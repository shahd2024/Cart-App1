import React from "react";
import error from '../../assets/error.svg'
export function NotFound() {
   return(
    <>
   <img src={error} alt="" className="w-1/2 max-sm:mt-[100px] lg:mt-[70px] mx-auto" />
    </>
   )
}