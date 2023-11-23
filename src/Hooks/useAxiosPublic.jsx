import axios from "axios";

let axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-beta-gold.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
}
export default useAxiosPublic;