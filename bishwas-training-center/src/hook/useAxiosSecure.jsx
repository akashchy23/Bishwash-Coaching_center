
import {  useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://api.bishwasctg.com/'
})

const useAxiosSecure = () => {
    const {user}=useContext(AuthContext)
    
    useEffect(() => {
       
         
        const reqInterceptor = axiosSecure.interceptors.request.use(config=>{
              
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
        const resInterceptor = axiosSecure.interceptors.response.use(response=>{
            return response
        },(err=>{
            console.log(err)
            return Promise.reject(err)
        }))


        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
     }, [user, user?.accessToken])
     return axiosSecure
}

export default useAxiosSecure