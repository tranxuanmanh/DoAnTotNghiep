import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import DateFormart from '../Base/DateFormart';

const IndexTinTuc = () => {
    const [tintuc,setTinTuc]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // số item mỗi trang
    const getAllTinTuc=async()=>{
        try{
        const res=await axios.get("http://localhost:8080/api/v1/news/all");
        const ketqua=res.data.data;
        console.log(ketqua);
        setTinTuc(ketqua);
       
        }catch(error){
            toast.error("Có lỗi khi lấy dữ liệu",{autoClose:1000});
        }
    }
    useEffect(()=>{
        getAllTinTuc()
    },[])
    console.log(tintuc)

    //Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tintuc.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tintuc.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //Update status tin tuc
    const updateStatus=async(id)=>{
        const xacnhan=window.confirm("Bạn có muốn thay đổi trạng thái");
        if(!xacnhan){
            return;
        }
        try{
        await axios.put(`http://localhost:8080/api/v1/news/update-status/${id}`)
        toast.success("Cập nhật trạng thái thành công",{autoClose:1000});
        getAllTinTuc();
        }catch(error){
        toast.error("Có lỗi khi cập nhật");
        }
    }

    //Xoa tin tuc
    const handleDelete=async(id)=>{
        const xacnhan=window.confirm("Bạn có chắc chăn muốn xóa tin tức này không");
        if(!xacnhan){
            return;
        }
        try{
        await axios.delete(`http://localhost:8080/api/v1/news/${id}`)
        toast.success("Xóa tin tức thành công",{autoClose:1000});
        getAllTinTuc();
        }catch(error){
        toast.error("Có lỗi khi xóa");
        }
    }
 





  return (
    <>
     <div class=" w-[99.3%] relative  shadow-md sm:rounded-lg p-2 mt-2 ml-2">
        <ToastContainer/>
        <div className='mb-3 mt-2'>
        <Link to="tintuc-add" className='bg-green-400 px-2 py-2 mb- rounded font-semibold'>Thêm mới tin tức</Link>
        </div>
 
    <table class="w-[100%] text-sm text-left text-black rounded-lg">
        <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Tiêu đề
                </th>
                <th scope="col" class="px-6 py-3">
                    Hình ảnh
                </th>
                <th scope="col" class="px-6 py-3">
                    Ngày tạo
                </th>
                <th scope="col" class="px-6 py-3">
                    Ngày cập nhật
                </th>
                  <th scope="col" class="px-6 py-3">
                    Tác giả
                </th>
                <th scope="col" class="px-2 py-3">
                   Trạng thái
                </th>
                <th scope="col" class="px-3 py-3">
                   Chi tiết
                </th>
                <th scope="col" class="px-2 py-3 ">
                   Hành động
                </th>
            </tr>
        </thead>
        <tbody>
            {tintuc.length>0?(
               currentItems.map((item,index)=>
                {
                    
                 return (
                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
               
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                </th>
                <td class="px-6 py-4">
                    {item.title}
                </td>
                <td class="px-6 py-4">
                    <img className='w-20 h-20' src={`http://localhost:8080${item.thumbnail}`} alt="" />
                </td>
                <td class="px-5 py-4">
                   {<DateFormart value={item.createdAt}/>}
                </td>
                 <td class="px-5 py-4">
                    {<DateFormart value={item.updatedAt}/>}
                    
                </td>
                <td class="px-7 py-4">
                    {item.userName}
                </td>
                <td class="px-6 py-4">
               
                {item.status?<i 
                title='Hoạt động'
                onClick={()=>updateStatus(item.id)}
                class="text-2xl w-full fa-solid fa-toggle-on text-green-500"></i>:
                <i   
                title='Đang tắt'
                onClick={()=>updateStatus(item.id)} class="text-2xl w-full  fa-solid fa-toggle-off text-red-500"></i>}
                
                
                </td>
                <td class="px-6 py-4">
                   <Link title='Chi tiết' to={`chi-tiet-tin-tuc/${item.id}`} className='text-xl text-blue-400'> 
                   <i class="fa-solid fa-eye"></i>
                   </Link>
                </td>
                <td class="px-6 py-4">
                    <i onClick={()=>handleDelete(item.id)} class="fa-solid fa-trash-can text-red-500 text-xl me-2"></i>
                    <Link to={`cap-nhat-tin-tuc/${item.id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <i class="text-xl fa-solid fa-pen-to-square"></i>
                    </Link>
                </td>
                    </tr>
                    )
                }
                    
                )
            ):(<tr><td colSpan={4}>"Danh sách rỗng"</td></tr>)}
           
            
            
        </tbody>
    </table>
    <nav class="flex items-center flex-column flex-wrap  pt-4" >
       <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 border mx-1 rounded"
  >
    Prev
  </button>

  {[...Array(totalPages).keys()].map((num) => (
    <button
      key={num}
      onClick={() => paginate(num + 1)}
      className={`px-3 py-1 border mx-1 rounded ${currentPage === num + 1 ? 'bg-blue-500 text-white' : ''}`}
    >
      {num + 1}
    </button>
  ))}

  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 border mx-1 rounded"
  >
    Next
  </button>
      
    </nav>


    </div>
    
    </>
  )
}

export default IndexTinTuc
