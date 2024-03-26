import axios from "axios";
import {AxiosRequestConfig} from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

const onSuccess = (response:any)=>{
    return response.data
}
const onError = (error:any) =>{
    const {status, data} = error.response
    return {
        status,
        data
    }
}

export const request = (options: AxiosRequestConfig) => {
    return client(options).then(onSuccess).catch(onError)
}
