import React, { useContext, useState } from "react";
import * as yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";

export function Register() {
   let {userLogin,setuserLogin}=useContext(UserContext)
   // console.log(userLogin);
   
   let navigate=useNavigate()
   let [loading,setLoading]=useState(false)
     let [apierror,setapierror]=useState(null)
  let validate=yup.object().shape({
   name:yup.string().min(3,'the minlength is 3').max(10,'the maxlength is 10').required('name is requried'),
   email:yup.string().email('email is not valid').required('email is requried'),
   password:yup.string().min(5 ,'the minlength is 6').max(20,'the maxlength is 6').required('password is requried'),
   rePassword:yup.string().oneOf([yup.ref('password')],'repassword must math password').required('repassword is requried'),
   phone:yup.string().matches(/^01[0125][0-9]{8}$/).required('phone is requried')
  })
   async function HandelRegister(values) {
      console.log(values);
      setLoading(true)
      await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      .then((response)=>{
          setLoading(false)
         console.log(response.data);
         localStorage.setItem('userToken',response.data.token)
         setuserLogin(response.data.token)
         if(response.data.message=='success'){
            navigate('/')
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
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
   },
   onSubmit:HandelRegister,
   validationSchema:validate
})
  
   return(
    <>
  


<div className="container mb-6 mx-auto mt-[70px]">
 
        <h2 className="  sm:indent-[15%] lg:indent-[34%] text-xl mb-4 font-semibold">Register Now:</h2>
    
   <form className="max-w-md mx-auto  " onSubmit={formik.handleSubmit}>
      {apierror?<p className="text-red-500 text-center mb-2">{apierror}</p>:null}
  <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      {formik.errors.name&&formik.touched.name?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.name}</div>:null}
      <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
   <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
       {formik.errors.email&&formik.touched.email?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.email}</div>:null}
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
  </div>
   <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.password} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      {formik.errors.password&&formik.touched.password?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.password}</div>:null}
      <label htmlFor="floating_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
   <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.rePassword} name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_repass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      {formik.errors.rePassword&&formik.touched.rePassword?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.rePassword}</div>:null}
      <label htmlFor="floating_repass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
  </div>
   <div className="relative z-0 w-[90%] mx-auto mb-5 group">
      <input type="text" value={formik.values.phone} name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
     {formik.errors.phone&&formik.touched.phone?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 
{formik.errors.phone}</div>:null}
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  
 
  <button type="submit" className="text-white bg-green-500   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[90%] ms-5 sm:w-auto px-5 py-2.5 text-center ">{loading?<i className="fas fa-spinner fa-spin"></i>:"Submit"}</button>
</form>
</div>


    </>
   )
}