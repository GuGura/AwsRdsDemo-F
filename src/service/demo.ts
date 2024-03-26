import {request} from "@/service/axios";

export default function ping(){
    return request({
        method:'post',
        url: '/ping'
    })
}
