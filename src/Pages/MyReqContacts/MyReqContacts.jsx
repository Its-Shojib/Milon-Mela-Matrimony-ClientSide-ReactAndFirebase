import { Button, Card } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";


const MyReqContacts = () => {

    let { user } = useAuth();
    let axiosSecure = useAxiosSecure();
    const { data: myRequestedUser = [] } = useQuery({
        queryKey: ['myRequestedUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myRequestedUser/${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="w-11/12 mx-auto my-10">
            <Helmet>
                <title>Milon Mela | Requested User</title>
            </Helmet>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Bio-Id</th>
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
                                <td className="p-4 border-b border-blue-gray-50">
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
                                    <Button>Delete</Button>
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