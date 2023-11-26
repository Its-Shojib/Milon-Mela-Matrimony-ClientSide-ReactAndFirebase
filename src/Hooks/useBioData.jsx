import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBioData = () => {
    let axiosSecure = useAxiosSecure();
    let {user} = useAuth();
    const {  data: biodata = {} } = useQuery({
        queryKey: ['biodata',user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/biodata?email=${user?.email}`);
            return res.data;
        }
    })
    return {biodata};
}
export default useBioData;