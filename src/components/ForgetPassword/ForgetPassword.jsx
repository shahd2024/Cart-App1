import React, { useState } from "react";
import * as yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";

export function ForgetPassword() {
     let navigate=useNavigate()
   let [loading,setLoading]=useState(false)
     let [apierror,setapierror]=useState(null)
  let validate=yup.object().shape({
 
   email:yup.string().email('email is not valid').required('email is requried'),
  
  
  })
   async function HandelRegister(values) {
      console.log(values);
      setLoading(true)
      await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
      .then((response)=>{
          setLoading(false)
          console.log(response.data);
          navigate('/verifycode')
         console.log(response.data);
         localStorage.setItem('userToken',response.data.token)
         if(response.data.message=='success'){
           
         }
         
      })
      .catch((error)=>{
          setLoading(false)
         console.log(error.response.data.message);
         setapierror(error.response.data.message)
         
      })
      
   }
let formik=useFormik({
   initialValues:{
    
      email:'',
     
     
   },
   onSubmit:HandelRegister,
   validationSchema:validate
})
   return(
    <>
     <div className=" flex items-start justify-center pt-[50px]  h-[100vh] mb-5">
    <div className="mt-[70px] container mx-auto ">
       <h2 className="  sm:indent-[10%] lg:indent-[32%] text-3xl mb-4 font-semibold">please enter your Email:</h2>
  
        
       <form className="max-w-md mx-auto  " onSubmit={formik.handleSubmit}>
          {apierror?<p className="text-red-500 text-center mb-2">{apierror}</p>:null}
      
       <div className="relative z-0 w-full mb-5 group ">
          <input type="text" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" "  />
           {formik.errors.email&&formik.touched.email?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     
    {formik.errors.email}</div>:null}
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>
      
      
      
     
      <button type="submit" className="text-white bg-green-500   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center text-xl ">{loading?<i className="fas fa-spinner fa-spin"></i>:"verify "}</button>
      
    </form>
    </div>
   
    </div>
    </>
   )
}