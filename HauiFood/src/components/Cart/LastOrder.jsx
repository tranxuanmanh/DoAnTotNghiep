import React from 'react'
import { useLocation } from 'react-router';

const LastOrder = () => {
    const location=useLocation();
    const { response } = location.state || {};
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
  
  return (
    <div className='min-h-[600px]'>
      <p className='ms-3 mt-5 hover:text-red-500 cursor-pointer'>  Tiếp tục mua hàng</p>
      <div className=' mt-20 mx-auto w-[50%] min-h-[200px] p-4 bg-amber-100 text-green-600 rounded text-center font-bold text-xl'>
        <p>Cảm ơn quý khách đã mua hàng!!!</p>
        <p className='text-red-500 text-lg'>Mã đơn hàng của bạn là : {response?.data?.orderCode||"000"}</p>
        <img src="https://kenhdauthau.com/wp-content/uploads/2020/04/dau-tich-v.png" className='w-30 mx-auto' alt="" />
      </div>
    </div>
  )
}

export default LastOrder
