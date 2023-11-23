import { Button } from '@material-tailwind/react';
import img from '../../assets/Home/Banner.jpg'

const Banner = () => {
    return (
        <div className='relative h-[500px] rounded-sm'>
            <img className='w-full h-full' src={img} alt="" />
            <div className="absolute flex md:items-center h-full bg-gradient-to-r from-[#584f4f] to-[rgba(21, 21, 21, 0.00)] left-0 top-0">
                <div className="space-y-5 w-full md:w-8/12 px-5 md:pl-20 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold w-full md:w-8/12">Find your Love, and Stay Happy</h1>
                    <p className="w-10/12">Milon Mela, Bangladeshi matrimony website, is dedicated to helping to find their perfect match. With a comprehensive profiles, advanced search filters, Milon Mela simplifies the journey towards lifelong companionship. </p>
                    <div className="flex gap-5">
                        <Button className=" bg-[#FF3811] text-white">Explore Us</Button>
                        <Button className=" text-white">Find your Own</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner;