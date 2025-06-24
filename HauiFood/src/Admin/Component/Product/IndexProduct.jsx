import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DeleteConfirmModal from "../Base/Delete";
import axios from "axios";

import FormatVND from "../Base/FormartMoney";
import Product_Detail from "./Product_Detail";
import useAuth from "../../../Login_Logout/CustomHook";
import { Link, useNavigate } from "react-router";

const IndexProduct = () => {
  const [showStatus, setShowStatus] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  //const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [detailProduct,setDetailProduct]=useState({
    id:"",
    showDetails:false
  });
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    name: "",
    direction: "asc",
    status:"true"
  });
  // console.log(detailProduct);
  console.log("Total page: "+totalPages)
  
  const [search,setSearch]=useState(""); //Search theo name
  const {getToken}=useAuth();
  const getAllproduct=async ()=>{
    try{
        const response=await axios.get(`http://localhost:8080/api/v1/product`,{
          params:{
            name:filter.name,
            direction:filter.direction,
            status:filter.status,
            page:filter.page,
            size:filter.size
          }
        });
        console.log(response.data)
        setData( response?.data.data.content);
        setTotalPages(response?.data.data.totalPages);//Lay ra tong so page
    }catch(error){
        setData([]);
    }  
  }


  useEffect(() => {
    getAllproduct()
  }, [filter]);

  const searchProductName=(e)=>{
    setSearch(e.target.value);
  }
  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        getAllproduct(); // Nếu search rỗng => gọi lại API phân trang
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/name?value=${search}`);
        setData(response?.data.data);
      } catch (error) {
        setData([]);
      }
    };
    fetchData();
  }, [search]);




  const [idDelete, setIdDelete] = useState(null);

  console.log(idDelete)
  const handleDelete = async() => {
    try{
    await axios.delete(`http://localhost:8080/api/v1/product/${idDelete}`,{
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
    });
    toast.success("Đã xóa thành công!", {
      autoClose: 2000,
    });
    await getAllproduct();
    setIsModalOpen(false);
    setIdDelete(null);
  }catch(error){
    toast.error("Có lỗi khi xóa sản phẩm", {
   
      autoClose: 2000,
    });
  }
}
const handlePageChange=(newPage) => {
  setFilter((prev)=>({
    ...prev,
    page:newPage
  }))
}


