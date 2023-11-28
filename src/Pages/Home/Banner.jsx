
import img from '../../assets/Home/Banner.jpg'
import img2 from '../../assets/Home/MilonMela.png'

const Banner = () => {
    return (
        <div className='relative mb-10'>
            <div className='relative h-[500px] rounded-sm'>
                <img className='w-full h-full' src={img} alt="" />
                <div className="absolute flex md:items-center h-full bg-gradient-to-r from-[#584f4f] to-[rgba(21, 21, 21, 0.00)] left-0 top-0">
                </div>
            </div>
            <div className='text-white bg-black w-full min-h-[220px] absolute bottom-0 flex justify-center items-center bg-opacity-70'>
                <div>
                    <img className='md:pl-10 my-5' src={img2} alt="" />
                    <h1 className='text-lg md:text-2xl text-center my-5'>Safest & Most Secured Matrimony Site in Bangladesh</h1>
                </div>
            </div>
        </div>
    )
}
export default Banner;