import { Button, Input, Option, Radio, Select, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import CardSection from "../Home/CardSection";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useBioData from "../../Hooks/useBioData";

const Biodatas = () => {
    let axiosPublic = useAxiosPublic();
    let [Filtered, setFiltered] = useState();
    const [active, setActive] = useState(1);

    let [biodataCollection] = useBioData();
    let total = biodataCollection?.length;
    let maxvalue = Math.ceil(total/20);

    const { data: allBiodataCollection = [], refetch } = useQuery({
        queryKey: ['allBiodataCollection'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allBiodataCollection?page=${active - 1}`);
            return res.data;
        }
    })
    const next = () => {
        if (active === maxvalue) return;
        setActive(active + 1);
        refetch();
    };
    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        refetch();
    };

    useEffect(()=>{
            refetch()
    },[active,refetch])

    useEffect(() => {
        setFiltered(allBiodataCollection);
    }, [allBiodataCollection])

    let handleAgeSearch = (e) => {
        e.preventDefault();
        let form = e.target;
        let minAge = parseInt(form.minAge.value);
        let maxAge = parseInt(form.maxAge.value);
        let AgeFilter = allBiodataCollection.filter((item) => item.Age >= minAge && item.Age <= maxAge);
        setFiltered(AgeFilter);
    };

    let handleDivisionSearch = (selectedValue) => {
        // console.log(selectedValue);
        let DivisionFilter = allBiodataCollection.filter((item) => item?.PermanentDiv == selectedValue)
        setFiltered(DivisionFilter);
    }

    const handleGenderChange = (event) => {
        // event.preventDefault();
        let gender = event.target.value;
        let GenderFilter = allBiodataCollection.filter((item) => item?.Gender == gender);
        setFiltered(GenderFilter);
    };

    return (
        <div >
            <Helmet><title>Milon Mela | All Biodata</title></Helmet>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 px-2 gap-5 mx-auto h-screen overflow-y-scroll">
                        {
                            Filtered?.map(item => <CardSection
                                key={item._id}
                                item={item}></CardSection>)
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-5">
                <div className="flex items-center gap-8 text=lg">
                    <IconButton className="text-xl"
                        variant="outlined"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                    <Typography color="gray" className="font-normal">
                        Page <strong className="text-gray-900 text-xl">{active}</strong> of{" "}
                        <strong className="text-gray-900 text-xl">{maxvalue}</strong>
                    </Typography>
                    <IconButton className="text-xl"
                        variant="outlined"
                        onClick={next}
                        disabled={active === maxvalue}
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </div>
            </div>

        </div>
    )
}
export default Biodatas;