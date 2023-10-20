'use client'
import {useRouter} from "next/navigation";
import { useEffect } from "react";

export default function Refresh() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();

    }, []);

    return (
        <></>
    )    
}
  