import React, { useEffect, useState } from 'react'
import useAuth from '../../../Login_Logout/CustomHook';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import DateFormart from '../Base/DateFormart';

const IndexDanhGia = () => {
    const [comment,setComment]=useState([]);
    const [start,setStart]=useState(4);
    const {getToken}=useAuth();
    //const [idComment,setIdComment]=useState(null);

    //Lấy danh sách comment
    const getComment=async()=>{
    try{
        const res=await axios.get(`http://localhost:8080/api/v1/review/rating/${start}`,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
        })
        console.log(res);
        setComment(res.data);
        }catch(error){
        toast.error("Xay ra loi khi lay du lieu "+error);
        }
    }
    //Thay đổi trạng thái comment
      const updateStatusComment=async(idComment)=>{
        const confirm=window.confirm("Bạn có chắc chăn muốn thay đổi");
        if(!confirm) return ;
    try{
        await axios.put(`http://localhost:8080/api/v1/review/update/${idComment}`,null,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
        })
        toast.success("Cập nhật trạng thái thành công",{autoClose:1000});
        getComment();
    }catch(error){
        toast.error("Xảy ra lỗi khi thay đổi dữ liệu "+error,{autoClose:1000});
        }
    }

    //Xóa 1 comment
     const deleteComment=async(idComment)=>{
        const confirm=window.confirm("Bạn có chắc chăn muốn xóa comment này");
        if(!confirm) return ;
    try{
        await axios.delete(`http://localhost:8080/api/v1/review/delete/${idComment}`,null,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
        })
        toast.success("Xóa thành công",{autoClose:1000});
        getComment();
    }catch(error){
        toast.error("Xảy ra lỗi khi xóa dữ liệu "+error,{autoClose:1000});
        }
    }

    useEffect(()=>{
    getComment();
    },[start])
  return (
    <>
      <div class=" w-[99.3%] relative  shadow-md sm:rounded-lg bg-blue-200 p-2 mt-2 ml-2">
        <ToastContainer/>
 <div className='flex gap-x-4 mb-2'>
    <button
    
    className='border-red-500 border focus:bg-teal-400 px-2 py-1 rounded'>Tất cả</button>
    <button
    onClick={()=>setStart(1)}
    className='border-red-500 border px-2 rounded focus:bg-green-400 font-semibold'>1 <i class="fa-solid fa-star text-yellow-500"></i></button>
    <button
    onClick={()=>setStart(2)}
    className='border-red-500 border px-2 rounded focus:bg-green-400 font-semibold'>2 <i class="fa-solid fa-star text-yellow-500"></i></button>
    <button
    onClick={()=>setStart(3)}
    className='border-red-500 border px-2 rounded focus:bg-green-400 font-semibold'>3 <i class="fa-solid fa-star text-yellow-500"></i></button>
    <button
    onClick={()=>setStart(4)}
    className='border-red-500 border px-2 rounded focus:bg-green-400 font-semibold'>4 <i class="fa-solid fa-star text-yellow-500"></i></button>
    <button
    onClick={()=>setStart(5)}
    className='border-red-500 border px-2 rounded focus:bg-green-400 font-semibold'>5 <i class="fa-solid fa-star text-yellow-500"></i></button>
 </div>
    <table class="w-[100%] text-sm text-left text-gray-500 rounded-lg">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Mã sản phẩm
                </th>
                <th scope="col" class="px-6 py-3">
                   Mã người dùng
                </th>
                 <th scope="col" class="px-6 py-3">
                   Đánh giá
                </th>
                <th scope="col" class="px-6 py-3">
                    Bình luận
                </th>
                <th scope="col" class="px-6 py-3">
                   Ngày bình luận
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
            {
                comment.length>0?(
                comment.map((item,index)=>
            <tr key={index} class="bg-white border-b  border-gray-200 hover:bg-gray-50 text-black">
                <th class="px-6 py-4">
                    {item.id}
                </th>
                <td scope="row" class=" px-8 py-4 ">
                    {item.productId}
                </td>
                <td class="px-6 py-4">
                    {item.userId}
                </td>
                 <td class="px-6 py-4">
                     {[...Array(item.start)].map((_, index) => (
                    <i key={index} className="fa-solid fa-star text-yellow-400"></i>
                     ))}
                </td>
                <td class="px-6 py-4">
                    {item.comment}
                </td>
                <td class="px-6 py-4">
                    {<DateFormart value={item.createdAt}/>}
                </td>
                 <td class="px-6 py-4">
                    {item.status?(<i
                    onClick={()=>updateStatusComment(item.id)}
                    class="fa-solid fa-toggle-on text-green-500 text-xl"></i>):(<i
                    onClick={()=>updateStatusComment(item.id)}
                    class="fa-solid fa-toggle-off text-red-500 text-xl"></i>)}
                </td>
                <td class="px-6 py-4">
                    <p onClick={()=>deleteComment(item.id)} class="font-medium text-blue-600 hover:underline hover:cursor-pointer">Xóa</p>
                </td>
            </tr>
                    
                    
                    )
          
                ):(<p className='font-bold text-black'>Chua co danh gia nao</p>)
            }
           
      
            
        </tbody>
    </table>
    {comment.length>0&&(
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




    )}
   


    </div>
    </>
  )
}

export default IndexDanhGia
