import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';
const IndexUser = () => {
    const {getToken}=useAuth();
    const [users,setUsers]=useState([]);
    const [status,setStatus]=useState(false);
    const getAllUser=async()=>{
        const res=await axios.get(`http://localhost:8080/api/v1/user/role/2`,{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        });
        console.log(res);
        setUsers(res.data.filter((item)=>item.status==status));
    }
    useEffect(()=>{
        getAllUser()
    },[status])

    //Update status
    const updateStatus=async(id)=>{
        const confirm=window.confirm("Bạn có chắc chắn muốn cập nhật ");
        if(!confirm) return ;
        try{
        await axios.put(`http://localhost:8080/api/v1/user/update-status/${id}`,null,{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        })
        toast.success("Cập nhật trạng thái người dùng thành công",{autoClose:1000});
        getAllUser();
    }catch(error){
        toast.error("Có lỗi xảy ra khi cập nhật "+error,{autoClose:1000});
    }
    }
  return (
    <div>
     <div class=" w-[99.3%] relative  shadow-md sm:rounded-lg bg-blue-200 p-2 mt-2 ml-2">
        <ToastContainer/>
  {/* <input type="text" className='border border-red-500 w-[27%] rounded-lg p-1 mb-2' placeholder='Search product ... ' /> */}
    
    <div className='mb-2'>
        <button
        onClick={()=>setStatus(true)}
        className='cursor-pointer bg-green-500 text-white px-2 py-1 rounded me-2'>Hoạt động</button>
        <button
         onClick={()=>setStatus(false)}
         className='cursor-pointer bg-red-500 text-white px-2 py-1 rounded'>Đang tắt</button>
    </div>
    
    
    <table class="w-[100%] text-sm text-left text-gray-500 rounded-lg">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                <th scope="col" class="px-6 py-3">
                    User id
                </th>
                <th scope="col" class="px-6 py-3">
                    Họ và tên
                </th>
                <th scope="col" class="px-6 py-3">
                    Tài khoản
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Số điện thoại
                </th>
                 <th scope="col" class="px-6 py-3">
                    Ngày tạo
                </th>
                <th scope="col" class="px-6 py-3">
                   Tình trạng tài khoản
                </th>
                 <th scope="col" class="px-6 py-3">
                    Trạng thái
                </th>
                 
            </tr>
        </thead>
        <tbody>
            {users.length>0?(
                users.map((item,index)=>(
            <tr key={index} class="bg-white border-b border-gray-200 hover:bg-gray-50 ">
               
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                   {item.userId}
                </th>
                <td class="px-6 py-4">
                   {item.fullName}
                </td>
                <td class="px-6 py-4">
                   {item.username}
                </td>
                <td class="px-6 py-4">
                   {item.email}
                </td>
                 <td class="px-6 py-4">
                   {item.phone}
                </td>
                <td class="px-6 py-4">
                   {item.createdAt}
                </td>
                <td class="px-6 py-4">
                   {item.verified?(<p className='font-semibold text-green-500'>Đã xác thực</p>):(<p className='font-semibold text-green-500'>Chưa xác thực</p>)}
                </td>
                <td class="px-6 py-4">
                   {item.status?(<i
                    onClick={()=>updateStatus(item.userId)}
                    class="fa-solid fa-toggle-on text-green-500 text-xl"></i>):(<i
                    onClick={()=>updateStatus(item.userId)}
                    class="fa-solid fa-toggle-off text-red-500 text-xl"></i>)}
                </td>
                {/* <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td> */}
            </tr>
                ))
         
            ):(<p className='text-lg text-black'>Không tìm thấy người dùng nào</p>)}
          
         
        </tbody>
    </table>
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      
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


    </div>
    </div>
  )
}

export default IndexUser
