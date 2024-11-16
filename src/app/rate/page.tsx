import axios from "axios"
import { useEffect } from "react"

export default function Rate() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/api/resume/query");
            console.log(res.data);
        }
    })

    return <h1>Rate</h1>
}