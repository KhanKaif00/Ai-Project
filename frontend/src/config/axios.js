import axios from 'axios'

const axiosResponse = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosResponse