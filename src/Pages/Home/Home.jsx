import { useQuery } from "@tanstack/react-query";

import Banner from "./Banner";
import How_Works from "./How_Works";
import CardSection from "./CardSection";
import SuccessCounter from "./SuccessCounter";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SuccessReview from "./SuccessReview";
import { Helmet } from "react-helmet-async";
import Section_Title from "../../Shared-Compo/Section_Title";

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
            <Helmet><title>Milon Mela | Home</title></Helmet>
            <Banner></Banner>
            
            <Section_Title title={'Premium Biodata'} subTitle={'find your matched'}></Section_Title>
            <div className="grid grid-cols-1 md:grid-cols-3 px-2 md:px-2 gap-5 md:gap-5 w-full mx-auto">
                {
                    data?.map(item => <CardSection
                        key={item._id}
                        item={item}></CardSection>)
                }
            </div>
            <How_Works></How_Works>
            <SuccessCounter></SuccessCounter>
            <SuccessReview></SuccessReview>
        </div>
    )
}
export default Home;