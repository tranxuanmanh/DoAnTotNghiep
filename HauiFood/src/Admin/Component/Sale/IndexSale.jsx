import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router';
import AddSale from './AddSale';
import UpdateSale from './UpdateSale';

const IndexSale = () => {
    const [voucher,setVoucher]=useState([]);
    const [filteredVoucher, setFilteredVoucher] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // hoặc 'desc'
    const [isModalAdd, setIsModalAdd] = useState(false);
    const [editVoucherId, setEditVoucherId] = useState(null);
    const [isModalUpdate, setIsModalUpdate] = useState(false);

    const [filterStatus,setFileterStatus]=useState("CHUAKICHHOAT");
    const getAllVoucher=async()=>{
        try{
        const responseData=await axios.get("http://localhost:8080/api/v1/voucher/all");
        // setVoucher(responseData.data.data.sort((a, b) => b.voucherId - a.voucherId));
        const result = responseData.data.data;
        console.log(result)
        if (Array.isArray(result)) {
          setFilteredVoucher(result.sort((a, b) => b.voucherId - a.voucherId));
        } else if (result) {
         // const kq=[result].filter((item)=>item.voucherStatus==filterStatus);
          setFilteredVoucher([result]); // Gói lại thành mảng nếu chỉ có 1 item
          //console.log(kq);
        } else {
          setFilteredVoucher([]); // Không có kết quả
        }
    
        setCurrentPage(1);
       // Gán cho cả danh sách hiển thị
        }catch(error){
            console.log('Get all category failed',error);
            setFilteredVoucher([]);
        }
    }
    useEffect(()=>{
        getAllVoucher();
    },[])

    //Sắp xếp theo status
  const handleSortByStatus = () =>{
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const listToSort = filteredVoucher.length > 0 ? filteredVoucher : voucher;
    
    const sorted = [...listToSort].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.voucherStatus === b.voucherStatus ? 0 : a.voucherStatus ? -1 : 1;
      } else {
        return a.voucherStatus === b.voucherStatus ? 0 : a.voucherStatus ? 1 : -1;
      }
    });
    setSortOrder(newOrder);

    // Gán đúng vào state đang hiển thị
    if (filteredVoucher.length > 0) {
      setFilteredVoucher(sorted);
    } else {
      setVoucher(sorted);
    }
  };
  //Sắp xếp theo ngày hết hạn
  const handleSortByEndDate = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const listToSort = filteredVoucher.length > 0 ? filteredVoucher : voucher;
  
    const sorted = [...listToSort].sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      
      return newOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
    setSortOrder(newOrder);
  
    if (filteredVoucher.length > 0) {
      setFilteredVoucher(sorted);
    } else {
      setVoucher(sorted);
    }
  };
  //Sắp xếp theo lượt sử dụng
  const handleSortByNumberUsed = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const listToSort = filteredVoucher.length > 0 ? filteredVoucher : voucher;
  
    const sorted = [...listToSort].sort((a, b) => {
      return newOrder === 'asc'
        ? a.numberUsed - b.numberUsed
        : b.numberUsed - a.numberUsed;
    });
  
    setSortOrder(newOrder);
  
    if (filteredVoucher.length > 0) {
      setFilteredVoucher(sorted);
    } else {
      setVoucher(sorted);
    }
  };

   // console.log(category)
   //Xóa 1 mã khuyến mãi
   const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa mã khuyến mãi này?");
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/v1/voucher/${id}`);
      alert("Xóa thành công!");
      // Sau khi xóa thành công, gọi lại danh sách
      getAllVoucher();
    } catch (error) {
      console.log("Xóa thất bại", error);
    }
  };

  const updateStatus = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái khuyến mãi này?");
    if (!isConfirmed) return;
  
    try {
      await axios.put(`http://localhost:8080/api/v1/voucher/status/${id}`);
      alert("Thay đổi trạng thái khuyến mãi thành công!");
      // Sau khi xóa thành công, gọi lại danh sách
      window.location.reload();
      getAllCategory();
    } catch (error) {
      console.log("Thay đổi trạng thái danh mục thất bại", error);
    }
  };
