import React from "react";
import { AllProducts } from "../AllProducts/AllProducts";
import { CategorySlider } from "../CategorySlider/CategorySlider";
import { MainSlider } from "../MainSlider/MainSlider";

export function Home() {
   return(
    <>
    <MainSlider/>
    <CategorySlider/>
    <AllProducts/>
    </>
   )
}