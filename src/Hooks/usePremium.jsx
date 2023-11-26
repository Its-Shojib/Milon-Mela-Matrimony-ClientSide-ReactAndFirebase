import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isPremium, isPending: isPremiumLoading } = useQuery({
        queryKey: [user?.email, 'isPremium'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/premium/${user.email}`);
            console.log(res.data);
            return res.data?.premium;
        }
    })
    return [isPremium, isPremiumLoading]
};
export default usePremium;

