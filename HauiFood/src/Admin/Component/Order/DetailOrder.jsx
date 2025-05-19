import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import DateFormart from '../Base/DateFormart';
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';

const DetailOrder = () => {
    const {code}=useParams();
    const [detail,setDetail]=useState({});
    const [product,setProduct]=useState([])
    console.log(code)
    const {getToken}=useAuth();
    
    const getDetailOrder=async()=>{
        try{
        const res=await axios.get(`http://localhost:8080/api/v1/order/order-detail/${code}`,{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        });
        const kq=res?.data?.data;
        console.log(kq);
        setDetail(kq);
        setProduct(kq.orderItems);
        }catch(err){
            toast.error("Da xay ra loi khi lay du lieu"+err);
        }
    }
    useEffect(()=>{
        getDetailOrder()
    },[])
    console.log({detail,product})
  return (
    <div className='flex flex-col m-4'>
        <ToastContainer/>
        <Link to="/admin/order-manager"  className='hover:text-yellow-400 cursor-pointer'>
        <i class="fa-solid fa-arrow-left me-3"></i>
        Quay lai
        </Link>
       
        <div className='w-full text-center'>

            <p className='font-bold text-lg text-red-400'>Chi tiết đơn hàng {code}</p>
        </div>
     <div className='flex gap-x-1 mt-2'>
            <div className='flex-1/2  p-3 border rounded bg-gradient-to-t to-green-300 from-teal-400'>
           <p className='text-center font-bold '> Thông tin người đặt hàng</p>
            <ul className='list-disc ms-5 flex flex-col gap-y-3'>
                <li>
                   Họ và tên: {detail.user?.fullName}  
                </li>
                <li>Số điện thoại: {detail.user?.phone}</li>
                <li>Email: {detail.user?.email}</li>
                <li>Ngày đặt hàng: {<DateFormart value={detail.orderDate}/> }</li>
                
            </ul>
                 
            </div>
            <div className='flex-1/2 p-3 border rounded bg-gradient-to-t to-green-300 from-teal-400'>
            <p className='text-center font-bold'>Thông tin người nhận hàng</p>
            <ul className='list-disc ms-5 flex flex-col gap-y-1.5'>
                <li> Họ và tên: {detail?.fullName} </li>
                <li>Số điện thoại:{detail.phoneNumber}</li>
                <li>Địa chỉ nhận hàng : {detail.address}</li>
                <li>Hình thức thanh toán: {detail.payMethod=="CHUYENKHOAN"?"Chuyển khoản":"Tiền mặt"}</li>
                <li>Trạng thái thanh toán: {detail.paymentStatus?"Đã thanh toán":"Chưa thanh toán"}</li>
                <li>Hình thức vận chuyển:
             
                    {detail.shippingMethod==="GIAOVAOLUC"?(<p>Giao vào lúc: {<DateFormart value={detail.deliveryTime}/>}</p>):""}
                     {detail.shippingMethod==="GIAONGAY"?(<p>Giao ngay</p>):""}
                     {detail.shippingMethod==="DENLAY"?(<p>Đến cửa hàng lấy</p>):""}
                   
                    
                     </li>
                <li>Ghi chú: {detail.node?(<p>{detail.note}</p>):("Không")}</li>
            </ul>
            
            </div>
     </div>
     <div className='border bg-gradient-to-l to-green-300 from-sky-300 p-3 rounded mt-1'>
        <p className='font-bold'>Tình trạng đơn hàng: 
             {detail.orderStatus=="CHOXULY"?(<span className='text-red-700'>Chờ xác nhận</span>):"" }
            {detail.orderStatus=="CHAPTHUAN"?(<span className='text-teal-700'>Xác nhận</span>):""}
            {detail.orderStatus=="GIAOHANG"?"Giao hàng":"" }
            {detail.orderStatus=="GIAOTHANHCONG"?"Giao thành công":""}
            {detail.orderStatus=="HUY"?"Đơn bị hủy":"" }
            {detail.orderStatus=="HOANTAT"?(<span className='text-blue-700'>Hoàn thành</span>):""}
        </p>
        {detail.orderStatus=="HOANTAT"?(<p className='font-bold'>Hoàn thành lúc: {<DateFormart value={detail.completedAt}/>}</p>):("")}
        <p className='font-bold'>Voucher: Không</p>
     </div>
     <div className='w-[100%] '>
    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
           Danh sách sản phẩm đặt
           
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
            <th scope="col" class="px-6 py-3">
                   Id
                </th>
                <th scope="col" class="px-6 py-3">
                   Hình ảnh
                </th>
                <th scope="col" class="px-6 py-3">
                   Tên sản phẩm
                </th>
                <th scope="col" class="px-6 py-3">
                    Số lượng
                </th>
                <th scope="col" class="px-6 py-3">
                    Giá bán
                </th>
                <th scope="col" class="px-6 py-3">
                    Thêm
                </th>
                <th scope="col" class="px-6 py-3  text-center">
                   Thành tiền
                </th>
            </tr>
        </thead>
        <tbody className='text-black'>
            {
                product.length>0?(
                    product.map((item,index)=>(
                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item?.product?.product_id }
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <img className='w-20' src={item.product?.images[0]?.image_url||"https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482742OCH/anh-mo-ta.png"} alt="" /> 
                        </th>
                        
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item?.product?.name}
                        </th>
                        <td class="px-6 py-4">
                            {item?.quantity}
                        </td>
                        <td class="px-6 py-4 ">
                           {item?.priceItem?.toLocaleString()} đ
                        </td>
                        <td class="px-6 py-4">
                        <ul class="list-decimal">
                            {item.toppings.length>0?(item.toppings.map((topping, index) => (
                            
                            <li key={index}>{topping.name} (+{topping.price} đ)</li>
                           
                        ))):"Không có"}
                        
                       
                        </ul>
                        </td>
                        <td class="px-6 py-4  text-center">
                           <p>
                            {item.subPrice.toLocaleString()} đ
                           </p>
                        </td>
                    </tr>
                    ))
                   

                    
                ):"Không có sản phẩm nào"
            }
         {
            detail!=null&&(
                <tr >
                    <td colSpan={7}>
                    <p className='my-2 text-end me-5 text-black font-bold text-lg'>Tổng tiền : {detail.totalAmount?.toLocaleString()} đ</p>
                    </td>
                </tr>
            )
         }
           
        </tbody>
    </table>
</div>

     </div>
    </div>
  )
}

export default DetailOrder
