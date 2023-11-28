import { Button, Card, DialogHeader } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import useSuccessStory from "../../Hooks/useSuccessStory";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useState } from "react";
import Section_Title from "../../Shared-Compo/Section_Title";

const SuccessStory = () => {
    const [open, setOpen] = useState(false);
    let [SStory,setSStory] = useState('');
    let [Names, setNames] = useState();
    let [SuccessStory] = useSuccessStory();
    const handleOpen = (item) => {
        let text = `${item.myName} 💕 ${item?.partnerName}`;
        setSStory(item?.story);
        setNames(text);
        setOpen(!open)
    };
    return (
        <div className="w-11/12 mx-auto my-10">
            <Helmet>
                <title>Milon Mela | Success Story</title>
            </Helmet>
            <Section_Title subTitle={'married couple'} title={'Success Story'}></Section_Title>
            <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="">
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Male Bio-Id</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Female Bio-Id</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Marrige Date</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50">Story</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SuccessStory?.map((item, index) => <tr key={item?._id}>
                                <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                <td className=" border-b border-blue-gray-50">
                                    {item?.myBioId}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.partnerBioId}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {item?.marrigeDate}
                                </td>
                                <th className="p-4 border-b border-blue-gray-50">
                                    <Button onClick={()=>handleOpen(item)}>View Story</Button>
                                    <Dialog open={open} handler={handleOpen}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0.9, y: -100 },
                                        }}
                                    >
                                        <DialogHeader>{Names}</DialogHeader>
                                        <DialogBody>
                                            {SStory}
                                        </DialogBody>
                                        <DialogFooter>
                                            <Button variant="text" color="red" onClick={handleOpen}
                                                className="mr-1"
                                            >
                                                <span>Close</span>
                                            </Button>
                                        </DialogFooter>
                                    </Dialog>
                                </th>

                            </tr>
                            )
                        }
                    </tbody>
                </table>


            </Card>
        </div>
    )
}
export default SuccessStory;