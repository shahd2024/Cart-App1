import React, { useContext, useEffect, useState } from "react";

import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { productcontext } from "../../../ProductsContext/ProductContext";
export function Cart() {
   let{displayCart,deletecartitem,updatwcartitem,Cart,setCart}=useContext(productcontext)
   let [cartitems,setcartitems]=useState(null)
  async function getCart() {
      let {data}=await displayCart()
      setcartitems(data)
      console.log(data);
      
      console.log(data.data.products);
      
   }
    async function removecartitem(id) {
      console.log(id);
      
      let {data}=await deletecartitem(id)
 
      console.log(data);
      
      setcartitems(data)
      setCart(data)
      toast.error('product deleted !');
      // console.log(data.data.products);
      
   }
    async function putcartitem(id,count) {
      console.log(id,count);
      
      let {data}=await updatwcartitem(id,count)
 
      console.log(data.data);
      
      setcartitems(data)
       setCart(data)
      toast.success(' Product Updated Successfully !');
      // console.log(data.data.products);
      
   }
   useEffect(()=>{
      getCart()
   },[])

   return(<>
      

<div className="container mt-[80px] mx-auto ">
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
  <table className="w-full  text-sm text-left rtl:text-right text-gray-500 mt-[80px] ">
   
    <tbody className="">
      {cartitems?.data?.products.map((product)=>
         <tr key={product.product.id} className="bg-white max-sm:mx-7 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product?.product?.imageCover} className="max-sm:w-full  w-full max-w-[80px] min-w-[50px] h-auto object-contain " alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          Apple Watch
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>putcartitem(product.product.id,product.count-1)} className="  inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
            <span>{product.count}</span>
            </div>
            <button onClick={()=>putcartitem(product.product.id,product.count+1)} className=" inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold  text-[green]">
         {product.price} EGP
        </td>
        <td className="px-6 py-4">
         <button className="text-[red]" onClick={()=>removecartitem(product.product.id)}>Remove</button>
        </td>
      </tr>
     )}
    
    </tbody>
  </table>
</div>
<Link to={`/checkout/${cartitems?.cartId}`}><button className="bg-[green] text-white  p-2 rounded rounded-2 mt-4">CheckOut</button></Link>
</div>






   </>)
 
   }
   
