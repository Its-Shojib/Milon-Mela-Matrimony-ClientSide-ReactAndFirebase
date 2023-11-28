import axios from "axios";

let axiosPublic = axios.create({
    baseURL: 'https://milon-mela-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
}
export default useAxiosPublic;