import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import first from '../../assets/Home/user.jpg'
import second from '../../assets/Home/search.jpg'
import third from '../../assets/Home/sms.png'
import Section_Title from "../../Shared-Compo/Section_Title";

const How_Works = () => {
    return (
        <div className="my-16 w-10/12 mx-auto">
            <Section_Title subTitle={'Get started in 3 easy steps'} title={'How Milon Mela Works!'}></Section_Title>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mt-10 ">
                <div >
                    <Card className="mt-10">
                        <CardHeader className="relative">
                            <img className="rounded-full w-52 h-52 mx-auto"
                                src={first}
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody className="text-center ">
                            <Typography variant="h4" className="text-black font-bold">
                                Create Your Profile
                            </Typography>
                            <Typography>
                            Create your detail profile, add photos and describe your partner preference
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card className="mt-10">
                        <CardHeader className="relative">
                            <img className="rounded-full w-52 h-52 mx-auto"
                                src={second}
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody className="text-center ">
                            <Typography variant="h4" className="text-black font-bold" >
                            Search Your Partner
                            </Typography>
                            <Typography>
                            Search your preferred partner by location, education, interest and so on
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card className="mt-10">
                        <CardHeader className="relative">
                            <img className="rounded-full w-52 h-52 mx-auto"
                                src={third}
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody className="text-center ">
                            <Typography variant="h4" className="text-black font-bold" >
                            Start Communication
                            </Typography>
                            <Typography >
                            Start communication with suitable profiles by sending message & emails
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default How_Works;