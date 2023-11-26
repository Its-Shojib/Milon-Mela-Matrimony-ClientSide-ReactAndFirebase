import { useLoaderData } from "react-router-dom";


const ViewProfile = () => {
    let profile = useLoaderData();
    console.log(profile);
    return (
        <div>
            <p> Hello, I am {profile.Name} </p>
        </div>
    )
}
export default ViewProfile;