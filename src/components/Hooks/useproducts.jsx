import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function UseProducts(){
    function getAllproducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
   let response=useQuery({
    queryKey:['recentproducts'],
    queryFn:getAllproducts,
    staleTime:6*60*60*1000
   })
   
   return response
   
}