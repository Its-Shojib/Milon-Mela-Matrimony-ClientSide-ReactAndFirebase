import { Button, Input, Option, Radio, Select } from "@material-tailwind/react";
import useBioData from "../../Hooks/useBioData";
import CardSection from "../Home/CardSection";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";


const Biodatas = () => {
    let [Filtered, setFiltered] = useState();
    let [biodataCollection] = useBioData();

    useEffect(() => {
        setFiltered(biodataCollection);
    }, [biodataCollection])

    let handleAgeSearch = (e) => {
        e.preventDefault();
        let form = e.target;
        let minAge = parseInt(form.minAge.value);
        let maxAge = parseInt(form.maxAge.value);
        let AgeFilter = biodataCollection.filter((item) => item.Age >= minAge && item.Age <= maxAge);
        setFiltered(AgeFilter);
    };

    let handleDivisionSearch = (selectedValue) => {
        console.log(selectedValue);
        let DivisionFilter = biodataCollection.filter((item) => item?.PermanentDiv == selectedValue)
        setFiltered(DivisionFilter);
    }

    const handleGenderChange = (event) => {
        // event.preventDefault();
        let gender = event.target.value;
        let GenderFilter = biodataCollection.filter((item) => item?.Gender == gender);
        setFiltered(GenderFilter);
    };

    return (
        <div className="flex">
            <div className="w-3/12 bg-[#172935] min-h-screen p-2">
                <div>
                    <p className=" text-xl my-2 font-bold text-white" >Age</p>
                    <div className="w-full">
                        <form onSubmit={handleAgeSearch}>
                            <Input type="number" label="Min Age" name='minAge' className="w-10/12 mx-auto text-white" /> <br />
                            <Input type="number" label="Max Age" name='maxAge' className="w-10/12 mx-auto text-white" /><br />
                            <Button type="submit" className="text-white mx-auto block">Apply</Button>
                        </form>
                    </div>
                </div>
                <div>
                    <p className=" text-xl font-bold text-white" >Gender</p>
                    <form className="text-white">
                        <label>
                            <Radio
                                label="Male"
                                name="gender"
                                value="male"
                                onChange={handleGenderChange}
                            />
                        </label>
                        <label>
                            <Radio
                                label="Female"
                                name="gender"
                                value="female"
                                onChange={handleGenderChange}
                            />
                        </label>
                    </form>
                </div>
                <div className="text-lg">
                    <p className="text-xl my-2 font-bold text-white" >Division</p>
                    <Select label="Select Division" onChange={handleDivisionSearch}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:px-5 gap-5 mx-auto h-screen overflow-y-scroll">
                    {
                        Filtered?.map(item => <CardSection
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