import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


let axiosSecure = axios.create({
    baseURL: 'https://milon-mela-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    let navigate = useNavigate();
    let {Logout} = useAuth();
    axiosSecure.interceptors.request.use(function(config){
        let token = localStorage.getItem('access-token');
        // console.log('request stoped by interceptors',token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error){
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response)=>{
        return response;
    }, async(error)=>{
        let status = error?.response?.status;
        // console.log('Status Code in interceptor: ', status);
        if(status ===401 || status ===403){
            await Logout();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
}
export default useAxiosSecure;