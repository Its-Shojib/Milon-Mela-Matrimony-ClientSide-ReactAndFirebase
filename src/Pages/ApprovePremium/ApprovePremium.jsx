import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Card } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Section_Title from "../../Shared-Compo/Section_Title";

const ApprovePremium = () => {

    let axiosSecure = useAxiosSecure();
    const { data: premiumReqUser = [], refetch } = useQuery({
        queryKey: ['premiumReqUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premiumReqUser');
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
                        console.log(res.data);
                        if (res.data.modifiedCount > 0 ||res.data.matchedCount) {
                            axiosSecure.delete(`/premiumReqDelete/${email}`)
                                .then(res => {
                                    if (res.data.deletedCount > 0) {
                                        Swal.fire({
                                            title: "Updated!",
                                            text: 'User is Premium Now!',
                                            icon: "success"
                                        });
                                        refetch();
                                    }
                                })
                        }
                    })
            }
        });
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <Helmet><title>Milon Mela | Approve Premium</title></Helmet>
            <Section_Title title={'Approve Premium'} subTitle={'requested'}></Section_Title>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="pr-10">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">User Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Bio Id</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            premiumReqUser?.map((item, index) => <tr key={item?._id}>
                                <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.Name}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">{item?.Email}</td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.Biodata_id}
                                </td>
                                <th className="p-4 border-b border-blue-gray-50"><Button onClick={() => HandleMakePremium(item?.Email)}>Make Premium</Button></th>
                            </tr>
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
export default ApprovePremium;