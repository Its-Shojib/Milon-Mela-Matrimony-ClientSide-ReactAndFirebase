import { Button, Card } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import useSuccessStory from "../../Hooks/useSuccessStory";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useState } from "react";

const SuccessStory = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    let [SuccessStory] = useSuccessStory();
    return (
        <div className="w-11/12 mx-auto my-10">
            <h1 className="text-center text-3xl font-bold text-red-900 my-5">| All Married couple are here |</h1>
            <Helmet>
                <title>Milon Mela | Success Story</title>
            </Helmet>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Partner Name</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Marrige Date</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Story</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SuccessStory?.map((item, index) => <tr key={item?._id}>
                                <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                <td className=" border-b border-blue-gray-50">
                                    {item?.myName}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.partnerName}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.marrigeDate}
                                </td>
                                <th className="p-4 border-b border-blue-gray-50">
                                    <Button onClick={handleOpen}>View Story</Button>
                                    <Dialog
                                        open={open}
                                        handler={handleOpen}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0.9, y: -100 },
                                        }}
                                    >
                                        <DialogHeader>{`${item?.myName} & ${item?.partnerName}`}</DialogHeader>
                                        <DialogBody>
                                            {item?.story}
                                        </DialogBody>
                                        <DialogFooter>
                                            <Button
                                                variant="text"
                                                color="red"
                                                onClick={handleOpen}
                                                className="mr-1"
                                            >
                                                <span>Close</span>
                                            </Button>
                                        </DialogFooter>
                                    </Dialog>
                                </th>

                            </tr>
                            )}
                    </tbody>
                </table>


            </Card>
        </div>
    )
}
export default SuccessStory;