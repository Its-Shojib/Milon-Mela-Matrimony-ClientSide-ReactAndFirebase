import { useQuery } from "@tanstack/react-query";

import Banner from "./Banner";
import How_Works from "./How_Works";
import CardSection from "./CardSection";
import SuccessCounter from "./SuccessCounter";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Home = () => {
    // let axiosSecure = useAxiosSecure();
    let axiosPublic = useAxiosPublic()
    const {  data = [] } = useQuery({
        queryKey: ['biodataPremium'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/biodata/premium');
            return res.data;
        }
    })
    return (
        <div>
            <Banner></Banner>
            
            <h1 className="text-center text-4xl mt-10 mb-5 font-bold"><span className="text-orange-900">Premium</span> Biodatas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:p-5 gap-10 m5-10 w-10/12 mx-auto">
                {
                    data?.map(item => <CardSection
                        key={item._id}
                        item={item}></CardSection>)
                }
            </div>
            <How_Works></How_Works>
            <h1 className="text-center text-4xl mt-10 mb-5 font-bold"><span className="text-orange-900">Success</span> Counter</h1>
            <SuccessCounter></SuccessCounter>
        </div>
    )
}
export default Home;