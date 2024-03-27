import {request} from "@/service/axios";

export function ping(){
    return request({
        method:'post',
        url: '/ping'
    })
}

export function pong(){
    return request({
        method:'GET',
        url:'/pong'
    })
}
