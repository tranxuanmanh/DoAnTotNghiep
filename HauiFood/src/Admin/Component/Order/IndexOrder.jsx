import axios from 'axios';
import { useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
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
        toast.success("Xac nhan don hang thanh cong");
        getOrders();
        console.log(res.data);
    }catch(error){
        console.log("Co loi khi lay du lieu")
    }
}
    const handleStatus=(id,trangthai)=>{
        const Confirm=window.confirm("Xac nhan don hang");
        if(Confirm){
            console.log({id,trangthai})
            updateStatus(id,trangthai);
           
            return;
        }
       console.log("Khong xac nhan don hang");
    }
  return (
    <div >
      
    <div class=" w-[99.3%] relative h-[670px]  shadow-md sm:rounded-lg  p-2 mt-2 ml-2">
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
                    {/* <div className='z-99
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out
                      lg:top-[30px]  xl:top-[40px] rounded left-[5px] absolute w-full lg:w-[200px] group-hover:block'>
                       <ul className='flex flex-col  py-3 bg-blue-200 text-blue-600 rounded'>
                       <li onClick={()=>setStatus("")} className='border-b cursor-pointer p-2 hover:bg-amber-400'>Tất cả</li>
                        <li onClick={()=>setStatus("CHOXULY")} className='border-b cursor-pointer p-2 hover:bg-amber-400'>Chờ xử lý</li>
                        <li onClick={()=>setStatus("CHAPTHUAN")} className='border-b cursor-pointer p-2 hover:bg-amber-400'>Xác nhận</li>
                        <li onClick={()=>setStatus("GIAOHANG")}  className='border-b cursor-pointer p-2 hover:bg-amber-400'>Đang giao</li>
                        <li onClick={()=>setStatus("GIAOTHANHCONG")} className='border-b cursor-pointer p-2 hover:bg-amber-400'>Giao thành công</li>
                        <li onClick={()=>setStatus("HOANTAT")} className=' cursor-pointer p-2 hover:bg-amber-400'>Hoàn tất</li>
                        <li onClick={()=>setStatus("HUY")} className=' cursor-pointer p-2 hover:bg-amber-400'>Huy</li>
                       </ul>
                    </div> */}
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
                           item.orderStatus=="CHOXULY"&&
                           <button onClick={()=>handleStatus(item.order_id, "CHAPTHUAN")} title='Xac nhan' className='text-green-700 bg-green-200 p-1 rounded mr-2 mb-1 min-w-12'>
                            <i class="fa-solid fa-check"></i>
                           </button>
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
                           item.orderStatus=="HOANTAT"&&<button className=' p-1 rounded mr-2 mb-1 min-w-28 cursor-not-allowed'></button>
                            }
                            <button className='text-red-700 bg-red-200 p-1 rounded min-w-10 cursor-not-allowed'>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
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



{/* Thong ke */}
    {/* <div class=" w-[99.3%] relative  shadow-md sm:rounded-lg bg-blue-200 p-2 mt-2 ml-2">
  <input type="text" className='border border-red-500 w-[27%] rounded-lg p-1 mb-2' placeholder='Search product ... ' />
    <table class="w-[100%] text-sm text-left text-gray-500 rounded-lg">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Watches
                </td>
                <td class="px-6 py-4">
                    $199
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple iMac
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    PC
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple AirPods
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $399
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    iPad Pro
                </th>
                <td class="px-6 py-4">
                    Gold
                </td>
                <td class="px-6 py-4">
                    Tablet
                </td>
                <td class="px-6 py-4">
                    $699
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
        </tbody>
    </table>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
            </li>
            <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>


    </div> */}
    </div>
  )
}

export default IndexOrder
