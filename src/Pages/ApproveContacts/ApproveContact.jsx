import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Button, Card } from "@material-tailwind/react";
import Swal from "sweetalert2";


const ApproveContact = () => {

    let axiosSecure = useAxiosSecure();
    const { data: allRequestedUser = [] } = useQuery({
        queryKey: ['allRequestedUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allRequestedUser');
            return res.data;
        }
    })

    let handleApproveContactRequest = (id) =>{
        Swal.fire({
            title: "Are you sure to Approve?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requestedUser/approve/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Approved!",
                                text: 'User can see contact details!',
                                icon: "success"
                            });
                        } 
                        else if (res.data.matchedCount > 0) {
                            Swal.fire({
                                title: "Already Approved!",
                                text: 'User can see contact details!',
                                icon: "success"
                            });
                        } 
                    })
            }
        });
    }
    return (
        <div className="w-11/12 mx-auto my-10">
        <Helmet>
            <title>Milon Mela | All Requested User</title>
        </Helmet>
        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr className="">
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50">User Name</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50">User Email</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50">Bio-Id</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allRequestedUser?.map((item, index) => <tr key={item?._id}>
                            <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                            <td className=" border-b border-blue-gray-50">
                                {item?.userName}
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                {item?.userEmail}
                            </td>
                            <td className="p-4 pr-10 border-b border-blue-gray-50">
                                {item?.reqBioId}
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Button onClick={()=> handleApproveContactRequest(item?._id)}>
                                    Approve Contact Req.
                                </Button>
                            </td>
                        </tr>
                        )}
                </tbody>
            </table>
        </Card>
    </div>
    )
}
export default ApproveContact;