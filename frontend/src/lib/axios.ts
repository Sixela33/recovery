import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
    withCredentials: true,
})