import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Card } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Section_Title from "../../Shared-Compo/Section_Title";


const ManageUser = () => {
    let axiosSecure = useAxiosSecure();
    const { data: allUser = [], refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUser');
            return res.data;
        }
    })
    let HandleMakePremium = (email) => {
        Swal.fire({
            title: "Are you sure to make Premium?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Premium!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/biodata/premium/${email}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: 'User is Premium Now!',
                                icon: "success"
                            });
                            refetch();
                        } else if (res.data.matchedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: 'User is already Premium!',
                                icon: "success"
                            });
                            refetch();
                        }
                        else {
                            Swal.fire({
                                title: "Sorry!",
                                text: 'User doesnt provide any biodata!',
                                icon: "error"
                            });
                        }
                    })
            }
        });
    }
    let HandleMakeAdmin = (email) => {
        Swal.fire({
            title: "Are you sure to make Admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${email}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: 'User is Admin Now!',
                                icon: "success"
                            });
                            refetch();
                        } else if (res.data.matchedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: 'User is already Admin!',
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <Helmet>
                <title>Milon Mela | Manage User</title>
            </Helmet>
            <Section_Title title={'All User Data'} subTitle={'manage your'}></Section_Title>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">User Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">User Email</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Action</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser?.map((item, index) => <tr key={item?._id}>
                                <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                <td className=" border-b border-blue-gray-50">
                                    {item?.name}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.email}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Button onClick={()=>HandleMakeAdmin(item?.email)}>Make Admin</Button>
                                </td>
                                <th className="p-4 border-b border-blue-gray-50">
                                    <Button onClick={() => HandleMakePremium(item?.email)}>Make Premium</Button></th>
                            </tr>
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
export default ManageUser;