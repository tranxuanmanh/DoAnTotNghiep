
// export default Banner
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import CSS của Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImageSlider = () => {
  const [banners] = useState([
    {
      id: 1,
      image: "https://theme.hstatic.net/1000242782/1000838257/14/slideshow_2.jpg?v=620"
    },
    {
      id: 2,
      image: "https://theme.hstatic.net/1000242782/1000838257/14/slideshow_1.jpg?v=620"
    },
    {
      id: 3,
      image: "https://file.hstatic.net/1000242782/article/combo_owing_zalo_abf9e4f746f040d9862bec1971518300_1024x1024.png"
    },
    {
      id: 4,
      image: "https://theme.hstatic.net/1000242782/1000838257/14/slideshow_1.jpg?v=620"
    },{
      id:5,
      image:"https://file.hstatic.net/1000242782/article/combo_owing_zalo_abf9e4f746f040d9862bec1971518300_1024x1024.png"
    }
  ]);

  return (
    <>
    <div className="bg-gray-100 py-2 px-3 w-[100%] h-[370px]  flex ">
    <div className="w-[40%] h-[98%] relative overflow-hidden z-10">
      <Swiper
        spaceBetween={30} // Khoảng cách giữa các ảnh
        centeredSlides={true} // Ảnh ở giữa
        autoplay={{
          delay: 3000, // Tự động chuyển ảnh sau 3 giây
          disableOnInteraction: false, // Không dừng khi người dùng tương tác
        }}
        pagination={{ clickable: true }} // Hiển thị chấm tròn
        navigation={true} // Hiển thị nút chuyển ảnh
        loop={true} // Lặp vô hạn
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <a href="#">
            <img
              src={item.image}
              alt={`Banner ${item.id}`}
              className="w-full h-full object-cover"
            />
            </a>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className="grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-4 ms-2 w-[59%]">
          <img src="https://theme.hstatic.net/1000242782/1000838257/14/slideshow_1.jpg?v=620" alt="" />
          <img src="https://theme.hstatic.net/1000242782/1000838257/14/slideshow_1.jpg?v=620" alt="" />
          <img src="https://theme.hstatic.net/1000242782/1000838257/14/slideshow_1.jpg?v=620" alt="" />
          <img src="https://theme.hstatic.net/1000242782/1000838257/14/slideshow_1.jpg?v=620" alt="" />
    </div>
    </div>

        <div className="w-[100%] h-[200px] bg-gray-100 flex">
          <div className="p-4 flex-1/4 flex flex-col justify-center text-center gap-y-1 border-r-2 border-dotted border-r-amber-300">
            <img className="w-[50px] mx-auto" src="//theme.hstatic.net/1000242782/1000838257/14/support_1_ic.png?v=620" alt="" />
            <p className="font-semibold uppercase">Nhiều ưu đãi hấp dẫn</p>
            <p className="text-gray-400 text-sm ">Hotline: 0972685517</p>
          </div>
          <div className=" p-4 flex-1/4 flex flex-col justify-center text-center gap-y-1 border-r-2 border-dotted border-r-amber-300">
            <img className="w-[50px] mx-auto" src="https://theme.hstatic.net/1000242782/1000838257/14/support_2_ic.png?v=620" alt="" />
            <p className="font-semibold uppercase">Gà giòn tươi ngon</p>
            <p className="text-gray-400 text-sm ">Đậm vị KFC</p>
          </div>
          <div className=" p-4 flex-1/4 flex flex-col justify-center text-center gap-y-1 border-r-2 border-dotted border-r-amber-300">
            <img className="w-[50px] mx-auto" src="https://theme.hstatic.net/1000242782/1000838257/14/support_3_ic.png?v=620" alt="" />
            <p className="font-semibold uppercase">Thanh toán trực tuyến</p>
            <p className="text-gray-400 text-sm ">Thanh toán online </p>
          </div>
          <div className=" p-4 flex-1/4 flex flex-col justify-center text-center gap-y-1 ">
            <img className="w-[50px] mx-auto" src="https://theme.hstatic.net/1000242782/1000838257/14/support_4_ic.png?v=620" alt="" />
            <p className="font-semibold uppercase">Hỗ trợ nhanh chóng</p>
            <p className="text-gray-400 text-sm ">Từ 7:00 đến 22:00 tất cả các ngày trong tuần</p>
          </div>
        </div>



    </>
  
   
  );
};

export default ImageSlider;

