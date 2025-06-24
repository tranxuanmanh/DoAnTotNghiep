import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router';
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';


const NavLeft = ({isSidebarOpen}) => {
      const [openOrder, setOpenOrder] = useState(false);
      const [openProduct, setOpenProduct] = useState(false);
      const [openCategory, setOpenCategory] = useState(false);
      const [openSale, setOpenSale] = useState(false);
      const [openUser,setOpenUser]=useState(false);
      const [openNhanVien,setOpenNhanVien]=useState(false);
      const [thongke,setThongke]=useState(false);
      const [openTopping,setOpenTopping]=useState(false);
      const [openTinTuc,setOpenTinTuc]=useState(false);

      const [openReview,setOpenReview]=useState(false);

      const [orders, setOrders] = useState([]);

      const {getToken}=useAuth();
      // const getOrders = async () => {
      //   try {
      //     let api = "http://localhost:8080/api/v1/order/all/CHOXULY";
      //     const res = await axios.get(api,{
      //       headers:{
      //         Authorization:`Bearer ${getToken()}`
      //       }
      //     });
      //     setOrders(res.data);
      //   } catch (error) {
      //     toast.error("Có lỗi xảy ra: " + error);
      //   }
      // };
    
      // useEffect(() => {
      //   getOrders();
      // }, []);
       const user = JSON.parse(localStorage.getItem("user"));
       const isAdmin=Number(user.role) === 1?true:false;
     
      
  return (
   
      <div className={`fixed overflow-y-scroll h-[100%] bg-green-300 shadow-md transition-transform duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
       <ToastContainer/>
        <div className={`p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
         
          <Link to="home">
          <img className='w-26 h-26 rounded-full mx-auto' src="../public/iconDoAn.png" alt="" />
          <h1 className="text-xl text-center mt-1 font-bold text-red-500 uppercase">
           Haui Food
          </h1>
          </Link>
         
        </div>
        <nav className={`mt-6 ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <p className='ml-2 mb-1 text-sm text-gray-500'>MENU</p>
          <ul className='flex flex-col gap-y-3'>
            <li className="cursor-pointer  px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
                <i className="fa-solid fa-house"></i>
              </span>
              <Link to="home">Trang chủ</Link>
              
            </li>

            {/* Quản lý đơn hàng */}
            <li onClick={() => setOpenOrder(!openOrder)} className=" cursor-pointer px-4 py-2 text-gray-700 hover:bg-blue-100 focus:bg-blue-100  hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
                <i class="fa-solid fa-dumpster-fire"></i>
              </span>
              <Link to="order-manager">Quản lý đơn hàng</Link>
              {/* <span className='ml-9'>
            {openOrder?<i class="fa-solid fa-chevron-down"></i>:<i class="fa-solid fa-chevron-up"></i>}  
              </span> */}
            </li>
            {/* {openOrder && (
                <ul className="ml-5 mt-[-10px] rounded w-[85%]">
                  <li className="relative   px-4 py-2 text-gray-700 hover:bg-green-200 border-b-1 hover:text-green-600 border-gray-200 hover:rounded">
                    <Link to="./order-manager/new-order"> 
                    🍿 Đơn hàng mới 
                   {orders.length>0?(<p className='absolute animate-bounce top-[-5px] right-5 text-red-500 bg-red-200 rounded-full p-1.5 '>+{orders.length}</p>):(<p className='absolute  top-[-5px] right-5 text-green-500 bg-green-200 rounded-full p-1 '>0</p>)} 
                    </Link>
                  </li>
                 
                </ul>
              )} */}
              {/* Quản lý sản phẩm */}
            <li onClick={()=>setOpenProduct(!openProduct)} className=" cursor-pointer px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
                <i className="fa-regular fa-money-bill-1"></i>
              </span>
              <Link to="product-manager">Quản lý sản phẩm</Link>
              {/* <span className='ml-8'>
            {openProduct?<i class="fa-solid fa-chevron-down"></i>:<i class="fa-solid fa-chevron-up"></i>}  
              </span> */}
            </li>
            {/* {openProduct && (
                <ul className="ml-5 mt-[-10px] rounded w-[85%]">
                  <li className="px-4 py-2 text-gray-700 hover:bg-green-200 border-b-1 hover:text-green-600 border-gray-200 hover:rounded">
                    <Link to="product-manager/add-product"> 🍿Thống kê sản phẩm</Link>
                  </li>
                 
                </ul>
              )} */}
              {/* Quản lý danh mục */}
            <li onClick={()=>setOpenCategory(!openCategory)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
               <i class="fa-solid fa-list"></i>
              </span>
              <Link to="category-manager">Quản lý danh mục</Link>
              
             
            </li>
           {/* Quản lý khuyến mãi */}
            <li onClick={()=>setOpenSale(!openSale)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
                <i class="fa-solid fa-money-check-dollar"></i>
              </span>
              <Link to="sale-manager">Quản lý khuyến mãi</Link>
             
            </li>
          

          {/* Quan ly topping */}
           <li onClick={()=>setOpenTopping(!openTopping)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
                <i class="fa-solid fa-notes-medical"></i>
              </span>
              <Link to="topping-manager">Quản lý topping</Link>
              
            </li>
           

              {/* Quan ly tin tuc */}
            <li onClick={()=>setOpenTinTuc(!openTinTuc)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
              <i class="fa-solid fa-calendar"></i>
              </span>
              <Link to="tintuc-manager">Quản lý tin tức</Link>
             
            </li>


            {/* Quản lý khách hàng */}
            {isAdmin&&
             <li onClick={()=>setOpenUser(!openUser)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
           <i class="fa-solid fa-users"></i>
              </span>
              <Link to="user-manager">Quản lý khách hàng</Link>
            
            </li>
            }
           
            {
            isAdmin&&
            <li onClick={()=>setOpenNhanVien(!openNhanVien)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
               <i class="fa-regular fa-circle-user"></i>
              </span>
              <Link to="nhanvien-manager">Quản lý nhân viên</Link>
               </li>
            }
               

              {isAdmin&&
              <li onClick={()=>setOpenReview(!openReview)} className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
                <i class="fa-regular fa-star"></i>
              </span>
              <Link to="review-manager">Quản lý đánh giá</Link>
              </li>
            }
            

      <li onClick={() => setThongke(!thongke)} className=" cursor-pointer px-4 py-2 text-gray-700 hover:bg-blue-100 focus:bg-blue-100  hover:text-blue-600 hover:shadow hover:shadow-blue-300   hover:rounded-lg  border-gray-300">
              <span className='mr-2'>
               <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </span>
              <Link to="/logout">Đăng xuất</Link>
              {/* <span className='ml-9'>
            {thongke?<i class="fa-solid fa-chevron-down"></i>:<i class="fa-solid fa-chevron-up"></i>}  
              </span> */}
            </li>
           
          </ul>
        </nav>
        
      </div>
    
  )
}

export default NavLeft
