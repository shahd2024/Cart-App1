import React, { useContext, useEffect, useState } from "react";

import toast, { Toaster } from 'react-hot-toast';
import { productcontext } from "../../../ProductsContext/ProductContext";
export function WishList() {
   let [wishlist,setwishlist]=useState(null)
   let{UserWishlist,removewishlist,AddProduct,Cart,setCart}=useContext(productcontext)
   async function displaywishlist() {
      let response=await UserWishlist()
      console.log(response);
      setwishlist(response.data)
      
   }
    async function deletewishlist(id) {
      let {data}=await removewishlist(id)
      console.log(data);
      toast.error('Product Removed!');
      // setwishlist(response.data)
      displaywishlist()
      
   }
   async function setproduct(id) {
  let {data}=await AddProduct(id)
  console.log(data);
  console.log(data.message);
  setCart(data)
  if (data.status=='success'){
     toast.success('Product Added Successfully !');
  }
  
  p
}
   useEffect(()=>{
      displaywishlist()
   },[])
   return(
    <>
   <div className="container mx-auto max-sm:mt-[100px] sm:mt-[100px] md:mt-[100px] lg:mt-[90px] xl:mt-[90px] bg-gray-200">
      <h1 className="text-3xl font-semibold mb-5 ms-4">My Wishlist:</h1>
      <div className="grid max-sm:grid-cols-1 md:grid-cols-1 ">
       {wishlist?.data?.map((product)=>  { return <div className="mx-3 parent flex mb-3 border border-لا-1 border-b-[gray] pb-2">
         <div className="first w-1/2 flex justify-start ms-5  ">
            <img src={product?.imageCover} alt="" className="w-[30%]" />
          <div className="payment flex flex-col justify-center text-center ms-5">
              <h2 className="ms-3">{product?.category?.name}</h2>
            <h2 className="text-[green]">{product?.price} EGP</h2>
            <span className="text-[red] cursor-pointer" onClick={()=>deletewishlist(product.id)}><i class="fa-solid fa-trash"></i> Remove</span>
          </div>
         </div>
         <div className="second w-1/2 flex justify-end items-center">
            <button className=" bg-transparent border border-1 border-[green] p-2 rounded rounded-2 text-lg me-4" onClick={()=>setproduct(product.id)}>Add To Cart</button>
         </div>
       </div>
        
       
})}
      </div>
   </div>
    </>
   )
}