import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Input, Textarea } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import Section_Title from "../../Shared-Compo/Section_Title";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const GotMarried = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    let { user } = useAuth()
    const onSubmit = async (data) => {
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url

            let currentDate = new Date();
            let marrigeDate = data?.marrigeDate;
            let date2 = new Date(marrigeDate)
            let time = Math.abs(date2 - currentDate);
            let days = Math.ceil(time / (1000 * 60 * 60 * 24));
            let rating = parseInt(data?.rating)
            // console.log(days);
            const successStory = {
                myName: data?.myName,
                partnerName: data?.partnerName,
                myBioId: data?.myBioId,
                marrigeDate,
                marrigeInDays: days,
                rating,
                partnerBioId: data?.partnerBioId,
                coupleImage: res?.data?.data?.display_url,
                story: data?.story,
                myEmail: user?.email,
            }
            // console.log(successStory);
            const successStoryRes = await axiosSecure.post('/successStory', successStory);
            // console.log(successStoryRes.data)
            if (successStoryRes?.data?.insertedId) {
                reset();
                Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    title: 'Congratulations!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        
        // console.log('with image url', res.data);
    };
    return (
        <div>
            <Helmet><title>Milon Mela | Got Married</title></Helmet>
            <Section_Title title={'Marrige info'} subTitle={'tell us your'}></Section_Title>

            <div>
                <div className="w-10/12 mx-auto my-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-10">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="font-semibold">Your Name*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Name"
                                    {...register('myName', { required: true })}
                                    className="w-full"
                                    required />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="font-semibold">Partner Name*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Name"
                                    {...register('partnerName', { required: true })}
                                    className="w-full"
                                    required />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="font-semibold">Your Bio-Id*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Bio-Id"
                                    {...register('myBioId', { required: true })}
                                    required
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="font-semibold">Partner Bio-Id*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Bio-Id"
                                    {...register('partnerBioId', { required: true })}
                                    required
                                    className=" w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Couple Picture*</span>
                                </label>
                                <Input {...register('image', { required: true })} type="file" className=" w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Marrige Date*</span>
                                </label>
                                <Input {...register('marrigeDate', { required: true })} type="date" className=" w-full" />
                            </div>
                        </div>
                        <div className="my-5">
                            <div className="">
                                <label className="label">
                                    <span className="font-semibold">Rate Us*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Out of 5"
                                    {...register('rating', { required: true })}
                                    required
                                    className="w-3/6" />
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">Success Story</span>
                            <Textarea label="Write Your Success Story" success required {...register('story', { required: true })} />
                        </div>
                        <Button className="my-3" type="submit">
                            Submit Now!
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default GotMarried;