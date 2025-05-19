import React from 'react'
// import Modup from './Modup/Modup'
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import Modal from '../Product/ModalProduct/Modal';
import { useNavigate } from 'react-router';

const ItemProductByDanhMuc = ({product}) => {
   const[isActive,setIsActive]=useState(false);
   const navigate=useNavigate();
  return (
    <div>
      <div key={product.id} className={`w-[220px] shadow-md hover:shadow-gray-400 relative p-1.5 rounded-lg bg-white`}>
            
              <ToastContainer/>
              <img src={product.images?.[0]?.image_url||"https://down-vn.img.susercontent.com/file/vn-11134201-23030-j68t1c29heov72"} alt={product.title} className="w-[200px] h-32 object-cover mb-2 rounded" />
              <h3 className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mb-1">
                <span  className="text-red-500 font-semibold ">{product.priceSell?.toLocaleString()} đ</span>
                <span  className="text-gray-500 line-through me-4">{product.price?.toLocaleString()||""}</span>
              </div>
              
              <div className="flex flex-wrap justify-between gap-2 mb-1 text-sm ">
                <p >Số lượng : {product.quantity}</p>
               
              </div>
              <div>
                <button 
                data-modal-target="crud-modal"
                 data-modal-toggle="crud-modal"
              
                className={` rounded-lg px-2 py-1 mr-2 text-sm border-2 border-blue-400 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white`}
                 onClick={()=>setIsActive(!isActive)}
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
    </div>
  )
}

export default ItemProductByDanhMuc
