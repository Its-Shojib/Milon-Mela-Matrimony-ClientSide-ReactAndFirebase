// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

// import required modules
import { Navigation } from 'swiper/modules';
import useSuccessStory from '../../Hooks/useSuccessStory';


const SuccessReview = () => {
    let [SuccessStory] = useSuccessStory();
    return (
        <div className='my-10 '>
            <h2 className='text-center text-3xl md:text-3xl font-bold'>Our <span className='text-red-800'>Success</span> Story</h2>
            <div className='bg-[#172935] rounded-lg my-10 py-5 px-4'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        SuccessStory?.map(item => <SwiperSlide key={item?._id}>
                            <div className='flex flex-col md:flex-row'>
                                <div className='h-72 flex-1 ml-12'>
                                    <img className='h-full w-3/4' src={item?.coupleImage} alt="" />
                                </div>
                                <div className='flex-1 text-white space-y-3'>
                                    <h2 className=' text-2xl font-bold  mt-10 mb-5'>{`${item?.myName} 💖 ${item?.partnerName}`}</h2>
                                    <p className=''><Rating
                                        style={{ maxWidth: 180 }}
                                        value={item?.rating}
                                        readOnly
                                    /></p>
                                    <p className='text-lg'>Marrige Date: {item?.marrigeDate}</p>
                                    <p className='text-lg'>Couple Says: {item?.story}</p>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </div >
    )
}
export default SuccessReview;