const updateStatus=async(id)=>{
  const xacNhan=window.confirm("Bạn có chắc chắn muốn cập nhật");
  if(xacNhan==false){
    return;
  }
      try{
        await axios.put(`http://localhost:8080/api/v1/product/update-status/${id}`,null,{
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      toast.success("Cập nhật sản phẩm thành công",{
        autoClose:1000,
        onClose:()=>{
          getAllproduct();
        }
      
      });
     
    }catch(error){
      console.log({error});
      toast.error("Cập nhật sản phẩm thất bại");
      }
 
  //Nếu thành công thì gọi lại
 
}

const navigate=useNavigate();

  return (
    // 3 table
    <>
      {/* Phan dau */}
      <div class=" w-[99.3%] h-[95vh] relative shadow-md sm:rounded-lg p-2 mt-2 ml-2">
        <ToastContainer />
        <div className="flex justify-between items-center">
          <div className="flex">
            
            <div className="w-auto h-10 mb-2 mt-2">
              <Link to={"add-product"} className="w-full bg-green-500 rounded py-2 px-1.5 font-semibold text-white hover:cursor-pointer"> 
              <i class="fa-solid fa-plus me-2"></i>
                 Thêm mới sản phẩm
                 </Link>
            </div>
          </div>
          <input
            type="text"
            className="border-none border-red-500 focus:shadow-lg focus:shadow-red-400 w-[27%] rounded-lg p-1 mb-2 py-2"
            placeholder="🔎 Tìm kiếm sản phẩm ... "
            onChange={searchProductName}
          />
        </div>
        <div className="h-[85%] overflow-y-auto ">
          <table class="w-[100%] text-sm text-left text-black rounded-lg">
            <thead class="text-xs sticky top-0 z-10 text-black uppercase bg-gray-200 ">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                   Id
                  </div>
                </th>
                <th scope="col" class="px-6 py-3  cursor-pointer" onClick={()=> setFilter({
                      ...filter,
                      name: "name",
                      direction: filter.direction === "asc" ? "desc" : "asc",
                        })}>
                  Sản phẩm

                  <i class="fa-solid fa-up-down ml-2"></i>
                </th>
                <th scope="col" class="px-6 py-3">
                  Hình ảnh
                </th>
                <th scope="col" class="px-6 py-3">
                  Giá gốc
                </th>
                <th scope="col" class="px-5 py-3">
                  Giảm (%)
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 cursor-pointer"
                  onClick={() =>
                    setFilter({
                      ...filter,
                      name: "price",
                      direction: filter.direction === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Giá bán
                  <i class="fa-solid fa-up-down ml-2"></i>
                </th>
                <th scope="col" class="px-6 py-3 cursor-pointer"   
                onClick={() =>
                    setFilter({
                      ...filter,
                      name: "quantity",
                      direction: filter.direction === "asc" ? "desc" : "asc",
                    })
                  }
                
                
                >
                  Số lượng
                  <i class="fa-solid fa-up-down ml-2"></i>
                </th>
                <th
                  scope="col"
                  onClick={() => setShowStatus(!showStatus)}
                  class="px-6 py-3 relative hover:bg-yellow-200 cursor-pointer"
                >
                  Tình trạng 🔎
                  {showStatus && (
                    <ul className="absolute bg-blue-300 z-30  flex flex-col left-0  top-12 w-[90%]">
                      <li className="cursor-pointer  border-b-1 hover:bg-blue-800 w-full p-2 hover:text-white"
                      onClick={() =>
                        setFilter({
                          ...filter,
                         status:"true"
                        })
                      }
                      
                      >
                        Đang bán
                      </li>
                      <li
                       className="cursor-pointer border-b-1 hover:bg-blue-800 w-full p-2 hover:text-white"
                       onClick={() =>
                        setFilter({
                          ...filter,
                          status:"false"
                        })
                      }
                      >
                        Dừng bán
                      </li>
                   
                    </ul>
                  )}
                </th>

                <th scope="col" class="px-6 py-3 relative">
                  Chi tiết
                </th>

                <th scope="col" class="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ?(
                data.map((item, index) => (
                  <tr key={index} class="bg-white border-b border-gray-200 hover:bg-gray-100 ">
                    <th scope="col" class="p-4">
                  <div class="flex items-center">
                   {item.product_id}
                  </div>
                </th>
                    <th
                      scope="row"
                      class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item.name}
                    </th>
                    <td class="px-4 py-2">
                      <img
                        className="object-cover w-26 h-16 rounded"
                        src={
                          item.images?.[0]?.image_url ||
                          "https://cokhiviendong.com/wp-content/uploads/2019/01/kinnh-nghi%E1%BB%87m-m%E1%BB%9F-qu%C3%A1n-g%C3%A0-r%C3%A1n-7.jpg"
                        }
                        alt=""
                      />
                    </td>

                    <td class="px-6 py-4">
                      {<FormatVND money={item.price} />}
                    </td>
                    <td class="px-7 py-4">
                      {item.priceDiscount} 
                    </td>
                    <td class="px-6 py-4">
                      {<FormatVND money={item.priceSell} />}
                    </td>

                    <td class="px-6 py-4">
                      {item.quantity}

                      {item.quantity<=20?(
                        <button title="Sắp hết hàng" className="ms-2 w-2 h-2 bg-red-500 rounded-full"></button>
                      ):("")}

                    </td>
                    <td class="px-6 py-4">
                      <p
                        className={` text-white w-[70%] text-center rounded py-1 shadow  ${
                          item.status
                            ? "shadow-green-400 bg-green-500"
                            : "bg-red-500 shadow-red-500"
                        }  `}
                      >
                        {item.status ? "Đang bán" : "Dừng bán"}
                      </p>
                    </td>
                    <td
                      onClick={() => {
                      
                      // setShowDetails(!showDetails)
                      // setIdProduct(item.product_id)
                      setDetailProduct({
                        ...detailProduct,
                        id:item.product_id,
                        showDetails:!detailProduct.showDetails

                      })
                      
                      }}
                      class="px-6 py-4 relative"
                    >
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Chi tiết...
                      </a>
                    </td>

                    <td class="px-7 py-4">
                     {item.status? (<div className="flex gap-x-5">
                        <button
                          // onClick={() => {
                          //   setIdDelete(item.product_id);
                          //   setIsModalOpen(!isModalOpen);
                          // }}
                          onClick={()=>{
                            updateStatus(item.product_id)
                          }}
                          className="cursor-pointer"
                        >
                         <i class=" text-xl text-red-500 fa-solid fa-trash-can-arrow-up" title="Dừng bán"></i>
                        </button>
                        <Link

                            to={`update-product/${item.product_id}`}
                          className="cursor-pointer">
                          <i class="text-xl text-blue-500 fa-regular fa-pen-to-square" title="Sửa"></i>
                        </Link>
                      </div>):(
                        <div className="flex gap-x-5">
                        <button
                         
                          onClick={()=>{
                            updateStatus(item.product_id)
                          }}
                          className="cursor-pointer"
                        >
                          <i class=" text-xl text-green-500 fa-solid fa-rotate-right" title="Khôi phục"></i>
                        </button>
                        <button 
                          onClick={() => {
                            setIdDelete(item.product_id);
                            setIsModalOpen(!isModalOpen);
                           }}
                        
                        className="cursor-pointer">
                        <i class="text-xl text-red-400 fa-regular fa-trash-can " title="Xóa"></i>
                        </button>
                      </div>
                      )} 
                     
                    </td>
                  </tr>
                ))):(
                <td colSpan={7} className="font-bold text-xl text-red-400 py-5 text-center">
                    Không tìm thấy sản phẩm nào
                </td>)}

            
            </tbody>
            {/* Show delete item */}
            <DeleteConfirmModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDelete}
            />
            {/* Ẩn / hiện chi tiết sản phẩm start*/}

            {detailProduct.showDetails && (
             <Product_Detail idProduct={detailProduct.id}  setShowDetails={setDetailProduct}/>
              //   Ẩn / hiện chi tiết sản phẩm end
            )}
          </table>
        </div>
        <nav class="flex flex-column flex-wrap md:flex-row justify-between pt-4 ">
          <select className="rounded py-1"  
          value={filter.size}
          onChange={(e) =>
          setFilter((prev) => ({
                      ...prev,
                     size: parseInt(e.target.value),
                     page: 0, // reset về trang đầu
    }))
  }>
            <option value={10}>Show 10 item</option>
            <option value={20}>Show 20 item</option>
            <option value={30}>Show 40 item</option>
            <option value={40}>Show 80 item</option>
          </select>
  <ul className="flex items-center gap-x-1 mr-10 ">
  <li>
    <button  className="border px-2 py-1 rounded border-blue-400 hover:bg-red-500 hover:text-white" onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page === 0}>
      Previous
    </button>
  </li>

  {Array.from({ length: totalPages }, (_, i) => (
    <li key={i}>
      <button
        onClick={() => handlePageChange(i)}
        className={`${filter.page === i ? "font-bold text-blue-500" : ""} border px-1.5 py-1 rounded hover:bg-red-500 hover:text-white`}
      >
        {i + 1}
      </button>
    </li>
  ))}

  <li>
    <button className="border px-2 py-1 rounded border-blue-400 hover:bg-red-500 hover:text-white" onClick={() => handlePageChange(filter.page + 1)} disabled={filter.page >= totalPages - 1}>
      Next
    </button>
  </li>
</ul>

        </nav>
      </div>
    </>
  );
};

export default IndexProduct;
