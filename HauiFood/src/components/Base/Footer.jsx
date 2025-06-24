import React from 'react'

const Footer = () => {
  return (
    <div className='w-[100%] p-2 bg-black text-white border-t-2 border-black relative'>
      {/* Footer top */}
     <div className='flex justify-around mb-2'>
      <div className='w-[30%] bg-white'>
        <p className='font-semibold px-2 text-black'>Cửa hàng đồ ăn nhanh</p>
        <img src="https://theme.hstatic.net/1000242782/1000838257/14/logo.png?v=620" alt="" className='w-30 h-20' />
        <div className='p-2'>
        <iframe
        className='rounded'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4736632150543!2d105.73252651032357!3d21.053735986840405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZ2BuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1747706859043!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      />
      <div className='text-xl flex gap-x-5 mt-2 '>
        <i class="text-blue-500 bg-white  rounded-full fa-brands fa-facebook"></i>
        <i class="fa-brands fa-instagram text-black"></i>
        <i class="text-red-500 fa-brands fa-youtube rounded-lg "></i>
        <i class="text-blue-500 fa-brands fa-twitter "></i>
      </div>
        </div>
      </div>
      <div className='w-[30%]  p-2'>
        <p className='font-semibold ms-2'>Tóm tắt</p>
        <p className='ms-1'>
          Cửa hàng chuyên bán các loại đồ ăn nhanh đã được chế biến sẵn như xúc xích, lạp xưởng, bánh tráng đảm bảo vệ sinh an toàn thực phẩm. Ngoài ra cửa hàng còn có nước ép, cafe, sữa chua để phục vụ nhu cầu của khách hàng.
        </p>
       <p className=' font-bold ms-2'>Danh mục</p>
       <ul style={{listStyleType:"revert"}} className='ms-7'>
        <li>Đồ ăn</li>
        <li>Đồ uống</li>
        <li>Combo</li>
        <li>Đồ ăn</li>
       </ul>
      </div>
      <div className='w-[30%] p-2'>
       <p className=' font-bold'>Liên hệ với cửa hàng</p>
       <ul style={{listStyleType:"revert"}} className='ms-1'>
      <p>
        <i class="fa-solid fa-location-dot me-2 text-blue-500"></i>
        Số 297 đường Cầu Diễn,phường Minh Khai,quận Bắc Từ Liêm,thành phố Hà Nội</p>
        <p>
          <i class="fa-solid fa-phone text-red-400 me-2"></i>
          0972685517
        </p>
        <p>
          <i class="fa-solid fa-envelope me-2 text-red-500"></i>
          tranmanh2003tvt@gmail.com
        </p>
        <p>
          <i class="fa-solid fa-clock me-2"></i>
          Thời gian hoạt động 8h-22h
        </p>
       </ul>
      </div>
     </div>
     {/* Footer bottom */}

     <div className='border-t-2 border-white text-gray-400 text-center'>
    @Copyright Haui Food 2025 - Tran Xuan Manh
     </div>


     <a href='#' className='absolute  top-46 right-5'> 
      <i class="fa-solid fa-chevron-up font-bold text-2xl bg-blue-400 p-2 rounded"></i>

     </a>
    </div>
  )
}
 
export default Footer
