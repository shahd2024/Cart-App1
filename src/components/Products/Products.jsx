import React, { useContext, useEffect, useState } from "react";
import { UseProducts } from "../Hooks/useproducts";
import { Link } from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';
import {useFormik} from 'formik'
import axios from "axios";
import { productcontext } from "../../../ProductsContext/ProductContext";
export function Products() {
   let [loading,setloading]=useState(false)
    let [wishlist,setList]=useState(false)
      let [wishlistproducts,setwishproducts]=useState([])
      let [relatedpro,setrelatedpro]=useState([])
      let [searchpro,setsearchpro]=useState([])
      let {AddProduct,AddWishList,UserWishlist,Cart,setCart}=useContext(productcontext) 
      async function setproduct(id) {
  let {data}=await AddProduct(id)
  console.log(data);
  console.log(data.message);
  setCart(data)
  if (data.status=='success'){
     toast.success('Product Added Successfully !');
  }
  
  
}
      async function setwishlist(id) {
  let {data}=await AddWishList(id)
  console.log(data);
   console.log(data.data);
  setList(true)
  setwishproducts(data.data)
  console.log(wishlistproducts);
  
  console.log(data.message);
  if (data.status=='success'){
     toast.success('Product Added To Your WishList !',{
      icon: '❤️'
  });
  }
  
  
}
async function getuserwishlist() {
  let {data}=await UserWishlist()
  console.log(data.data);
  setList(true)
  let relatedwishpro=data.data
  let wishlistpro=relatedwishpro.map((pro)=>{return pro.id})
  setwishproducts(wishlistpro)
 
  
}
 function searchproduct(e) {
   
 console.log(e.target.value);
 if (e.target.value==''){
   setsearchpro(relatedpro)
 }
 else{
   let searched=[...relatedpro]
   let filterpro=searched.filter((pro)=>pro.title.split(' ').slice(0,2).join('').toLowerCase().includes(e.target.value))
   setsearchpro(filterpro)
 }
 
   
   
  
   
}
function getalldata() {
   setloading(true)
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
   setloading(false)
   console.log(data.data);
     setrelatedpro(data.data)
     setsearchpro(data.data)
  }).catch((error)=>{
   console.log(error);
   setloading(false)
  })
 
   
}

useEffect(()=>{
  getuserwishlist()
   
   getalldata()
}, [])



    if (loading){
      return <div class="sk-chase mx-auto mt-[80px] max-sm:mt-[100px] md:mt-[100px]">
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
   
    <div className="container mx-auto mt-[70px] max-sm:mt-[100px] ">
  <div className="max-sm:mt-[100px] md:mt-[100px] lg:mt-[100px] mb-7">
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative max-sm:mt-[100px]">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        onInput={(e) => searchproduct(e)}
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#6bf06b] focus:border-[#5cd65c]"
        placeholder="Search..."
        required
      />
    </div>
  </div>

  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
    {searchpro?.map((product) => (
      <div
        className="relative group/parent hover:shadow-xl hover:shadow-[green] transition-all duration-[500ms] rounded-2 px-2 py-3 overflow-hidden"
        key={product.id}
      >
        <Link to={`productdetails/${product.id}/${product.category.name}`}>
          <div className="product text-center px-2 py-3">
            <img src={product?.imageCover} alt="" className="w-[90%] mx-auto" />
            <h2 className="text-[green] mt-1">{product?.category?.name}</h2>
            <h2 className="font-semibold">
              {product?.title?.split(' ').slice(0, 2).join(' ')}
            </h2>
            <div className="price flex justify-between mt-2">
              <span className="font-semibold">{product?.price} EGP</span>
              <span>
                {product?.ratingsAverage}{' '}
                <i className="fa-solid fa-star text-yellow-300"></i>
              </span>
            </div>
          </div>
        </Link>

        <div className="grid mt-2 mb-2">
          <span
            className={`justify-self-end ${
              wishlist === true && wishlistproducts.includes(product.id)
                ? 'text-[red]'
                : 'text-black'
            }`}
            onClick={() => setwishlist(product.id)}
          >
            <i className="fa-solid fa-heart text-2xl cursor-pointer"></i>
          </span>
        </div>

        <div className="absolute mt-4 justify-self-center top-0 bottom-0 start-0 end-0 translate-y-[100%] opacity-0 group-hover/parent:opacity-100 group-hover/parent:translate-y-[90%] transition-all duration-[500ms]">
          <button
            className="bg-[#2ece2e] text-white p-2 rounded-2 mb-1"
            onClick={() => setproduct(product.id)}
          >
            + add product
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
   )
}