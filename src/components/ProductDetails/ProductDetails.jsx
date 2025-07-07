import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

import toast, { Toaster } from 'react-hot-toast';
import { productcontext } from "../../../ProductsContext/ProductContext";
export function ProductDetails() {
   let [loading,setloading]=useState(false)
     var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  let {AddProduct,Cart,setCart}=useContext(productcontext)
   let [product,setproduct]=useState(null)
   let [relatedpro,setrelatedpro]=useState([])
   let {id,categ}=useParams()
   console.log(id);
   function getspecificproduct() {
      setloading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
         console.log(data.data);
         setproduct(data.data)
         setloading(false)
      }).catch((error)=>{
          console.log(error);
          setloading(false)
          
      })
      
   }
    function getrelatedproduct() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
         console.log(data.data);
         
         let products=data.data
         let relatedproduct=products.filter((product)=>{
           return product?.category?.name==categ
         })
         console.log(relatedproduct);
         setrelatedpro(relatedproduct)
         
        
         
      }).catch((error)=>{
          console.log(error);
          
      })
      
   }
   async function setproducts(id) {
  let {data}=await AddProduct(id)
  console.log(data);
  console.log(data.message);
  setCart(data)
  if (data.status=='success'){
     toast.success('Product Added Successfully !');
  }
  
  
}
   useEffect(()=>{
   getspecificproduct()
   getrelatedproduct()
   },[id,categ])
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
     <div className="container mx-auto mt-[70px]">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 ">
         <div className="first max-sm:mb-4">
             <Slider {...settings} className="md:w-[60%] sm:w-full ">
        {product?.images.map((src)=> <img src={src} alt="" className="w-full mt-4 " />)}
    </Slider>
           
         </div>
         <div className="second  flex flex-col justify-center">
            <h2 className="text-[green] mt-1 text-center " >{product?.category?.name}</h2>
            <h2 className="font-semibold text-center mb-4">{product?.title?.split(' ').slice(0,2).join('')}</h2>
             <div className="price flex justify-between mt-6">
               <span className="font-semibold">{product?.price}EGP</span>
              <span>{product?.ratingsAverage} <i class="fa-solid fa-star text-yellow-300"></i></span>
             
            </div>
             <button className="bg-[#2ece2e] text-white p-2 rounded rounded-2 mt-3" onClick={()=>setproducts(product.id)}>+ add product</button>
         </div>

      </div>

     </div>
      <div className="container  mx-auto mt-9">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
       {relatedpro?.map((product)=> <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        <div key={product.id} className="product text-center rounded rounded-2 px-2 py-3  hover:shadow-xl hover:shadow-[green] transition-all duration-[500ms] group/parent">
            <img src={product?.imageCover} alt="" className="w-[90%]"/>
            <h2 className="text-[green] mt-1" >{product?.category?.name}</h2>
            <h2 className="font-semibold">{product?.title?.split(' ').slice(0,2).join('')}</h2>
            <div className="price flex justify-between mt-2">
               <span className="font-semibold">{product?.price}EGP</span>
              <span>{product?.ratingsAverage} <i class="fa-solid fa-star text-yellow-300"></i></span>
            </div>
           
           
         
         </div></Link>)}

      </div>

    </div>
    </>
   )
}