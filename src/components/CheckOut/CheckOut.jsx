import React, { useContext } from "react";
import * as yup from 'yup'
import {useFormik} from 'formik'
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { productcontext } from "../../../ProductsContext/ProductContext";
export function CheckOut() {
   let {checkout,cashorder,Cart,setCart}=useContext(productcontext)
   let{cartid}=useParams()
     let navigate=useNavigate()
     let [payment,setpayment]=useState(null)
   let validate=yup.object().shape({
 
   details:yup.string().min(5 ,'the minlength is 3').max(20,'the maxlength is 50').required('details is requried'),
   city:yup.string().min(5 ,'the minlength is 3').max(20,'the maxlength is 30').required('city is requried'),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/).required('phone is requried')
  })

   async function HandelCheckOut() {
   //  console.log(values);
    console.log(cartid);
    let response=await checkout(cartid,location.origin,formik.values)
    console.log(response);
   //  console.log(response.data);
   //  console.log(response.data.session.url);
    window.location.href=response.data.session.url
    
      
   }
    async function cashpayment() {
   //  console.log(values);
    console.log(cartid);
    let response=await cashorder(cartid,formik.values)
    console.log(response);
    setCart(0)
    navigate('/allorders')
 
    
      
   }
     let formik=useFormik({
   initialValues:{
    
      details:'',
      phone:'',
      city:''
     
   },
   onSubmit:()=>{if(payment=='online'){
          HandelCheckOut()
   }
else{
   cashpayment()
}},
   validationSchema:validate
})

   return(
    <>
   <div className="container mb-6 mx-auto lg:mt-[70px] max-sm:mt-[100px] sm:mt-[100px] md:mt-[110px]">
 
    
    
   <form className="max-w-md mx-auto mt-[50px] " onSubmit={formik.handleSubmit}>

  <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.details} name="details" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      {formik.errors.details&&formik.touched.details?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.details}</div>:null}
      <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
  </div>
   <div className="relative z-0 w-[90%] mx-auto  mb-5 group">
      <input type="text" value={formik.values.city} name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
       {formik.errors.city&&formik.touched.city?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.city}</div>:null}
      <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
  </div>
   <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.phone} name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
     {formik.errors.phone&&formik.touched.phone?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.phone}</div>:null}
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  <button onClick={()=>setpayment('online')} type="submit" className="text-white bg-[#299429]   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-[90%]  sm:w-auto px-5 py-2.5 text-center text-lg  me-5 mb-3 ms-2 ">Payment Online</button>
   <button onClick={()=>setpayment('cash')} type="submit" className="text-white bg-[#299429]   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-[90%] sm:w-auto px-5 py-2.5 text-center text-lg ms-2 ">Cash Order</button>
</form>
</div>
    </>
   )
}