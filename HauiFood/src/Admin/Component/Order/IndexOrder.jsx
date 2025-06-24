import axios from 'axios';
import { useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import DateFormart from '../Base/DateFormart';
import { useNavigate } from 'react-router';
import useAuth from '../../../Login_Logout/CustomHook';

const IndexOrder = () => {
    const navigate=useNavigate();
    const [orders,setOrders]=useState([]);
    const [detail,setDetail]=useState({
        show:false,
        code:null
    })
    const [status,setStatus]=useState("");
   const {getToken}=useAuth();
    console.log(detail);
    const getOrders=async()=>{
        try{
            let api="http://localhost:8080/api/v1/order/all";
            if(status!=""){
                api+=`/${status}`;
            }
            const res=await axios.get(api,{            
                headers: {
                     Authorization: `Bearer ${getToken()}`
                        }
            });
            setOrders(res.data);
        }catch(error){
            toast.error("Có lỗi xảy ra"+error);
        }
    }
    useEffect(()=>{
        getOrders();
    },[status])
    console.log(orders)
    const [search,setSearch]=useState("");
    const filteredOrders = orders.filter((order) =>
        order.orderCode.toLowerCase().includes(search.toLowerCase())
      );
    const data = Array.from({ length: orders.length }, (_, i) => i + 1); 
    const itemsPerPage = 6;// So item muon hien thi
  
    const [currentPage, setCurrentPage] = useState(1);
  
    // Tính index bắt đầu và kết thúc
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let currentData=null;
    if(search!=""){
         currentData =orders.length>0? filteredOrders.slice(startIndex, endIndex):[];
    }else{
        currentData=orders.length>0? orders.slice(startIndex, endIndex):[];
    }
    
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    };
   
//    console.log(filteredOrders)
   
//     console.log("Search: "+search);
const updateStatus=async(id,trangthai)=>{
    try{
        const res=await axios.put(`http://localhost:8080/api/v1/order/update/${id}?status=${trangthai}`);
        toast.success("Cập nhật trạng thái đơn hàng thành công",{autoClose:1000});
        getOrders();
        console.log(res.data);
    }catch(error){
        toast.error("Có lỗi khi cập nhật dữ liệu");
        console.log("Có lỗi khi lấy dữ liệu");
    }
}
    const handleStatus=(id,trangthai)=>{

        switch(trangthai){
            case "HUY":
                const confirm1=window.confirm("Xác nhận hủy đơn hàng này");
                if(confirm1){
                    console.log({id,trangthai})
                    updateStatus(id,trangthai);
                    return;
                }
                break;
            case "CHAPTHUAN":
                const confirm2=window.confirm("Xác nhận đơn hàng này");
                if(confirm2){
                    console.log({id,trangthai})
                    updateStatus(id,trangthai);
                    return;
                }
                break;
            case "GIAOHANG":
                const confirm3=window.confirm("Xác nhận giao đơn hàng này");
                if(confirm3){
                    console.log({id,trangthai})
                    updateStatus(id,trangthai);
                    return;
                }
                break;
            case "GIAOTHANHCONG":
                const confirm4=window.confirm("Đơn hàng đã được giao đến khách hàng!!");
                if(confirm4){
                    console.log({id,trangthai})
                    updateStatus(id,trangthai);
                    return;
                }
                break;
             case "HOANTAT":
                const confirm5=window.confirm("Hoàn thành đơn hàng này??");
                if(confirm5){
                    console.log({id,trangthai})
                    updateStatus(id,trangthai);
                    return;
                }
                break;       


        }
        //const Confirm=window.confirm("Xác nhận đơn hàng");
        // if(trangthai=="HUY"){
        // const confirm2=window.confirm("Xác nhận hủy đơn hàng này");
        // if(confirm2){
        //     console.log({id,trangthai})
        //     updateStatus(id,trangthai);
        //     return;
        // }
        // }
        // const confirm2=window.confirm("Xác nhận hủy đơn hàng này");
        // if(Confirm){
        //     console.log({id,trangthai})
        //     updateStatus(id,trangthai);
        //     return;
        // }
       console.log("Khong xac nhan don hang");
    }
  return (
    <div >
      
    <div class=" w-[99.3%] relative h-[670px]  shadow-md sm:rounded-lg  p-2 mt-2 ml-2">
        <ToastContainer/>
  <div className='flex justify-between'>
  <input type="text" className='border border-blue-500 w-[27%] rounded p-1 py-2 mb-2' onChange={(e)=>setSearch(e.target.value)}  placeholder='Tìm kiếm theo mã đơn hàng ... ' />
  <div className='me-14 mt-2 ' >
    <button onClick={handlePrev} disabled={currentPage === 1}><i class={`${ currentPage === 1?'text-gray-300':"text-blue-500"} fa-solid fa-circle-chevron-left text-2xl me-3`}></i></button>
    <button onClick={handleNext} disabled={currentPage === totalPages}><i class={`${(currentPage === totalPages||orders.length==0)?'text-gray-300':"text-blue-500"} text-black fa-solid fa-circle-chevron-right text-2xl`}></i></button>
  </div>
  </div>
<div className='flex gap-x-2 mb-2'>
    <button title='Tất cả' onClick={()=>setStatus("")} className='bg-teal-100 text-black px-4 py-1 rounded font-semibold cursor-pointer'>Tất cả</button>
    <button title='Xác nhận' onClick={()=>setStatus("CHOXULY")} className='bg-red-100 text-red-500 px-4 py-1 rounded font-semibold cursor-pointer'>Xác nhận</button>
    <button title='Giao hàng' onClick={()=>setStatus("GIAOHANG")}  className='bg-blue-100 text-blue-500 px-4 py-1 rounded font-semibold cursor-pointer'>Đang giao hàng</button>
    <button title='Giao thành công' onClick={()=>setStatus("GIAOTHANHCONG")} className='bg-yellow-50 text-yellow-500 px-4 py-1 rounded font-semibold cursor-pointer'>Giao thành công</button>
    <button title='Hoàn thành' onClick={()=>setStatus("HOANTAT")} className='bg-green-100 text-green-500 px-4 py-1 rounded font-semibold cursor-pointer'>Hoàn thành</button>
     <button title='Hủy' onClick={()=>setStatus("HUY")} className='bg-pink-100 text-red-500 px-4 py-1 rounded font-semibold cursor-pointer'>Hủy</button>
</div>

    <table class="w-[100%] text-sm text-left text-black rounded  bg-white mb-10 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Mã đơn
                </th>
                <th scope="col" class="px-6 py-3">
                   Tổng tiền
                </th>
                <th scope="col" class="px-6 py-3 relative  group">
                    Trạng thái
            
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Hình thức thanh toán
                </th>
                <th scope="col" class="px-6 py-3">
                    Trạng thái thanh toán
                </th>
                <th scope="col" class="px-6 py-3">
                   Thời gian
                </th>
                <th scope="col" class="px-6 py-3">
                   Chi tiết
                </th>
                <th scope="col" class="px-6 py-3">
                    Hành động
                </th>
            </tr>
        </thead>
        <tbody>
            {
                orders.length>0&&(
                    currentData.map((item,index)=>(
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 min-h-[100px]">
                        <td class="px-6 py-4">
                           {item.order_id}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.orderCode}
                        </td>
                        <td class="px-6 py-4">
                          {item.totalAmount.toLocaleString()} đ
                        </td>
                        <td class="px-6 py-4  w-[10%]">
                         {item.orderStatus=="CHOXULY"?(<p className='bg-red-200 text-red-600 rounded p-1 text-center'>Chờ xử lý</p>):""}
                         {item.orderStatus=="CHAPTHUAN"?(<p className='bg-teal-200 text-teal-600 rounded p-1 text-center'>Xác nhận</p>):""}
                         {item.orderStatus=="GIAOHANG"?(<p className='bg-pink-200 text-pink-600 rounded p-1 text-center'>Chờ giao </p>):""}
                         {item.orderStatus=="GIAOTHANHCONG"?(<p className='bg-blue-200 text-blue-600 rounded p-1 text-center'>Đã giao </p>):""}
                         {item.orderStatus=="HOANTAT"?(<p className='bg-green-200 text-green-600 rounded p-1 text-center'>Hoàn thành</p>):""}
                        </td>
                        <td class="px-6 py-4 font-medium">
                          {item.payMethod=="CHUYENKHOAN"?"Chuyển khoản":""}
                          {item.payMethod=="TIENMAT"?"Tiền mặt":""}
                        </td>
                        <td class="px-6 py-4">
                          {item.paymentStatus?(<p className='text-green-500'>Đã thanh toán</p>):(<p className='text-red-500'>Chưa thanh toán</p>)}
                        </td>
                        <td class="px-4 py-4">
                         {<DateFormart value={item.orderDate}/>}
                        </td>
                        <td
                        className="px-6 py-4 cursor-pointer text-blue-600 "
                        onClick={() => {
                            const isSame = detail.code === item.orderCode;
                            setDetail({
                            show: !detail.show || !isSame,
                            code: (!detail.show || !isSame) ? item.orderCode : null
                              });
              
                            if (!detail.show || !isSame) {
                            navigate(`order-detail/${item.orderCode}`);
                            }
                         
                            }}
                            >
                            Chi tiết
                            </td>
                        <td class="px-2 py-4">
                           {
                           item.orderStatus=="CHOXULY"&&(
                            <>
                            
                           <button onClick={()=>handleStatus(item.order_id, "CHAPTHUAN")} title='Xác nhận' className='cursor-pointer text-green-700 bg-green-200 p-1 rounded mr-2 mb-1 min-w-12'>
                            <i class="fa-solid fa-check"></i>
                           </button>
                           
                            <button onClick={()=>handleStatus(item.order_id, "HUY")} className='text-red-700 bg-red-200 p-1 rounded min-w-10 cursor-pointer' title='Hủy đơn hàng'>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                            </>
                           )
                           
                           }
                           {
                           item.orderStatus=="CHAPTHUAN"&&
                           <button onClick={()=>handleStatus(item.order_id, "GIAOHANG")} className='text-teal-700 bg-teal-200 p-1 rounded mr-2 mb-1 min-w-28'>
                            🛻 Giao hàng
                            </button>
                           }
                           {
                           item.orderStatus=="GIAOHANG"&&<button
                           onClick={()=>handleStatus(item.order_id, "GIAOTHANHCONG")}
                            className='text-pink-700 bg-pink-200 p-1 rounded mr-2 mb-1 min-w-28'>Giao thành công</button>
                           }
                           {
                           item.orderStatus=="GIAOTHANHCONG"&&<button
                           onClick={()=>handleStatus(item.order_id, "HOANTAT")}
                           className='text-blue-700 bg-blue-200 p-1 rounded mr-2 mb-1 min-w-28'>Hoàn thành</button>
                           }
                            {
                           item.orderStatus=="HOANTAT"&&("")
                            }
                           
                        </td>
                       
                    </tr>
                    ))
                )
            }
            {
                (filteredOrders.length==0||orders.length==0)&&( <tr >
                    <td colSpan={9} className='text-center font-bold text-red-500'>
                    <p>Không tìm thấy sản phẩm nào</p>
                    </td>
                </tr>)
            }
           
           
        
        </tbody>
    </table>
    
    </div>

    </div>
  )
}

export default IndexOrder
