import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'flowbite'
import { Layout } from './components/Layout/Layout'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { Products } from './components/Products/Products'
import { Cart } from './components/Cart/Cart'
import { WishList } from './components/WishList/WishList'
import { Categories } from './components/Categories/Categories'
import { Brands } from './components/Brands/Brands'
import { NotFound } from './components/NotFound/NotFound'
import { Register } from './components/Register/Register'
import { Login } from './components/Login/Login'
import { Logout } from './components/Logout/Logout'
import { ForgetPassword } from './components/ForgetPassword/ForgetPassword'
import UserContextProvider from '../../Context/UserContext'
import { ProtectedRouting } from './components/ProtectedRouting/ProtectedRouting'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProductDetails } from './components/ProductDetails/ProductDetails'
import { ProductContextProvider } from '../../ProductsContext/ProductContext'
import toast, { Toaster } from 'react-hot-toast';
import { CheckOut } from './components/CheckOut/CheckOut'
import { AllOrders } from './components/AllOrders/AllOrders'
import { VerifyCode } from './components/VerifyCode/VerifyCode'
import { ResetPassword } from './components/ResetPassword/ResetPassword'
function App() {
 
let query=new QueryClient()
let router=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
     {path:'cart',element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:'wishlist',element:<ProtectedRouting><WishList/></ProtectedRouting>},
    {path:'products',element:<ProtectedRouting><Products/></ProtectedRouting>},
     {path:'categories',element:<ProtectedRouting><Categories/></ProtectedRouting>},
      {path:'brands',element:<ProtectedRouting><Brands/></ProtectedRouting>},
       {path:'productdetails/:id/:categ',element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
       {path:'checkout/:cartid',element:<ProtectedRouting><CheckOut/></ProtectedRouting>},
       {path:'allorders',element:<ProtectedRouting><AllOrders/></ProtectedRouting>},
       {path:'register',element:<Register/>},
        {path:'login',element:<Login/>},
          {path:'forgetpassword',element:<ForgetPassword/>},
             {path:'verifycode',element:<VerifyCode/>},
              {path:'resetpassword',element:<ResetPassword/>},
       {path:'*',element:<NotFound/>},
  ]}
])


  return (
    <>
     <ProductContextProvider>
     <QueryClientProvider client={query}>
     <UserContextProvider>
  
     <RouterProvider router={router}>

     </RouterProvider>
       <Toaster />
     <ReactQueryDevtools/>
    </UserContextProvider>
   </QueryClientProvider>
     </ProductContextProvider>
   
   
    </>
  )
}

export default App
