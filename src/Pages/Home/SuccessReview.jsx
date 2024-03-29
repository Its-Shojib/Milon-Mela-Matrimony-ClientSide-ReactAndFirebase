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
import Section_Title from '../../Shared-Compo/Section_Title';


const SuccessReview = () => {
    let [SuccessStory] = useSuccessStory();
    return (
        <div className='my-10 '>
            <Section_Title subTitle={'what people says'} title={'Success Story'}></Section_Title>
            <div className='bg-[#172935] rounded-lg my-5 py-5 px-4 min-h-[400px]'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        SuccessStory?.map(item => <SwiperSlide key={item?._id}>
                            <div className='flex flex-col md:flex-row'>
                                <div className='h-full flex-1 ml-12'>
                                    <img className='h-[380px] w-3/4' src={item?.coupleImage} alt="" />
                                </div>
                                <div className='flex-1 text-white space-y-3'>
                                    <h2 className=' text-2xl font-bold  mt-10 mb-5'>{`${item?.myName} 💖 ${item?.partnerName}`}</h2>
                                    <p className=''><Rating
                                        style={{ maxWidth: 180 }}
                                        value={item?.rating}
                                        readOnly
                                    /></p>
                                    <p className='text-lg'>Marrige Date: {item?.marrigeDate}</p>
                                    <p className='text-lg pr-10'>Couple Says: {item?.story}</p>
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