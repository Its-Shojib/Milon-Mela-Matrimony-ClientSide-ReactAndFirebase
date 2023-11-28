import { Button, Card } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Section_Title from "../../Shared-Compo/Section_Title";


const MyReqContacts = () => {

    let { user } = useAuth();
    let axiosSecure = useAxiosSecure();
    const { data: myRequestedUser = [], refetch } = useQuery({
        queryKey: ['myRequestedUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myRequestedUser/${user?.email}`);
            return res.data;
        }
    })

    let handleDeleteRequest = (id) =>{
        Swal.fire({
            title: "Are you sure to Delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requestedUser/delete/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: 'Deleted Request Successfully!',
                                icon: "success"
                            });
                        } 
                        refetch();
                    })
            }
        });
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <Helmet>
                <title>Milon Mela | Requested User</title>
            </Helmet>
            <Section_Title title={'Requested User'} subTitle={'Find contact info'}></Section_Title>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 px-4">Bio-Id</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Status</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Mobile</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Email</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myRequestedUser?.map((item, index) => <tr key={item?._id}>
                                <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                <td className=" border-b border-blue-gray-50">
                                    {item?.reqName}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 text-center">
                                    {item?.reqBioId}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.status}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.reqPhone}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                {item?.reqEmail}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Button onClick={()=> handleDeleteRequest(item?._id)}>Delete</Button>
                                </td>

                            </tr>
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
export default MyReqContacts;