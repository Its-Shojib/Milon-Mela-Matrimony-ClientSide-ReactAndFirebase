import Section_Title from './../../Shared-Compo/Section_Title';
import animation from '../../assets/About us/Animation - 1701198416051.json'
import { Helmet } from 'react-helmet-async';
import Lottie from 'lottie-react';

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { useState } from 'react';

const AboutUs = () => {
    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <div className="my-10 pt-1">
            <Helmet><title>Milon Mela | About Us</title></Helmet>
            <Section_Title title={'About Us'} subTitle={'wanna know?'}></Section_Title>

            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                    <Lottie className="h-[450px] w-10/12" animationData={animation} loop={true}></Lottie>
                </div>

                <div className='flex-1'>
                    <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                                }`}
                        >
                            How can i create my profile on Milon Mela?
                        </AccordionHeader>
                        <AccordionBody className="pt-0 text-base font-normal">
                            Its very easy & simple. Just click Register Now to go to the registration page and follow the steps by filling up all the required information and then update your biodata.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className={`border-b-0 transition-colors ${open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
                                }`}
                        >
                            Is mandatory to add a phone number & email address?
                        </AccordionHeader>
                        <AccordionBody className="pt-0 text-base font-normal">
                            Mobile and Email are required.It will help you to get better notifications when someone communicates with you.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3} className="rounded-lg border border-blue-gray-100 px-4">
                        <AccordionHeader
                            onClick={() => handleOpen(3)}
                            className={`border-b-0 transition-colors ${open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
                                }`}
                        >
                            What is Biodata Id?
                        </AccordionHeader>
                        <AccordionBody className="pt-0 text-base font-normal">
                            Biodata Id is a unique auto-generated Id. All members have a unique ID on Milon-Mela. Other members can find your profile by your Biodata Id.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 4} className="rounded-lg border border-blue-gray-100 px-4">
                        <AccordionHeader
                            onClick={() => handleOpen(4)}
                            className={`border-b-0 transition-colors ${open === 4 ? "text-blue-500 hover:!text-blue-700" : ""
                                }`}
                        >
                            Can I update my Profile?
                        </AccordionHeader>
                        <AccordionBody className="pt-0 text-base font-normal">
                            Yes. You can update your profile data any time you want. Just visit your profile and go to the edit my biodata segment.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 5} className="rounded-lg border border-blue-gray-100 px-4">
                        <AccordionHeader
                            onClick={() => handleOpen(5)}
                            className={`border-b-0 transition-colors ${open === 5 ? "text-blue-500 hover:!text-blue-700" : ""
                                }`}
                        >
                            Are my photos secure?
                        </AccordionHeader>
                        <AccordionBody className="pt-0 text-base font-normal">
                            Yes. Your photos are secure. On Milon Mela, all photos are coded and tamper-proof.
                        </AccordionBody>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
export default AboutUs;