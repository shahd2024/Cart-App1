import React, { useContext, useState } from "react";
import * as yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
export function ResetPassword() {
    let {userLogin,setuserLogin}=useContext(UserContext)
     let navigate=useNavigate()
   let [loading,setLoading]=useState(false)
     let [apierror,setapierror]=useState(null)
  let validate=yup.object().shape({
 
   email:yup.string().email('email is not valid').required('email is requried'),
   newPassword:yup.string().min(5 ,'the minlength is 6').max(20,'the maxlength is 6').required('password is requried'),
  
  
  })
   async function HandelNewpass(values) {
      console.log(values);
      setLoading(true)
      await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
      .then((response)=>{
          setLoading(false)
          console.log(response.data);
        
         console.log(response.data);
         localStorage.setItem('userToken',response.data.token)
          setuserLogin(response.data.token)
            navigate('/')
         console.log(response);
         
         
      })
      .catch((error)=>{
          setLoading(false)
         
         console.log(error);
         
         
      })
      
   }
let formik=useFormik({
   initialValues:{
    
      email:'',
      newPassword:''
     
   },
   onSubmit:HandelNewpass,
   validationSchema:validate
})
   return(
    <>
     <div className=" flex items-start justify-center pt-[50px]  h-[100vh] mb-5">
    <div className="mt-[70px] container mx-auto ">
       <h2 className="  sm:indent-[10%] lg:indent-[32%] text-3xl mb-4 font-semibold">Reset your Account Password:</h2>
  
        
       <form className="max-w-md mx-auto  " onSubmit={formik.handleSubmit}>
          {apierror?<p className="text-red-500 text-center mb-2">{apierror}</p>:null}
      
       <div className="relative z-0 w-full mb-5 group ">
          <input type="text" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" "  />
           {formik.errors.email&&formik.touched.email?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     
    {formik.errors.email}</div>:null}
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>
        <div className="relative z-0 w-full mb-5 group">
      <input type="text" value={formik.values.newPassword} name="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      {formik.errors.newPassword&&formik.touched.newPassword?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.newPassword}</div>:null}
      <label htmlFor="floating_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
      
      
      
     
      <button type="submit" className="text-white bg-green-500   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center text-xl ">{loading?<i className="fas fa-spinner fa-spin"></i>:"reset password "}</button>
      
    </form>
    </div>
   
    </div>
    </>
   )
}