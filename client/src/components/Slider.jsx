import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={25}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className='inf-slider'
    >
      <SwiperSlide>
        <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
          <img
            src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
            className='object-cover  h-[180px] w-full mt-[2%]'
            alt=''
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0",
              backgroundImage:
                "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
              backgroundColor: "#dcf2f8",
              overflow: "hidden",
              width: "100%",
              height: "95px",
              border: "1px solid transparent",
            }}
          >
            <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
              Phòng khách Thương gia
            </h3>
            <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>
              Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
          <img
            src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
            className='object-cover  h-[180px] w-full mt-[2%]'
            alt=''
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0",
              backgroundImage:
                "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
              backgroundColor: "#dcf2f8",
              overflow: "hidden",
              width: "100%",
              height: "95px",
              border: "1px solid transparent",
            }}
          >
            <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
              Phòng khách Thương gia
            </h3>
            <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>
              Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
          <img
            src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
            className='object-cover  h-[180px] w-full mt-[2%]'
            alt=''
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0",
              backgroundImage:
                "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
              backgroundColor: "#dcf2f8",
              overflow: "hidden",
              width: "100%",
              height: "95px",
              border: "1px solid transparent",
            }}
          >
            <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
              Phòng khách Thương gia
            </h3>
            <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>
              Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
          <img
            src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
            className='object-cover  h-[180px] w-full mt-[2%]'
            alt=''
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0",
              backgroundImage:
                "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
              backgroundColor: "#dcf2f8",
              overflow: "hidden",
              width: "100%",
              height: "95px",
              border: "1px solid transparent",
            }}
          >
            <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
              Phòng khách Thương gia
            </h3>
            <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>
              Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
          <img
            src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
            className='object-cover  h-[180px] w-full mt-[2%]'
            alt=''
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0",
              backgroundImage:
                "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
              backgroundColor: "#dcf2f8",
              overflow: "hidden",
              width: "100%",
              height: "95px",
              border: "1px solid transparent",
            }}
          >
            <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
              Phòng khách Thương gia
            </h3>
            <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>
              Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
          <img
            src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
            className='object-cover  h-[180px] w-full mt-[2%]'
            alt=''
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              left: "0",
              backgroundImage:
                "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
              backgroundColor: "#dcf2f8",
              overflow: "hidden",
              width: "100%",
              height: "95px",
              border: "1px solid transparent",
            }}
          >
            <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
              Phòng khách Thương gia
            </h3>
            <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>
              Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
