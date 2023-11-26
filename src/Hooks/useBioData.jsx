import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBioData = () => {
    let axiosPublic = useAxiosPublic();
    const { data: biodataCollection = [], refetch } = useQuery({
        queryKey: ['biodataCollection'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodata');
            return res.data;
        }
    })
    return [biodataCollection, refetch];
}
export default useBioData;