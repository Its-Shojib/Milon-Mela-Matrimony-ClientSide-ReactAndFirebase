import { Helmet } from "react-helmet-async";
import Section_Title from "../../Shared-Compo/Section_Title";
import Lottie from "lottie-react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import animation from '../../assets/Contact us/Animation - 1701196883827.json'

const ContactUs = () => {
    return (
        <div className="my-10 pt-1">
            <Helmet><title>Milon Mela | Contact Us</title></Helmet>
            <Section_Title title={'Contact Us'} subTitle={'Find Solution?'}></Section_Title>

            <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                <div className="flex-1 text-left space-y-3 pl-10">
                    <h1 className="text-3xl">Want to know more about <span className="text-red-900">Milon Mela</span> and its services?</h1>
                    <div className="flex gap-5">
                        <p className="text-white bg-[#172935] p-4 rounded-md"><MdEmail className="inline" /> mdshojib922@gmail.com</p>
                        <p className="text-white bg-[#172935] p-4 rounded-md"><FaPhoneAlt className="inline" />  +8801790-407979</p>
                    </div>
                </div>
                <div className="flex-1">
                    <Lottie className="h-[450px] w-full" animationData={animation} loop={true}></Lottie>
                </div>

            </div>
        </div>
    )
}
export default ContactUs;