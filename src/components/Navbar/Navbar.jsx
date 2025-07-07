import React, { useContext, useState } from "react";
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { productcontext } from "../../../ProductsContext/ProductContext";
import { UserContext } from "../../../Context/UserContext";


export function Navbar() {
 
   const [isOpen, setIsOpen] = useState(false);
  let {Cart,setcart}=useContext(productcontext)
  let {userLogin,setuserLogin}=useContext(UserContext)
  let navigate=useNavigate()
  function logOut() {
    localStorage.removeItem('userToken')
    setuserLogin(null)
    navigate('/login')

  }
   return(
    <>
   

<nav className="bg-gray-100 border-gray-200 fixed top-0 start-0 end-0 z-30 cursor-pointer px-3 text-center">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between   mx-auto py-2">
    <Link to="" className="flex items-center  space-x-3 rtl:space-x-reverse ">
     <img src={logo} className="h-8  " alt="Flowbite Logo" />
    </Link>
   

    <button
  onClick={() => setIsOpen(!isOpen)}
  type="button"
  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  aria-controls="navbar-default"
  aria-expanded={isOpen}
>
  <span className="sr-only">Open main menu</span>
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
  </svg>
</button>
 

  
       
       <div className={`${isOpen ? 'block' : 'hidden'} w-full md:w-auto md:block  lg:flex`} id="navbar-default">

    
       <ul className="sm:me-0 md:me-0 lg:me-[100px]  font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100  ">
       {userLogin?<>
         <li>
          <NavLink to="" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0     ">Home
          </NavLink>
        </li>
        <li>
          <NavLink to="cart" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0     ">Cart
          </NavLink>
        </li>
         <li>
          <NavLink to="wishlist" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0     ">Wish List
          </NavLink>
        </li>
     <li>
          <NavLink to="products" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0     ">Products
          </NavLink>
        </li>
         <li>
          <NavLink to="categories" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0     ">Categories
          </NavLink>
        </li>
         <li>
          <NavLink to="brands" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0     ">Brands
          </NavLink>
        </li></>:null}
      </ul>
      <ul className="sm:ms-0 md:ms-0 lg:ms-[100px] font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 ">
         <li>
            <i className="fa-brands fa-instagram"></i>
         </li>
          <li>
            <i className="fa-brands fa-facebook"></i>
         </li>
          <li>
            <i className="fa-brands fa-twitter"></i>
         </li>
           <li>
            <i className="fa-brands fa-youtube"></i>
         </li>
         {userLogin==null?<>
          <li>
           <NavLink to="register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0   ">Register
          </NavLink>
        </li>
       <li>
           <NavLink to="login" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[green] md:p-0   ">Login
          </NavLink>
        </li></>: <li>
           <span  onClick={()=>logOut()} className="text-red-600 block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0   ">Logout
          </span>
        </li>}
       
      
      </ul>
      
<button type="button" className="relative inline-flex items-center  text-sm font-medium text-center  focus:ring-4 focus:outline-none focus:ring-blue-300  p-0 ms-5">
<i className="fa-solid fa-cart-shopping p-2 text-lg text-black"></i>
<span className="sr-only">Notifications</span>
  <div className="absolute inline-flex items-center justify-center w-6 h-6  font-bold text-[red]  -top-2 -end-2 dark:border-gray-900 ms-5 text-lg">{Cart?.numOfCartItems}</div>
</button>

   
    
  
   </div>
  </div>
</nav>
 {/* <nav className="bg-gray-100 border-gray-200 fixed top-0 start-0 end-0 z-30 px-3 text-center">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} w-full md:w-auto md:block lg:flex`} id="navbar-default">
          <ul className="lg:me-[100px] font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100">
            {userLogin && (
              <>
                <li><NavLink to="" className="block py-2 px-3 text-gray-900 rounded-sm hover:text-green-600">Home</NavLink></li>
                <li><NavLink to="cart" className="block py-2 px-3 text-gray-900 rounded-sm hover:text-green-600">Cart</NavLink></li>
                <li><NavLink to="wishlist" className="block py-2 px-3 text-gray-900 rounded-sm hover:text-green-600">Wish List</NavLink></li>
                <li><NavLink to="products" className="block py-2 px-3 text-gray-900 rounded-sm hover:text-green-600">Products</NavLink></li>
                <li><NavLink to="categories" className="block py-2 px-3 text-gray-900 rounded-sm hover:text-green-600">Categories</NavLink></li>
                <li><NavLink to="brands" className="block py-2 px-3 text-gray-900 rounded-sm hover:text-green-600">Brands</NavLink></li>
              </>
            )}
          </ul>

          <ul className="lg:ms-[100px] font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100">
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-youtube"></i></li>

            {userLogin == null ? (
              <>
                <li><NavLink to="register" className="block py-2 px-3 text-gray-900 hover:text-green-600">Register</NavLink></li>
                <li><NavLink to="login" className="block py-2 px-3 text-gray-900 hover:text-green-600">Login</NavLink></li>
              </>
            ) : (
              <li>
                <span onClick={logOut} className="text-red-600 block py-2 px-3 hover:text-red-800 cursor-pointer">Logout</span>
              </li>
            )}
          </ul>

          <button type="button" className="relative inline-flex items-center text-sm font-medium text-center focus:ring-4 focus:outline-none focus:ring-blue-300 p-0 ms-5">
            <i className="fa-solid fa-cart-shopping p-2 text-lg text-black"></i>
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 font-bold text-[red] -top-2 -end-2 ms-5 text-lg">{Cart?.numOfCartItems}</div>
          </button>
        </div>
      </div>
    </nav> */}


    </>
   )
}