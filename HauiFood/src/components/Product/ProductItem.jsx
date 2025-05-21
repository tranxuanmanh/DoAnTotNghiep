import React from 'react'
// import Modup from './Modup/Modup'
import { useState } from 'react';
import Modup from './ModalProduct/Modal';

import { ToastContainer } from 'react-toastify';
import Modal from './ModalProduct/Modal';
import { useNavigate } from 'react-router';
const ProductItem = ({product,hot,sale}) => {

  const navigate=useNavigate();
   const[isActive,setIsActive]=useState(false);
  return (
    <>
      <div key={product.id} className={`w-[15%] h-auto shadow hover:shadow-blue-400 relative p-1.5 rounded-lg ${sale?'hover:shadow-amber-400 bg-white':'bg-white'} ${hot?'hover:shadow-red-400 bg-white':'bg-white'}`}>
             {hot && <p className=' rounded absolute mt-2 bg-red-500 p-1 text-white font-semibold'>Bán chạy</p>}
             {sale && <p className=' rounded-full absolute mt-2 bg-blue-500 px-3 py-1 text-white text-sm'>- {product.priceDiscount}%</p>}
              <ToastContainer/>
              <img src={product.images?.[0]?.image_url||"https://down-vn.img.susercontent.com/file/vn-11134201-23030-j68t1c29heov72"} alt={product.title} className="w-full h-32 object-cover mb-2 rounded" />
              <h3 className=" text-ellipsis whitespace-nowrap overflow-hidden font-semibold mb-1">{String(product.name)}</h3>
              <div className="flex items-center justify-between mb-1">
                <span  className="text-red-500 font-semibold ">{product.priceSell?.toLocaleString()} đ</span>
                <span  className="text-gray-500 line-through me-4">{product.price==product.priceSell?"": product.price?.toLocaleString()||""}</span>
              </div>
              
              <div className="flex flex-wrap justify-between gap-2 mb-1 text-sm ">
                <p >Số lượng : {product.quantity}</p>
              {hot?(
                <p>Đã bán:<span className='text-red-500 font-semibold'> {product.sold_quantity}</span></p>
              ):("")}  
              </div>
              <div>
                <button 
                className={` rounded-lg px-2 py-1 mr-2 text-sm border-2 border-blue-400 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white`}
                onClick={()=>setIsActive(true)}
                >
                   <i className="fa-solid fa-cart-plus mr-1"></i>
                  Thêm vào giỏ
                  </button>
                <button  
                onClick={()=>navigate(`/chi-tiet-san-pham/${product.product_id}`)}
                className='border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg px-2 py-1 font-semibold text-sm'>
                 
                  Chi tiết
                </button>
              </div>
            </div>
           {isActive&&<Modal isActive={isActive} setIsActive={setIsActive} show={product}></Modal>}
    </>
  )
}

export default ProductItem
