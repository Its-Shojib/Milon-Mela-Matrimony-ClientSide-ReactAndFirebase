import { useLoaderData } from "react-router-dom";
import usePremium from './../../Hooks/usePremium';
import { Button } from "@material-tailwind/react";
import useBioData from "../../Hooks/useBioData";
import CardSection from "../Home/CardSection";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import 'animate.css';

const ViewProfile = () => {
    let profile = useLoaderData();
    let axiosSecure = useAxiosSecure()
    let { bioId, _id, Name, Image, Gender, Dob, Height, Weight, Age, Ocupation, Race, FaName, MoName, PermanentDiv, PresentDiv, PartnerAgeExp, PartnerHeightExp, PartnerWeightExp, email, Mobile } = profile;
    let [isPremium] = usePremium();
    let { user } = useAuth();
    let [biodataCollection] = useBioData();
    let dataOfGender = biodataCollection.filter((item) => item.Gender === Gender && item.email !== email);


    let handleAddToFavorite = () => {
        let favoriteInfo = {
            Name,
            bioId,
            PermanentDiv,
            Ocupation,
            Email: user?.email
        }
        axiosSecure.post('/favorite', favoriteInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: `${Name} Added to your Favorite`,
                        showClass: {
                            popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                    });
                }
            });
    }
    return (
        <div className="flex gap-10">
            <div className="flex-1">
                <h1 className="text-center text-3xl font-bold underline text-red-700 my-5">Bio-Data</h1>
                <div className="flex justify-between">
                    <div >
                        <div className="flex justify-between">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold">Personal Info</h1>
                                <p>Bio-Id:{bioId}</p>
                                <p>Name:{Name}</p>
                                <p>Date of Birth: {Dob}</p>
                                <p>Age: {Age}</p>
                                <p>Father Name: {FaName}</p>
                                <p>Mother Name:{MoName}</p>
                            </div>
                            <div className="w-5/12">
                                <img className="w-52 h-48 ml-20" src={Image} alt="" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold mt-5">Details</h1>
                        <p>Race:{Race}</p>
                        <p>Gender:{Gender}</p>
                        <p>Ocupation:{Ocupation}</p>
                        <p>Height:{Height}</p>
                        <p>Weight:{Weight}</p>
                        <p>Present Address:{PresentDiv}</p>
                        <p>Permanent Address:{PermanentDiv}</p>
                        <h1 className="text-2xl font-bold mt-5">Expectations</h1>
                        <p>Expected Partner Age:{PartnerAgeExp}</p>
                        <p>Expected Partner Height: {PartnerHeightExp}</p>
                        <p>Expected Partner Weight:{PartnerWeightExp}</p>
                        {
                            isPremium ? <>
                                <h1 className="text-2xl font-bold mt-5">Contact Info</h1>
                                <p>Mobile: {Mobile}</p>
                                <p>Email: {email}</p>
                            </> :
                                <>
                                </>
                        }
                        <div className="flex gap-10">
                            <Button onClick={() => handleAddToFavorite()} className="my-4">Add To Favorite</Button>
                            {!isPremium && <Button className="my-4">Request Contact Info</Button>}
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex-1">
                <div className="w-10/12 mx-auto h-screen overflow-y-scroll">
                    {
                        dataOfGender?.map(item => <CardSection
                            key={item._id}
                            item={item}></CardSection>)
                    }
                </div>
            </div>
        </div>
    )
}
export default ViewProfile;