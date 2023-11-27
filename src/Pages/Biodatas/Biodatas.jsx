import { Button, Input, Option, Radio, Select } from "@material-tailwind/react";
import useBioData from "../../Hooks/useBioData";
import CardSection from "../Home/CardSection";
import { Helmet } from "react-helmet-async";



const Biodatas = () => {
    let [biodataCollection] = useBioData();
    return (
        <div className="flex">
            <div className="w-3/12 bg-[#172935] min-h-screen p-2">
                <div>
                    <p className=" text-xl my-2 font-bold text-white" >Age</p>
                    <div className="w-full">
                        <form>
                            <Input type="number" label="Min Age" className="w-10/12 mx-auto text-white" /> <br />
                            <Input type="number" label="Max Age" className="w-10/12 mx-auto text-white" /><br />
                            <Button type="submit" className="text-white mx-auto block">Apply</Button>
                        </form>
                    </div>
                </div>
                <div>
                    <p className=" text-xl font-bold text-white" >Gender</p>
                    <form>
                        <div className="flex gap-10 text-white pl-5">
                            <Radio name="type" label="Male" />
                            <Radio name="type" label="Female" />
                        </div>
                    </form>
                </div>
                <div className="text-lg">
                    <p className="text-xl my-2 font-bold text-white" >Division</p>
                    <Select label="Select Division">
                        <Option value="Dhaka">Dhaka</Option>
                        <Option value="Chattagram">Chattagram</Option>
                        <Option value="Rajshahi">Rajshahi</Option>
                        <Option value="Rangpur">Rangpur</Option>
                        <Option value="Barisal">Barisal</Option>
                        <Option value="Khulna">Khulna</Option>
                        <Option value="Maymansign">Maymansign</Option>
                        <Option value="Sylhet">Sylhet</Option>
                    </Select>
                </div>
            </div>
            <div className="w-9/12 bg-white min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:p-5 gap-5 mx-auto h-screen overflow-y-scroll">
                {
                    biodataCollection?.map(item => <CardSection
                        key={item._id}
                        item={item}></CardSection>)
                }
            </div>
            </div>
            <Helmet><title>Milon Mela | All Biodata</title></Helmet>
        </div>
    )
}
export default Biodatas;