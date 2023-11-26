// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';


const SuccessStory = () => {
    return (
        <div className='my-10 '>
            <h2 className='text-center text-3xl md:text-5xl font-bold'>Our <span className='text-rose-800'>Community</span> Says</h2>
            <div className='bg-gradient-to-r from-[#688ea8] to-[#172935] rounded-lg my-10 py-5 px-4'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>Slide 1</SwiperSlide>

                </Swiper>
            </div>
        </div >
    )
}
export default SuccessStory;