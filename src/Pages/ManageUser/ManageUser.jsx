import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Card } from "@material-tailwind/react";


const ManageUser = () => {
    let axiosSecure = useAxiosSecure();
    const { data: allUser = [], refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUser');
            return res.data;
        }
    })
    console.log(allUser);
    return (
        <div className="w-11/12 mx-auto my-10">
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
                                    <Button>Make Admin</Button>
                                </td>
                                <th className="p-4 border-b border-blue-gray-50">
                                    <Button>Make Premium</Button></th>
                            </tr>
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
export default ManageUser;