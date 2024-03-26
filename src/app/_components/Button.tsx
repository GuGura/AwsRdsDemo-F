'use client'
import ping from "@/service/demo";
import Link from "next/link";

export default function Button() {
    async function onClick(){
        const res = await ping()
        alert(res)
    }
    return (
            <div style={{gap:10, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button style={{border: '1px solid white', padding: 20}} onClick={onClick}>이동</button>
                <Link href={'/'} style={{border: '1px solid white', padding: 20}}>홈</Link>
            </div>
    );
}
