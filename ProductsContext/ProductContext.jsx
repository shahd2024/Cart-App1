import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let productcontext=createContext(0)
export function ProductContextProvider(props) {
    let [Cart,setCart]=useState(null)
    //   let [Cartid,setCartid]=useState(null)     
    let headers={
        token:localStorage.getItem('userToken')
    }
    function AddProduct(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:productId
     },{
       headers:headers
     }).then((response)=>response)
     .catch((error)=>error)
    }
     function AddWishList(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:productId
     },{
       headers:headers
     }).then((response)=>response)
     .catch((error)=>error)
    }
       function UserWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
        function removewishlist(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
         function displayCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
         function deletecartitem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
          function updatwcartitem(id,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count:count
    },{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
           function checkout(cardid,url,shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardid}?url=${url}`,{
        shippingAddress:shippingAddress
    },{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
            function cashorder(cardid,shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardid}`,{
        shippingAddress:shippingAddress
    },{
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
   
    async function getCarts() {
        let response=await displayCart()
        console.log(response);
       
        //  setCartid(response.data.cartId)
        setCart(response.data)
      
        
        
    }
    useEffect(()=>{
  getCarts()
    },[])
    
    return(<>
    <productcontext.Provider value={{AddProduct,AddWishList,UserWishlist,removewishlist,displayCart,deletecartitem,updatwcartitem,Cart,setCart,checkout,cashorder}}>
     {props.children}
    </productcontext.Provider>
    </>)
}