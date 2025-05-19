import axios from 'axios';
import { header } from 'framer-motion/client';
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router';
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';

const IndexCategory = () => {
    const [category,setCategory]=useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // hoặc 'desc'
    const getAllCategory=async()=>{
        try{
        const responseData=await axios.get("http://localhost:8080/api/v1/category/gets");
        setCategory(responseData.data.data);
        }catch(error){
            console.log('Get all category failed',error);
        }
    }
    useEffect(()=>{
        getAllCategory();
    },[])
    const handleSortByStatus = () =>{

    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...category].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.status === b.status ? 0 : a.status ? -1 : 1;
      } else {
        return a.status === b.status ? 0 : a.status ? 1 : -1;
      }
    });
    setSortOrder(newOrder);
    setCategory(sorted);
  };
   // console.log(category)
   //Ko nên xóa danh mục
   const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/${id}`);
      alert("Xóa danh mục thành công!");
      // Sau khi xóa thành công, gọi lại danh sách
      getAllCategory();
    } catch (error) {
      console.log("Xóa danh mục thất bại", error);
    }
  };

  const {getToken}=useAuth();
  const updateStatus = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái danh mục này?");
    if (!isConfirmed) return;
  
    try {
      await axios.put(`http://localhost:8080/api/v1/category/status/${id}`,null,{
        headers:{
           Authorization:`Bearer ${getToken()}`
        }
      });
      alert("Thay đổi trạng thái danh mục thành công");
      // Sau khi xóa thành công, gọi lại danh sách
      getAllCategory();
    } catch (error) {
      toast.error("Thay đổi trạng thái danh mục thất bại!!Vui lòng kiểm tra lại",{autoClose:2000});
    }
  };

//Phân trang
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10); // Số item mỗi trang

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(category.length / itemsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(prev => prev - 1);
};

  return (
    <div>
    <div class=" w-[99.3%] h-full relative  shadow-md sm:rounded-lg p-2 mt-2 ml-2">
    <ToastContainer/>

  <div className='flex justify-between items-center px-3 mb-2'>
  
  <Link className='bg-yellow-500 rounded p-2 text-white font-semibold' to="add-category">+ Thêm danh mục</Link>
        <div className='text-2xl'>
            <button   onClick={handlePrevPage} disabled={currentPage === 1} className={` hover:cursor-pointer`}><i class={`fa-solid fa-circle-left me-4  ${currentPage==1?"text-gray":"text-red-500"}`}></i></button>
           
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='hover:cursor-pointer'><i class={`fa-solid fa-circle-right  ${currentPage === totalPages?"text-gray":"text-red-500"}`}></i></button>
        </div>
  </div>
    <table class="w-[100%] text-sm text-left text-black rounded-lg bg-white">
        <thead class="text-xs text-black uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Stt
                </th>
                <th scope="col" class="px-6 py-3">
                    Hình ảnh
                </th>
                <th scope="col" class="px-6 py-3">
                    Tên danh mục
                </th>
                <th scope="col" class="px-6 py-3">
                  Mô tả ngắn
                </th>
                
                <th scope="col" class="px-6 py-3 cursor-pointer" onClick={handleSortByStatus}>
                    Trạng thái
                    <i className={`ml-2 fa-solid ${sortOrder === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                </th>
                <th scope="col" class="px-6 py-3">
                   Hành động
                </th>
            </tr>
        </thead>
        <tbody>
            {
            category&&
            currentItems.map((item,index)=>(
              
                <tr key={index} class={` ${item.status?"bg-white hover:bg-gray-50 ":"bg-red-200 "} border-b  border-gray-200 `}>
                <td class="px-6 py-4">
                   {++index}
                </td>
                <td class="px-6 py-4">
                    {
                        console.log(item.images?.startsWith('https') ? item.images : `http://localhost:8080/${item.images}`)
                    }
                  <img src={item.images?.startsWith('https') ? item.images : `http://localhost:8080${item.images}`} className='w-30 h-20 object-cover rounded' alt="hinhanh" />
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {item.name}
                </th>
                <td class="px-6 py-4">
                   {item.description}
                </td>
               
                <td class="px-6 py-1">
                <p
                        className={` text-white w-[70%] text-center rounded py-1 shadow  ${
                          item.status
                            ? "shadow-green-400 bg-green-500"
                            : "bg-red-500 shadow-red-500"
                        }  `}
                      >
                        {item.status ? "Đang hoạt động" : "Đang tắt"}
                      </p>
                </td>
                <td class="px-6 py-4">
                    {item.status?(
                         <div className='flex gap-x-4'>
                              <button
                              title="Khóa"
                                onClick={()=>updateStatus(item.id)}
                                className="cursor-pointer"
                              >                               
                                <i class="text-xl text-red-500 fa-solid fa-power-off"></i>
                              </button>
                           
                              <Link to={`update-category/${item.id}`} title='Cập nhật'>
                              <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                              </Link>
                         </div>
                    ):(
                        <div className='flex gap-2'>
                            <button
                              title='Mở khóa'
                               onClick={()=>updateStatus(item.id)}
                               className="cursor-pointer"
                             >
                              <i class="text-green-400 text-xl fa-solid fa-rotate-right"></i>
                             </button>
                          
                             {/* <button onClick={()=>handleDelete(item.id)}>
                             <i class="text-xl text-red-600 fa-regular fa-trash-can "></i>
                             </button> */}

                              <Link to={`update-category/${item.id}`} title='Cập nhật'>
                              <i class="ms-2 text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                              </Link>
                        </div>
                    )}
                  
                </td>
                </tr>
            ))
            }
            
            
        </tbody>
    </table>
  

    </div>
    </div>
  )
}

export default IndexCategory
