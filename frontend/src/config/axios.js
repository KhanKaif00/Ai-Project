import axios from 'axios'

const axiosResponse = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
})

export default axiosResponse