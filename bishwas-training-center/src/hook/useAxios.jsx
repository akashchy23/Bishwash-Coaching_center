import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://api.bishwasctg.com/'
})

const useAxios = ()=>{
    return axiosInstance
}

export default useAxios