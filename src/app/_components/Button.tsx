'use client'
import {ping, pong, sendMail} from "@/service/demo";
import Link from "next/link";
import {useState} from "react";

export default function Button() {
    const [email, setEmail] = useState('')
    async function onClick(){
        const res = await ping()
        alert(res)
    }

    async function onClick2(){
        const res = await pong()
        alert(res)
    }

    async function onClick3(){
        const res = await sendMail(email)
        alert(res)
    }
    return (
            <div style={{gap:10, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button style={{border: '1px solid white', padding: 20}} onClick={onClick}>이동1</button>
                <button style={{border: '1px solid white', padding: 20}} onClick={onClick2}>이동2</button>
                <input value={email} onChange={e=>setEmail(e.target.value)}/>
                <button style={{border: '1px solid white', padding: 20}} onClick={onClick3}>SES TEST</button>
                <Link href={'/'} style={{border: '1px solid white', padding: 20}}>홈</Link>
            </div>
    );
}
