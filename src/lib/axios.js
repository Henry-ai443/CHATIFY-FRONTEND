import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:'https://chatify-backend-4p7g.onrender.com/api',
    withCredentials: true,
})