import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const CardSection = ({ item }) => {
    let goto = useNavigate()
    let { bioId, _id, Image, Gender, Age, Ocupation, PermanentDiv } = item;

    return (
        <Card  className="mt-6 bg-[#15242f]">
            <CardHeader color="white" className="mt-5">
                <img className="h-64 w-full"
                    src={Image}
                    alt="card-image"
                />
            </CardHeader>
            <CardBody className="h-28">
                <Typography variant="h5" color="white" className="text-center mb-3">
                    Biodata Id : {bioId}
                </Typography>
                <div className="flex justify-between gap-5">
                    <Typography variant="h6" color="white">
                        Gender: {Gender}
                    </Typography >
                    <Typography variant="h6" color="white">
                        Age: {Age}
                    </Typography>
                </div>
                <div className="flex justify-between gap-5">
                    <Typography variant="h6" color="white">
                        Home: {PermanentDiv}
                    </Typography >
                    <Typography variant="h6" color="white">
                        Works: {Ocupation}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="text-center text-white">
                <Button className="text-white bg-blue-900" onClick={() => goto(`/biodata/profile/${_id}`)} >View Profile</Button>
            </CardFooter>
        </Card>
    )
}
CardSection.propTypes = {
    item: PropTypes.object,
}
export default CardSection;