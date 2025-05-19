import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import UpdateTopping from './UpdateTopping';
import AddTopping from './AddTopping';

const IndexTopping = () => {
    const [toppings,setToppings]=useState([]);
    const [openModal,setOpenModal]=useState(false);
    const [openModalAdd,setOpenModalAdd]=useState(false);
    const [idUpdate,setIdUpdate]=useState(null);
    const [trangthai,setTrangThai]=useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // số lượng topping mỗi trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = toppings.filter((item)=>item.status==trangthai).slice(indexOfFirstItem, indexOfLastItem);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

const totalPages = Math.ceil(toppings.length / itemsPerPage);
    const getTopping=async()=>{
        try{
        const res=await axios.get("http://localhost:8080/api/v1/topping");
        console.log(res.data);
        setToppings(res.data);
        }catch(error){
            toast.error("Đã xảy ra lỗi khi lấy dữ liệu",{autoClose:2000});
        }
    }

    useEffect(()=>{
        getTopping();
    },[])

    const handleUpdate=(id)=>{
        setOpenModal(true);
        setIdUpdate(id);
    }
    console.log({openModal,idUpdate});



  return (
    <>  
     <div class=" w-[99.3%] relative  shadow-md sm:rounded-lg bg-blue-200 p-2 mt-2 ml-2">
    <button onClick={()=>setOpenModalAdd(true)} className='py-2 px-2 bg-yellow-400 rounded font-semibold mb-2'>+ Thêm topping</button>
    <div className='mb-2'>
    <p className='font-semibold mb-1'>Trạng thái</p>
    <button onClick={()=>setTrangThai(true)} className='cursor-pointer bg-green-400 font-semibold px-2 py-1 rounded me-2'>Hoạt động</button>
    <button onClick={()=>setTrangThai(false)} className=' cursor-pointer bg-red-400 font-semibold px-2 py-1 rounded me-2 w-[80px]'>Tắt</button>
    </div>
    <table class="w-[100%] text-sm text-left text-black rounded-lg h-[500px] mb-2">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Tên topping
                </th>
                <th scope="col" class="px-6 py-3">
                    Giá bán
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
            {currentItems &&(
                currentItems.map((item,index)=>(
            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
               
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.toppingId}
                </th>
                <td class="px-6 py-4">
                    {item.name}
                </td>
                <td class="px-6 py-4">
                    {item.price}
                </td>
                <td class="px-6 py-4">
                    {item.status?( 
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        <p className="text-green-500 font-semibold">Hoạt động</p>
                    </div>  ):(<p>Dừng</p>)}
                </td>
                <td class="px-6 py-4">
                    <button onClick={()=>handleUpdate(item.toppingId)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cập nhật</button>
                </td>
            </tr>
                ))
            )}
        

           
            
        </tbody>
    </table>
    {openModal?<UpdateTopping id={idUpdate} onClose={() => setOpenModal(false)}/>:""}
    {openModalAdd?<AddTopping onClose={() => setOpenModalAdd(false)}/>:""}

    {currentItems.length>0?(
         <nav >
  <ul className="inline-flex space-x-2 text-sm h-8">
    <li>
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 h-8 border rounded-s-lg hover:bg-gray-100">Previous</button>
    </li>
    {Array.from({ length: totalPages }, (_, i) => (
      <li key={i}>
        <button
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 h-8 border ${currentPage === i + 1 ? ' text-blue-500 font-semibold' : 'hover:bg-gray-100'}`}
        >
          {i + 1}
        </button>
      </li>
    ))}
    <li>
      <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 h-8 border rounded-e-lg hover:bg-gray-100">Next</button>
    </li>
  </ul>
    </nav>
    ):("")}
   


    </div>
    
    </>
  )
}

export default IndexTopping
