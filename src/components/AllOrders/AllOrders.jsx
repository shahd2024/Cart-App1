import React, { useContext, useEffect } from "react";
// import { productcontext } from "../../Product";
import {jwtDecode} from 'jwt-decode'
import axios from "axios";
import { useState } from "react";
export function AllOrders() {
  let {id}=jwtDecode(localStorage.getItem('userToken'))
  console.log(id);
  let [allorders,setallorders]=useState(null)

  function getorders(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`).then(({data})=>{
      console.log(data)
      //  console.log(response.data[0].cartItems)
      setallorders(data)

    }).catch((error)=>{
      console.log(error);
      
    })
    }
  
 
    useEffect(()=>{
     getorders(id)
    },[])
   return(
    <>
<div className="container mx-auto lg:mt-[80px]">
  <div>
       {allorders?.map((order)=>{ return  <div className=" mt-[50px] p-3 border border-1 border-[gray] rounded rounded-2" key={order.id}>
          <div className="">
           <h2 className="text-[green] font-semibold">OrderId:#{order?.id}</h2>
         <h2 className="font-semibold text-[red]" >isDelivered: {order?.isDelivered?'true':'false'}</h2>
         <h2 className="font-semibold">isPaid: {order.isPaid?'true':'false'}</h2>
         </div>
         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
             {order?.cartItems?.map((item)=> <div className="">
     <div className="first mt-2">
      <img src={item?.product?.imageCover} alt="" className="w-full"/>
      <div className="flex flex-col items-center">
        <span className="text-[green]">price:{item.price}EGP</span>
         <span className="">count:{item.count}</span>
      </div>
     </div>
       </div>)}
         </div>
          
       
        
      </div>
       })}
       
     

</div>
  

</div>
    </>
   )
}