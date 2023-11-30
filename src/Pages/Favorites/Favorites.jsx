import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Button, Card } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import Section_Title from "../../Shared-Compo/Section_Title";

const Favorites = () => {
    let axiosSecure = useAxiosSecure();
    let { user } = useAuth()
    const { data: favoriteBioData = [], refetch } = useQuery({
        queryKey: ['favoriteBioData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favoriteBioData/${user?.email}`);
            return res.data;
        }
    })

    let HandleDelete = (id) => {
        Swal.fire({
            title: "Are you sure to Delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete It!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/favoriteDelete/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: 'Deleted Successfully',
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
            <Helmet><title>Milon Mela | Favorites</title></Helmet>
            <Section_Title title={'Favorite Contact'} subTitle={'find your'}></Section_Title>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="pr-10">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Bio Id</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Permanent Address</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Ocupation</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favoriteBioData?.map((item, index) => <tr key={item?._id}>
                                <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.Name}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">{item?.bioId}</td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.PermanentDiv}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.Ocupation}
                                </td>
                                <th className="p-4 border-b border-blue-gray-50">
                                    <Button onClick={() => HandleDelete(item?._id)}><MdDelete className="text-2xl" /> </Button></th>
                            </tr>
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
export default Favorites;