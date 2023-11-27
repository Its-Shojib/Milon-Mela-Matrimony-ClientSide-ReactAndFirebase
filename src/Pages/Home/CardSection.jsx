import {Card,CardHeader,CardBody,CardFooter,Typography,Button} from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const CardSection = ({ item }) => {
    let goto = useNavigate()
    let { bioId, _id, Image, Gender, Age, Ocupation, PermanentDiv } = item;

    return (
        <Card className="mt-6 bg-[#172935]">
            <CardHeader color="white" className="mt-5">
                <img className="h-64 w-full"
                    src={Image}
                    alt="card-image"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="white" className="text-center mb-3">
                    Biodata Id : {bioId}
                </Typography>
                <div className="flex justify-between gap-5">
                    <Typography  variant="h5" color="white">
                        Gender: {Gender}
                    </Typography >
                    <Typography variant="h5" color="white">
                        Age: {Age}
                    </Typography>
                </div>
                <div className="flex justify-between gap-5">
                    <Typography  variant="h5" color="white">
                        Address: {PermanentDiv}
                    </Typography >
                    <Typography variant="h5" color="white">
                        Ocupation: {Ocupation}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="text-center">
                <Button onClick={()=> goto(`/biodata/profile/${_id}`) }>View Profile</Button>
            </CardFooter>
        </Card>
    )
}
CardSection.propTypes = {
    item: PropTypes.node,
}
export default CardSection;