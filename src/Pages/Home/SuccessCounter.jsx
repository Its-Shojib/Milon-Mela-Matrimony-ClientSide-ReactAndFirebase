// import { useState } from 'react';
import useBioData from '../../Hooks/useBioData';
import img1 from '../../assets/Home/total-removebg-preview.png'
import img2 from '../../assets/Home/image-removebg-preview.png'
import img3 from '../../assets/Home/image-removebg-preview (1).png'
import img4 from '../../assets/Home/image-removebg-preview (2).png'
import useSuccessStory from '../../Hooks/useSuccessStory';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SuccessCounter = () => {
    // let axiosPublic = useAxiosPublic();

    // let [marrigeCounter, setMarrigeCounter] = useState(0)
    let [biodataCollection] = useBioData()
    let GirlsBio = biodataCollection.filter((item)=> item.Gender === 'female');
    let BoysBio = biodataCollection.filter((item)=> item.Gender === 'male');
    let [SuccessStory] = useSuccessStory();

    return (
        <div className="bg-black min-h-[250px] my-5 text-white flex justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                <div>
                    <img className='w-40' src={img1} alt="" />
                    <h1 className='text-2xl'>Total Biodata: {biodataCollection.length}</h1>
                </div>
                <div>
                    <img className='w-40' src={img2} alt="" />
                    <h1 className='text-2xl'>Total Girls: {GirlsBio.length}</h1>
                </div>
                <div>
                    <img className='w-40' src={img3} alt="" />
                    <h1 className='text-2xl'>Total Boys: {BoysBio.length}</h1>
                </div>
                <div>
                    <img className='w-40' src={img4} alt="" />
                    <h1 className='text-2xl'>Total Marrige: {SuccessStory.length}</h1>
                </div>
            </div>
        </div>
    )
}
export default SuccessCounter;