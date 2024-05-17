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
    let axiosPublic = useAxiosPublic()
    const { data = [] } = useQuery({
        queryKey: ['biodataPremium'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodata/premium');
            return res.data;
        }
    })


    return (
        <div>
            <Helmet><title>Milon Mela | Home</title></Helmet>
            <Banner></Banner>

            <Section_Title title={'Premium Biodata'} subTitle={'find your matched'}></Section_Title>
            <div  className="w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 gap-10">
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