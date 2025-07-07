import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UseProducts } from "../Hooks/useproducts";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { productcontext } from "../../../ProductsContext/ProductContext";
export function AllProducts() {
   let [allproducts,setallproducts]=useState([])
   let [wishlist,setList]=useState(false)
   let [wishlistproducts,setwishproducts]=useState([])
   let {AddProduct,AddWishList,UserWishlist,Cart,setCart}=useContext(productcontext) 
let {data,isLoading}=UseProducts()
console.log(data?.data?.data);
async function setproduct(id) {
  console.log(id);
  
  let {data}=await AddProduct(id)
  console.log(data);
  setCart(data)
  console.log(data.message);
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
useEffect(()=>{
  getuserwishlist()

},[])


    if (isLoading){
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
    {/* <div className="container  mx-auto mt-9 mb-0">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
       {data?.data?.data.map((product)=> <div className="relative group/parent hover:shadow-xl hover:shadow-[green] transition-all duration-[500ms] rounded rounded-2 px-2 py-3" key={product.id}>
        <Link to={`productdetails/${product.id}/${product.category.name}`}>
        <div key={product.id} className="product text-center  px-2 py-3  ">
            <img src={product?.imageCover} alt="" className="w-[90%]"/>
            <h2 className="text-[green] mt-1" >{product?.category?.name}</h2>
            <h2 className="font-semibold">{product?.title?.split(' ').slice(0,2).join('')}</h2>
            <div className="price flex justify-between mt-2">
               <span className="font-semibold">{product?.price}EGP</span>
              <span>{product?.ratingsAverage} <i class="fa-solid fa-star text-yellow-300"></i></span>
            </div>
          
         </div></Link>
          <div className="grid  mt-2  mb-4">
             <span className={`justify-self-end ${wishlist==true&&wishlistproducts.includes(product.id)?'text-[red]':'text-black'} `} onClick={()=>setwishlist(product.id)}><i className={'fa-solid fa-heart text-2xl cursor-pointer'}></i></span>
            
           </div>
        <div className="absolute mt-4 justify-self-center top-0 bottom-0 start-0 end-0  translate-y-[400%] opacity-0 group-hover/parent:opacity-100 group-hover/parent:translate-y-[90%] transition-all duration-[500ms] ">
               <button className="bg-[#2ece2e] text-white p-2 rounded rounded-2 mb-1" onClick={()=>setproduct(product.id)}>+ add product</button>
             </div></div>)}

      </div>

    </div> */}
    <div className="container mx-auto mt-9  ">
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
    {data?.data?.data.map((product) => (
      <div
        className="relative group/parent hover:shadow-xl hover:shadow-[green] transition-all duration-[500ms] rounded-2xl px-2 py-3 overflow-hidden"
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

        <div className="grid mt-2">
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

        <div className="absolute justify-self-center top-0 bottom-0 start-0 end-0 translate-y-[100%] opacity-0 group-hover/parent:opacity-100 group-hover/parent:translate-y-[90%] transition-all duration-[500ms]">
          <button
            className="bg-[#2ece2e] text-white p-2 rounded-lg mb-1"
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