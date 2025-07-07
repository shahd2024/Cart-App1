import { createContext, useEffect, useState } from "react";

export let UserContext=createContext(0)
export default function UserContextProvider(props){
    let [userLogin,setuserLogin]=useState(null)
    useEffect(()=>{
     if (localStorage.getItem('userToken')){
        setuserLogin(localStorage.getItem('userToken'))

     }
     else{
        setuserLogin(null)
     }
    },[])
return(
    <>
    <UserContext.Provider value={{userLogin,setuserLogin}}>
   {props.children}
    </UserContext.Provider>
    </>
)
}