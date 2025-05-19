import React, { useState } from 'react'

const ItemVoucher = ({item,activeId, handleClick}) => {
    const isActive = activeId === item.voucherId;
   
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(item.voucherCode);
        handleClick(item.voucherId);
        setCopied(!copied);
        // setTimeout(() => setCopied(false), 1500); // Ẩn sau 1.5s
      };
    
  return (
    <>
      <div className={`${isActive?"border-blue-400  bg-blue-100":"bg-white"} h-34 flex justify-between  shadow-xl shadow-gray-400 p-2 md:w-[32%] sm:w-[50%] rounded-sm mb-3`}>
        <img className='rounded' src="https://salt.tikicdn.com/cache/128x128/ts/upload/35/5a/84/aeb7211d441194fc09cd1baf3c1930e4.jpg" alt="" />
        <div className='flex-1 border-l-1 border-dotted  flex flex-col justify-between ms-2 px-2 '>
        <div>
        <p className=' font-bold'>Giảm {Number(item.discount)/1000}K</p>
        <p className='text-gray-500'>Cho đơn hàng từ {Number(item.minOrder)/1000} nghìn</p>
        </div>
        <div>
            <p className='text-gray-500 items-end'>HSD: {String(item.endDate).substring(0,11)}</p>
        </div>
        
        </div>
        <div className="flex flex-col justify-between items-end ">
    {/* Info icon */}
    <div className="relative group">
      <span className="cursor-pointer">ℹ️</span>

      {/* Tooltip phía trên chỉ hiện khi hover icon */}
      <div className="absolute right-0 bottom-full mb-2 w-64 max-w-[250px] bg-white border border-gray-300 rounded-md shadow-lg text-sm text-gray-700 p-2 hidden group-hover:block z-50">
        <p className=''><strong>Mã:</strong> {item.voucherCode}</p>
        <p><strong>Hạn sử dụng:</strong> {String(item.endDate).substring(0,11)}</p>
         <p><strong>Số lượng:</strong> {item.quantity}</p>
        <p><strong>Đã dùng:</strong> {item.numberUsed}</p>
        <p className="font-semibold mt-2">Điều kiện:</p>
        <ul className="list-disc list-inside">
          <li>{item.description}</li>
          <li>Mỗi đơn hàng được sử dụng 1 mã giảm giá</li>
        </ul>
      </div>
    </div>

    {/* Copy button */}
    <button onClick={handleCopy} className={`bg-blue-600  text-white py-1  px-4 rounded-sm text-sm font-semibold hover:bg-yellow-500 mt-2  cursor-pointer `}>
    {copied==true ? 'Đã copy' : 'Copy'}
    </button>
  </div>
    </div>
    </>
  )
}

export default ItemVoucher
