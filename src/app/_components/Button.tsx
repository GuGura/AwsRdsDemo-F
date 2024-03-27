'use client'
import {ping, pong} from "@/service/demo";
import Link from "next/link";

export default function Button() {
    async function onClick(){
        const res = await ping()
        alert(res)
    }

    async function onClick2(){
        const res = await pong()
        alert(res)
    }
    return (
            <div style={{gap:10, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button style={{border: '1px solid white', padding: 20}} onClick={onClick}>이동1</button>
                <button style={{border: '1px solid white', padding: 20}} onClick={onClick2}>이동2</button>
                <Link href={'/'} style={{border: '1px solid white', padding: 20}}>홈</Link>
            </div>
    );
}
