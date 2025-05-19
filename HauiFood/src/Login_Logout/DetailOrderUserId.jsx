import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import DateFormart from '../Admin/Component/Base/DateFormart';

const DetailOrderUserID = () => {
    const navigate=useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const {id}=useParams();
    const [detail,setDetail]=useState(null);

    const [search,setSearch]=useState("");
    

    const [orderDetail,setOrderDetail]=useState({
      detail:false,
      orderId:null
    });
   // console.log(detail)
    const getUserById=async()=>{
    try{
      const res=await axios.get(`http://localhost:8080/api/v1/user/${id}`);
      setDetail(res.data);
       console.log(res.data);
      }catch(error){
      console.log("Co loi xay ra" +error);
      }
    }
    useEffect(()=>{
    getUserById();
    
    },[id])
    
  
    const updateStatus=async(madon,trangthai)=>{
      try{
      const res=await axios.put(`http://localhost:8080/api/v1/order/update/${madon}?status=${trangthai}`);
      alert("Cập nhật đơn hàng thành công")
      window.location.reload();
      console.log(res);
      }catch(error){
        console.log(error);
      }
    }
  
    

    const handleSearch=(e)=>{
   
      setSearch(e.target.value);
    }
    console.log(search);

    const filteredOrders = detail?.order?.filter(order =>
      order.orderCode.toLowerCase().includes(search.toLowerCase())
    );
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = filteredOrders?.slice(startIndex, endIndex);
    const totalPages = Math.ceil((filteredOrders?.length>0 || 0) / itemsPerPage);

    const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };
    
    const handlePrev = () => {
      if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };
  return (
    <div className="w-[90%] mx-auto  mt-5 relative">
        {
            user?(
                <>
            <p className="text-center font-bold mb-3">
             Danh sách đơn hàng đã đặt
           </p>
           <div className='flex justify-end mb-4'>
           <div className='w-[30%] text-end relative'>
              <input onChange={handleSearch} type="text" className='rounded p-1 w-[70%]' placeholder='Nhập mã đơn hàng muốn tìm ...' />
              <button title="Tìm kiếm đơn hàng" className=' absolute right-1  ms-1 border-none px-2 py-1.25  rounded text-black font-semibold cursor-pointer pr-2'>
              <i class="fa-solid fa-magnifying-glass"></i>
              </button>
           </div>
           </div>
           <div className='flex justify-between ms-30  p-2'>
            <div>
              <button onClick={handlePrev} title='prev'  disabled={currentPage === 1} className={`${currentPage === 1 ? 'text-gray-400' : 'text-black '} cursor-pointer`}>
              <i class="fa-solid fa-circle-chevron-left me-2 text-xl "></i>
              </button>
              <button onClick={handleNext} title='next'  disabled={currentPage === totalPages} className={`${currentPage === totalPages  ? 'text-gray-400' : 'text-black '} cursor-pointer`}>
              <i class="fa-solid fa-circle-chevron-right text-xl "></i>
              </button>
            </div>
           </div>
          <div className="ms-30">
           

            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                    Mã đơn hàng
                    </th>
                    <th>
                      Tổng tiền
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Chi tiết
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Ngày đặt
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Trạng thái thanh toán
                    </th>
                    
                    <th scope="col" class="px-6 py-3">
                      Trạng thái đơn hàng
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders?.length>0?(
                    paginatedOrders?.map((item,index)=>
                    (
                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    {item.orderCode}
                    </th>
                    <td class="px-6 py-4 ">{item.totalAmount?.toLocaleString()} đ</td>
                    <td class="px-6 py-4 text-blue-400 underline cursor-pointer" onClick={()=>{
                    
                      setOrderDetail(
                        {
                          ...orderDetail,
                          detail:true,
                          orderId:item.order_id
                          
                        }
                       
                      )
                    }}
                    >Chi tiet</td>
                    <td class="px-6 py-4">{<DateFormart value={item.orderDate}/>}</td>
                    <td class="px-6 py-4">{item?.paymentStatus?(<p className="text-green-500">Đã thanh toán</p>):(<p className="text-red-500">Chưa thanh toán</p>)}</td>
                  
                    <td class="px-6 py-4">
                      {item.orderStatus==="CHOXULY"?(<p className="text-red-500">Chờ xử lý</p>):("")}
                      {item.orderStatus==="CHAPTHUAN"?(<p className="text-green-500">Đã xác nhận</p>):("")}
                      {item.orderStatus==="GIAOHANG"?(<p className="text-yellow-500">Đang giao hàng</p>):("")}
                      {item.orderStatus==="GIAOTHANHCONG"?(<p className="text-yellow-500">Giao thành công</p>):("")}
                      {item.orderStatus==="HOANTAT"?(<p className="text-green-500">
                        <i class="fa-regular fa-square-check me-2"></i>
                        Hoàn thành
                        </p>):("")}
                      {item.orderStatus==="HUY"?(<p className="text-red-500">
                        <i class="fa-regular fa-circle-xmark me-2"></i>
                        Đơn bị hủy</p>):("")}
                      </td>
                    <td class="px-6 py-4 ">
                    {item.orderStatus==="CHOXULY"?(
                          <p onClick={()=>updateStatus(item.order_id,"HUY")} title="Hủy đơn hàng" className="bg-red-200 text-red-600 p-2 rounded-lg text-center font-semibold cursor-pointer">
                          <i class="fa-solid fa-xmark me-2"></i>
                         Hủy đơn
                          </p>
                    ):""}

                      {item.orderStatus==="GIAOTHANHCONG"?(
                          <p onClick={()=>updateStatus(item.order_id,"HOANTAT")} title="Hủy đơn hàng" className="bg-green-200 text-green-600 p-2 rounded-lg text-center font-semibold cursor-pointer">
                          <i class="fa-regular fa-circle-check me-2 "></i>
                         Đã nhận hàng
                          </p>
                    ):""}
                    </td>
                  </tr>)

                    )

                  ):(<p>Chua co du lieu</p>)}
                  
               
                </tbody>
              </table>
            </div>
          </div>
                </>
            ):(<p>Bạn chưa đăng nhập</p>)
        }
           
          {orderDetail?.detail==true && (
  <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-90">
    <div className="w-[80%] h-auto relative overflow-y-auto rounded shadow-lg  shadow-gray-500">
    <button
        onClick={() => setOrderDetail(null)}
        className="fixed top-[20px] right-[10%] cursor-pointer text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-center z-100"
      >
        Đóng
      </button>
      <div className='bg-white'>
        <p className='text-center font-semibold p-3'>Thông tin đơn hàng</p>
        {
          detail?.order?.map((item, _)=>{
            if (item.order_id === orderDetail.orderId) {
             
              return (
        <div className='ms-3 flex flex-col gap-y-1'>
            <p>Người nhận: {item.fullName} </p>
            <p>Số điện thoại: {item.phoneNumber}</p>
            <p>Địa chỉ: {item.address}</p>
            <p>Hình thức thành toán:
              {item.payMethod=="CHUYENKHOAN"?(<span className='text-green-500'> Chuyển khoản</span>):("")}
              {item.payMethod=="TIENMAT"?(<span className='text-green-500'> Tiền mặt</span>):("")}
            </p>
            <p>Trạng thái thanh toán: {item.paymentStatus?(<span className='text-green-500'>Đã thanh toán</span>):<span className='text-red-500'>Chưa thanh toán</span>}</p>
            <p>Trạng thái đơn hàng: 
            {item.orderStatus==="CHOXULY"?(<span className="text-red-500 font-semibold"> Chờ xử lý</span>):("")}
            {item.orderStatus==="CHAPTHUAN"?(<span className="text-green-500  font-semibold"> Đã xác nhận</span>):("")}
            {item.orderStatus==="GIAOHANG"?(<span className="text-yellow-500  font-semibold"> Đang giao hàng</span>):("")}
            {item.orderStatus==="GIAOTHANHCONG"?(<span className="text-yellow-500  font-semibold"> Giao thành công</span>):("")}
            {item.orderStatus==="HOANTAT"?(<span className="text-green-500  font-semibold bg-green-100 px-2 py-0.5 rounded"> 
              <i class="fa-regular fa-square-check me-2"></i>
              Hoàn thành
              </span>):("")}
            {item.orderStatus==="HUY"?(<span className="text-red-600  font-semibold bg-red-100 py-0.5 px-2 rounded">
              <i class="fa-regular fa-circle-xmark me-2"></i>
               Đơn bị hủy
               </span>):("")}
            </p>
            <p>Ngày cập nhật: {String(item.updateAt).substring(0,10)}</p>
        </div>
              )
            }
          }
          )
        }
      
      </div>
      <p className='text-center bg-white font-semibold p-3'>Danh sách các sản phẩm</p>
      <div className="relative overflow-x-auto max-h-full">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-black uppercase bg-yellow-400">
            <tr>
              <th scope="col" className="px-6 py-3">STT</th>
              <th scope="col" className="px-6 py-3">Tên sản phẩm</th>
              <th scope="col" className="px-6 py-3">Hình ảnh</th>
              <th scope="col" className="px-6 py-3">Giá bán</th>
              <th scope="col" className="px-6 py-3">Số lượng mua</th>
              <th scope="col" className="px-6 py-3 text-center">Thành tiền</th>
              <th scope="col" className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
          



{detail?.order?.map((item, _) => {
  if (item.order_id === orderDetail.orderId) {
    const kq=item.orderStatus=="HOANTAT"?true:false;
    
    return item.orderItems?.map((gt, so) => {
      console.log({gt});
      // const orderID=gt.id;
      // console.log(orderID)
      const topping = gt.toppings || [];
      const totalToppingPrice = topping.reduce((sum, topping) => sum + (topping.price || 0), 0);
      const total = (gt.product?.priceSell + totalToppingPrice) * gt.quantity;

      return (
        <tr key={so} className="border-b-2 text-black"> {/* Sử dụng gt.id làm key nếu có, nếu không thì dùng so */}
          <td><p className="text-center w-16">{so + 1}</p></td> {/* Sử dụng so + 1 cho STT trong chi tiết */}
          <td className="px-4">
            {gt.product?.name}
            {topping.map((k, t) => (
              <p className="text-gray-600" key={t}>- {k.name} (+{k.price.toLocaleString()} đ)</p>
            ))}
          </td>
          <td className="px-4">
            <img className="w-30 p-2" src={gt.product?.images?.[0]?.image_url}  />
          </td>
          <td className="px-4">{gt.product?.priceSell?.toLocaleString()} đ</td>
          <td className="px-2 text-center w-36">{gt.quantity}</td>
          <td className="px-2 text-center">{total.toLocaleString()} đ</td>
          <td className="px-2 text-center w-36">
            {kq?(<p onClick={()=>navigate(`/review/product/${gt.product.product_id}`,{
              state:{orderID:gt.id}
            })} className='text-blue-500 underline cursor-pointer'>Đánh giá</p>):(<p></p>)}
          </td>
        </tr>
      );
    });
  }
  return null; // Nếu order_id không khớp, không render gì
})}


          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default DetailOrderUserID 
