import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSuccessStory = () => {
    let axiosPublic = useAxiosPublic();
    const { data: SuccessStory = [], refetch } = useQuery({
        queryKey: ['SuccessStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    })
    return [SuccessStory, refetch];
}
export default useSuccessStory;