//Phân trang
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10); // Số item mỗi trang

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const displayList = filteredVoucher.length > 0 ? filteredVoucher : voucher;
const currentItems = displayList.filter((item)=>{
  if(filterStatus!=""){
    return item.voucherStatus==filterStatus;
  }else{
    return item;
  }
}).slice(indexOfFirstItem, indexOfLastItem);


const totalPages = Math.ceil(filteredVoucher.length / itemsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(prev => prev - 1);
};


//Tìm kiếm theo mã khuyến mãi
const searchByCode=async(value)=>{
    try{
        const res=await axios.get(`http://localhost:8080/api/v1/voucher?code=${value}`)
        console.log(res.data.data);
        setFilteredVoucher([res.data.data]); // Chỉ cập nhật danh sách hiển thị
        setCurrentPage(1); // reset về trang 1 khi tìm
    }catch(error){
        setFilteredVoucher([]);
    }
}

//Modal update voucher
const handleUpdate=()=>{
    setIsModalUpdate(true);

}

  return (
    <div>
        {isModalAdd&&<AddSale open={setIsModalAdd}/>}
        {isModalUpdate&&<UpdateSale open={setIsModalUpdate} id={editVoucherId}/>}
       
            <div class=" w-[99.3%] h-full relative  shadow-md sm:rounded-lg p-2 mt-2 ml-2">


<div className='flex justify-between items-center px-3 mb-2'>

<button className='bg-green-500 rounded p-2 text-white font-semibold' onClick={() => setIsModalAdd(true)} >+ Thêm mã khuyến mãi mới</button>

<div className='flex gap-x-2'>
  <button onClick={()=>setFileterStatus("")} title='Chưa hoạt động' className='bg-yellow-100 text-yellow-600 py-2 px-2 font-semibold rounded cursor-pointer'>Tất cả</button>
  <button onClick={()=>setFileterStatus("CHUAKICHHOAT")} title='Chưa hoạt động' className='bg-red-100 text-red-600 py-2 px-2 font-semibold rounded cursor-pointer'>Chưa kích hoạt</button>
  <button onClick={()=>setFileterStatus("DANGHOATDONG")} title='Hoạt động' className='bg-green-100 text-green-600 py-2 px-2 font-semibold rounded cursor-pointer'>Hoạt động</button>
  <button onClick={()=>setFileterStatus("HETHAN")} title='Hết hạn' className='bg-gray-100 text-black py-2 px-2 font-semibold rounded cursor-pointer'>Hết hạn</button>
</div>


<input 
         type="text"
         placeholder='Nhập mã voucher cần tìm ... '
         onChange={(e)=>{
            const vl=e.target.value;
            if(vl.trim() === ""){
                getAllVoucher(); // Gọi lại tất cả nếu input rỗng
            } else {
              searchByCode(vl); // Tìm kiếm nếu có nội dung
            }
            }
         }
         
         className='rounded-lg w-[300px]' />    
     
      <div className='text-2xl'>
          <button onClick={handlePrevPage} disabled={currentPage === 1} className={` hover:cursor-pointer`}><i class={`fa-solid fa-circle-left me-4  ${currentPage==1?"text-gray":"text-red-500"}`}></i></button>
         
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className='hover:cursor-pointer'><i class={`fa-solid fa-circle-right  ${currentPage === totalPages?"text-gray":"text-red-500"}`}></i></button>
      </div>
</div>
{filteredVoucher.length>0? (<table class="w-[100%] text-sm text-left text-black rounded-lg bg-white">
      <thead class="text-xs text-black uppercase bg-gray-50 ">
          <tr>

              <th scope="col" class="px-6 py-3">
                 Stt
              </th>
             
              <th scope="col" class="px-2 py-3">
                  Mã Khuyến Mãi
              </th>
              <th scope="col" class="px-2 py-3">
                  Số tiền giảm
              </th>
              <th scope="col" class="px-1 py-3">
                GT đơn hàng
              </th>
              <th scope="col" class="px-4 py-3">
                Mô tả ngắn
              </th>
              <th scope="col" class="px-2 py-3">
                Ngày bắt đầu
              </th>
              <th scope="col" class="px-2 py-3 cursor-pointer"  onClick={handleSortByEndDate}>
                Ngày kết thúc
                {/* <i className={`ml-1 fa-solid ${sortOrder === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> */}
              </th>
               <th scope="col" class="px-2 py-3">
                Số lượng
              </th>  
              <th scope="col" class="px-2 py-3 cursor-pointer" onClick={handleSortByNumberUsed}>
                Lượt dùng
                {/* <i className={`ml-1 fa-solid ${sortOrder === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> */}
              </th>
              
              <th scope="col" class="px-2  py-3 cursor-pointer" onClick={handleSortByStatus}>
                  Trạng thái
                   <i className={`ml-1 fa-solid ${sortOrder === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> 
              </th>
              <th scope="col" class="px-3 py-3 ">
                 Hành động
              </th>
          </tr>
      </thead>
      <tbody>
          {
          filteredVoucher&&
          currentItems.map((item,index)=>(
            
              <tr key={index} class={`${(item.voucherStatus=="HETHAN"||item.voucherStatus=="HETLUOTSUDUNG"||item.voucherStatus=="CHUAKICHHOAT")?"bg-gray-100":""} border-b  border-gray-200 `}>
              <td class="px-6 py-4">
                 {item.voucherId}
              </td>
             
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.voucherCode}
              </th>
              <td class="px-1 py-4 font-semibold">
                {item.minOrder?.toLocaleString()} đ
              </td>
              <td class="px-2 py-4 font-semibold">
               {item.discount.toLocaleString()} đ
              </td>
              <td class="px-4 py-4">
                 {item.description}
              </td>
              <td class="px-6 py-4">
                 {item.startDate}
              </td>
              <td class="px-6 py-4">
                 {item.endDate}
              </td>
               <td class="px-8 py-4">
                 {item.quantity}
              </td>
              <td class="px-8 py-4">
                 {item.numberUsed}
              </td>
             
              <td class=" py-1 px-1  w-40">
              <p
                      className={`w-[70%] text-center rounded py-1  `}>
                      {item.voucherStatus==="CHUAKICHHOAT" ?<p className='text-red-500 font-semibold  bg-red-100 py-1 rounded'> Chưa kích hoạt </p>: ""}
                      {item.voucherStatus==="DANGHOATDONG" ? <p className='text-green-500 font-semibold bg-green-100 rounded py-1'> Hoạt động </p>: ""}
                      {item.voucherStatus==="HETLUOTSUDUNG" ?  <p className='text-yellow-700 bg-amber-100 font-semibold py-1 rounded'>Hết lượt dùng</p> : ""}
                      {item.voucherStatus==="HETHAN" ?  <p className='text-black font-semibold bg-gray-200 py-1 rounded'>Hết hạn</p> : ""}
                    </p>
              </td>
              <td class="px-6 py-4">
                  {(item.voucherStatus=="HETLUOTSUDUNG"||item.voucherStatus=="HETHAN"||item.voucherStatus=="CHUAKICHHOAT")?(
                       <div className='flex gap-x-4'>
                       
                             <button onClick={()=>handleDelete(item.voucherId)}>
                           <i class="text-xl text-red-600 fa-regular fa-trash-can "></i>
                           </button>
                         
                            <button onClick={() => {
                                        setEditVoucherId(item.voucherId); // truyền ID cần sửa
                                        setIsModalUpdate(true); // mở form
                                        }} >
                            <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                            </button>
                       </div>
                  ):(
                      <div className='flex gap-2'>
                              <button onClick={() => {
                                        setEditVoucherId(item.voucherId); // truyền ID cần sửa
                                        setIsModalUpdate(true); // mở form
                                        }} >
                            <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                            </button>

                      </div>
                  )}
                
              </td>
              </tr>
          ))
          }
          
          
      </tbody>
  </table>):(<p>Khong co ma voucher nao hop le</p>)}
  


  </div>
    
    </div>
  )
}

export default IndexSale
