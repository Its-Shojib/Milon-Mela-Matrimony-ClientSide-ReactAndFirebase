import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Button, Input } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditBioData = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    let { user } = useAuth()
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const biodatas = {
                Name: data?.name,
                Image: res?.data?.data?.display_url,
                Gender: data?.gender,
                Dob: data?.DoB,
                Height: data?.height,
                Weight: data?.weight,
                Age: data?.age,
                Ocupation: data?.ocupation,
                Race: data?.race,
                FaName: data?.fatherName,
                MoName: data?.motherName,
                PermanentDiv: data?.permanentDiv,
                PresentDiv: data?.presentDiv,
                PartnerAgeExp: data?.partnerAge,
                PartnerHeightExp: data?.partnerHeight,
                PartnerWeightExp: data?.partnerWeight,
                email: data?.email,
                Mobile: data?.phone,
            }
            console.log(biodatas);
            const biodataRes = await axiosSecure.patch(`/edit-biodata/${user?.email}`, biodatas);
            console.log(biodataRes.data)
            if (biodataRes?.data?.modifiedCount || biodataRes?.data?.upsertedCount || biodataRes?.data?.matchedCount) {
                reset();
                Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    title: `${data?.name}'s Biodata Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        
        console.log('with image url', res.data);
    };

    return (

        <div className="">
            <div className="text-center mt-5">
                <h3>Makes your bio</h3>
                <h1 className="text-4xl font-bold text-red-900">Extra-Ordinary</h1>
            </div>
            <div>
                <div className="w-10/12 mx-auto my-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-10">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Name*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Name"
                                    {...register('name', { required: true })}
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Gender*</span>
                                </label>
                                <select defaultValue="default" {...register('gender', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Father Name*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Father Name"
                                    {...register('fatherName', { required: true })}
                                    required
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Mother Name*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Mother Name"
                                    {...register('motherName', { required: true })}
                                    required
                                    className=" w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Profile Picture*</span>
                                </label>
                                <Input {...register('image', { required: true })} type="file" className=" w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Date of Birth*</span>
                                </label>
                                <Input {...register('DoB', { required: true })} type="date" className=" w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Height*</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('height', { required: true })}
                                    options={Height}
                                /> */}
                                <select defaultValue="default" {...register('height', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Height</option>
                                    <option value="5-0">{`5"0'`}</option>
                                    <option value="5-2">{`5"2'`}</option>
                                    <option value="5-4">{`5"4'`}</option>
                                    <option value="5-6">{`5"6'`}</option>
                                    <option value="5-8">{`5"8'`}</option>
                                    <option value="5-10">{`5"10'`}</option>
                                    <option value="6-0">{`6"0'`}</option>
                                    <option value="6-2">{`5"2'`}</option>
                                    <option value="6-4">{`5"4'`}</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Weight*</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('weight', { required: true })}
                                    options={Weight}
                                /> */}
                                <select defaultValue="default" {...register('weight', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Weight</option>
                                    <option value="41-50">41-50 Kilogram</option>
                                    <option value="51-60">51-60 Kilogram</option>
                                    <option value="61-70">61-70 Kilogram</option>
                                    <option value="71-80">71-80 Kilogram</option>
                                    <option value="81-90">81-90 Kilogram</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Ocupation*</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('ocupation', { required: true })}
                                    options={Ocupation}
                                /> */}
                                <select defaultValue="default" {...register('ocupation', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Ocupation</option>
                                    <option value="student">Student</option>
                                    <option value="job">Job</option>
                                    <option value="housewife">House Wife</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Race*</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('race', { required: true })}
                                    options={Race}
                                /> */}
                                <select defaultValue="default" {...register('race', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Race</option>
                                    <option value="asian">Asian</option>
                                    <option value="white">White</option>
                                    <option value="black">Black</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Permanent Division*</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('per-division', { required: true })}
                                    options={Division}
                                /> */}
                                <select defaultValue="default" {...register('permanentDiv', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Division</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chattagram">Chattagram</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Maymansign">Maymansign</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Present Division*</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('pre-division', { required: true })}
                                    options={Division}
                                /> */}
                                <select defaultValue="default" {...register('presentDiv', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Division</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chattagram">Chattagram</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Maymansign">Maymansign</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Age*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Age"
                                    {...register('age', { required: true })}
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Partner Age (Expected)*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Partner Age"
                                    {...register('partnerAge', { required: true })}
                                    className=" w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Partner Height* (Expected)</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('partner-height', { required: true })}
                                    options={Height}
                                /> */}
                                <select defaultValue="default" {...register('partnerHeight', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Height</option>
                                    <option value="5-0">{`5"0'`}</option>
                                    <option value="5-2">{`5"2'`}</option>
                                    <option value="5-4">{`5"4'`}</option>
                                    <option value="5-6">{`5"6'`}</option>
                                    <option value="5-8">{`5"8'`}</option>
                                    <option value="5-10">{`5"10'`}</option>
                                    <option value="6-0">{`6"0'`}</option>
                                    <option value="6-2">{`5"2'`}</option>
                                    <option value="6-4">{`5"4'`}</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Partner Weight* (Expected)</span>
                                </label>
                                {/* <Select className="w-full"
                                    required
                                    {...register('partner-weight', { required: true })}
                                    options={Weight}
                                /> */}
                                <select defaultValue="default" {...register('partnerWeight', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Weight</option>
                                    <option value="41-50">41-50 Kilogram</option>
                                    <option value="51-60">51-60 Kilogram</option>
                                    <option value="61-70">61-70 Kilogram</option>
                                    <option value="71-80">71-80 Kilogram</option>
                                    <option value="81-90">81-90 Kilogram</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Contact Email*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Email"
                                    {...register('email', { required: true })}
                                    required
                                    defaultValue={user?.email}
                                    readOnly
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Phone Number*</span>
                                </label>
                                <Input
                                    type="text"
                                    label="Phone Number"
                                    {...register('phone', { required: true })}
                                    required
                                    className=" w-full" />
                            </div>
                        </div>

                        <Button className="block w-full text-lg" type="submit">
                            Save & Publish Now!
                        </Button>
                    </form>
                </div>
            </div >
            <Helmet>
                <title>Milon-Mela | Edit Bio</title>
            </Helmet>
        </div >
    )
}
export default EditBioData;