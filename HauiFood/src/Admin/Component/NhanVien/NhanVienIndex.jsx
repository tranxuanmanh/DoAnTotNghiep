import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';
import DateFormart from '../Base/DateFormart';
import AddNhanVien from './AddNhanVien';

const NhanVienIndex = () => {


    const [nhanvien,setNhanVien]=useState();
    const [openAdd,setOpenAdd]=useState(false);
    const {getToken}=useAuth();

    const getAllNhanVien=async()=>{
    try{
        const res=await axios.get("http://localhost:8080/api/v1/user/role/3",
            {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        
        })
        
        console.log(res.data);
        setNhanVien(res.data);
        }catch(error){
            toast.error("Có lỗi trong quá trình lấy dữ liệu");
        }
    }
    //Gọi
    useEffect(()=>{
    getAllNhanVien();
    
    },[])
    //update Status

    const updateStatus=async(id)=>{
        const confirm=window.confirm("Bạn muốn thay đổi trạng thái của nhân viên này");
        if(!confirm){
            return;
        }
        try{
        const res=await axios.put(`http://localhost:8080/api/v1/user/update-status/${id}`,null,{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        });
        console.log(res);
        toast.success("Cập nhật thành công",{autoClose:1000})
        getAllNhanVien()
        }catch(error){
            toast.error("Có lỗi khi cập nhật"+error,{autoClose:1000})
        }
    }


  return (
    <>
    {openAdd&&(<AddNhanVien setOpenAdd={setOpenAdd}/>)}
    <div className='m-5'>
        <button onClick={()=>setOpenAdd(true)} className='bg-green-400 font-semibold py-2 px-2 rounded'>+ Thêm nhân viên mới</button>
    </div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[99%] mx-2 mt-5">
    
        <ToastContainer/>
    <p className='text-center font-semibold mb-2'>Danh sách nhân viên</p>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-4 py-3">
                    Stt
                </th>
                <th scope="col" class="px-6 py-3">
                    Họ tên
                </th>
                <th scope="col" class="px-6 py-3">
                    Tài khoản
                </th>
                <th scope="col" class="px-6 py-3">
                    Số điện thoại
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                 <th scope="col" class="px-6 py-3">
                    Ngày tạo
                </th>
                 <th scope="col" class="px-6 py-3">
                    Trạng thái
                </th>
                <th scope="col" class="px-6 py-3">
                    Hành động
                </th>
            </tr>
        </thead>
        <tbody>
            {nhanvien&&(
                nhanvien.map((item,index)=>(
 <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th key={index} scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.userId}
                </th>
                <td class="px-1 py-4">
                    {item.fullName}
                </td>
                <td class="px-6 py-4">
                   {item.username}
                </td>
                <td class="px-6 py-4">
                   {item.phone}
                </td>
                <td class="px-6 py-4">
                  {item.email}
                </td>
                 <td class="px-6 py-4">
                   {<DateFormart value={item.createdAt}/>}
                </td>
                 <td class="px-6 py-4">
                    {item.status?<i 
                title='Hoạt động'
                onClick={()=>updateStatus(item.userId)}
                class="text-2xl w-full fa-solid fa-toggle-on text-green-500"></i>:
                <i   
                title='Đang tắt'
                onClick={()=>updateStatus(item.userId)} class="text-2xl w-full  fa-solid fa-toggle-off text-red-500"></i>}
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Xóa tài khoản</a>
                </td>
            </tr>
                ))
            )}
           
           
            
        </tbody>
    </table>
</div>

    </>
  )
}

export default NhanVienIndex
