import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import useBioData from "../../Hooks/useBioData";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ViewBioData = () => {
    let axiosSecure = useAxiosSecure();
    let {user} = useAuth();
    let { biodata } = useBioData();
    let { bioId, _id, Name, Image, Gender, Dob, Height, Weight, Age, Ocupation, Race, FaName, MoName, PermanentDiv, PresentDiv, PartnerAgeExp, PartnerHeightExp, PartnerWeightExp, email, Mobile } = biodata;


    let HandleMakePremium = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Make Sure to Premium Acount",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Premium!"
        }).then((result) => {
            if (result.isConfirmed) {

                let premiumInfo = {
                    Name: Name,
                    Email: email,
                    Biodata_id: bioId,
                    id: _id
                }
                axiosSecure.post(`/makePremiumRequest/${user?.email}`, premiumInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Congratulations!",
                                text: "Requested to Owner Successfully.",
                                icon: "success"
                            });
                        }
                        else{
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Already Requested!",
                              });
                        }
                    })

            }
        });
    }
    return (
        <div className="w-9/12 mx-auto my-10">
            <div className="w-72 mx-auto">
                <Card className="h-64">
                    <CardHeader floated={false}>
                        <img className="h-44 w-full" src={Image} alt="profile-picture" />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray">
                            {Name}
                        </Typography>
                    </CardBody>
                </Card>
            </div>
            <div className="my-5">
                <div className="flex justify-between gap-24 my-3">
                    <div className="flex-1 bg-white p-5">
                        <h1 className="text-2xl font-bold uppercase">Contact info</h1>
                        <p>Phone: {Mobile}</p>
                        <p>Email: {email}</p>
                    </div>
                    <div className="flex-1 bg-white p-5">
                        <h1 className="text-2xl font-bold uppercase">About Me</h1>
                        <p>Date of Birth: {Dob}</p>
                        <p>Age: {Age}</p>
                    </div>
                </div>
                <div className="flex justify-between gap-24 mt-5">
                    <div className="flex-1 bg-white p-5">
                        <h1 className="text-2xl font-bold uppercase">Overview</h1>
                        <p>Gender: {Gender}</p>
                        <p>Height: {Height}</p>
                        <p>Weight: {Weight}</p>
                        <p>Ocupation: {Ocupation}</p>
                        <p>Race: {Race}</p>
                    </div>
                    <div className="flex-1 bg-white p-5">
                        <h1 className="text-2xl font-bold uppercase">Family</h1>
                        <p>Father Name: {FaName}</p>
                        <p>Mother Name: {MoName}</p>
                    </div>
                </div>
                <div className="flex justify-between gap-24 mt-5">
                    <div className="flex-1 bg-white p-5">
                        <h1 className="text-2xl font-bold uppercase">Address</h1>
                        <p>Present Address: {PresentDiv}</p>
                        <p>Parmanent Address: {PermanentDiv}</p>
                    </div>
                    <div className="flex-1 bg-white p-5">
                        <h1 className="text-2xl font-bold uppercase">Expectation</h1>
                        <p>Partner Age: {PartnerAgeExp}</p>
                        <p>Partner Height: {PartnerHeightExp}</p>
                        <p>Partner Weight: {PartnerWeightExp}</p>
                    </div>
                </div>
            </div>
            <Button className="block mx-auto my-10" onClick={() => HandleMakePremium(_id)}>Make Biodata Premium</Button>
        </div>
    )
}
export default ViewBioData;