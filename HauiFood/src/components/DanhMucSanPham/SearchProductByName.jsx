import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ItemProductByDanhMuc from './ItemProductByDanhMuc';


const SearchProductByName = () => {
    const {name}=useParams();
    const [products,setProduct]=useState([]);
    const [visibleCount, setVisibleCount] = useState(2);//Số item hiển thị ban đầu
    const handleShowMore = () => {
        setVisibleCount(prev => prev + 5);//Tang len 5 item moi khi click
      };
    const handleSearch=async()=>{
        console.log(name);
        try{
          const res=await axios.get(`http://localhost:8080/api/v1/product/name?value=${name}`);
          const ketqua=res.data?.data;
          setProduct(ketqua);
        }catch(error){
          setProduct([]);
          console.log(error.response.data.message);
        }
      }
useEffect(()=>{
    handleSearch()
},[name])

const [sortOption, setSortOption] = useState({ field: '', order: '' });

const sortProducts = (productsToSort, field, order) => {
  const sorted = [...productsToSort];
  if (field === 'price' || field === 'ten') {
    sorted.sort((a, b) => {
      let aValue = field === 'ten' ? a.name.toLowerCase() : a.priceSell;
      let bValue = field === 'ten' ? b.name.toLowerCase() : b.priceSell;
      return order === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  }
  return sorted;
};

const handleSortChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  const sorted = sortProducts(products, name, value);
  setProduct(sorted);
  setSortOption({ field: name, order: value });
};

const handleResetSort = () => {
    handleSearch(); // Gọi lại API để lấy dữ liệu gốc
    setSortOption({ field: '', order: '' }); // Xóa lựa chọn sắp xếp
  };

console.log({products})
  return (
    <div>
        {
            products.length>0?(  
            <div className='text-center w-full mt-2 font-semibold mb-2'>
                <p>Danh sách sản phẩm --- {name}</p>
            </div >
            ):("")
        }
  
        {
        products.length>0?(
            <div className='flex w-[100%] h-auto gap-x-2 ms-2 me-2'>
            <div className='w-[15%] bg-white rounded shadow-xl shadow-gray-300 p-2 sticky top-2 h-fit'>
                <p className='text-center font-semibold border-b py-1'>Bộ lọc sản phẩm</p>
                <p className='font-semibold mt-2'>
                    Giá bán
                </p>
                <ul>
                    <li>
                       <input  checked={sortOption.field === 'price' && sortOption.order === 'asc'}  type="radio" name="price" value="asc" onChange={handleSortChange}/>  Tăng dần
                    </li>
                    <li>
                       <input checked={sortOption.field === 'price' && sortOption.order === 'desc'} type="radio" name="price" value="desc" onChange={handleSortChange}/>  Giảm dần
                    </li>
                </ul>
                <p className='font-semibold mt-2'>
                    Tên sản phẩm
                </p>
                <ul>
                    <li>
                       <input checked={sortOption.field === 'ten' && sortOption.order === 'asc'} type="radio" name="ten" value="asc" onChange={handleSortChange}/>  A - Z
                    </li>
                    <li>
                       <input checked={sortOption.field === 'ten' && sortOption.order === 'desc'} type="radio" name="ten" value="desc" onChange={handleSortChange}/>  Z - A
                    </li>
                </ul>
               <div className='text-center mt-2'>
               <button
               onClick={handleResetSort}
                className='font-semibold hover:cursor-pointer  border px-4 py-1 rounded border-red-400 text-red-500 bg-red-200 '>
                    Reset
                </button>
               </div>
            </div>
            <div className='px-16 flex flex-wrap justify-start gap-x-2 bg-gray-100 shadow-xl rounded w-[83.5%] py-2 gap-y-2'>
        {
            products&&(
                products.slice(0, visibleCount).map((item,index)=><ItemProductByDanhMuc key={index} product={item}/>)
            )
        }
       
        </div> 
        </div>
        ):(
        <div className='w-[100%]  flex flex-col justify-center p-5'>
             <p className=' font-semibold mt-3'>Không tìm thấy sản phẩm này ....</p>
             <div class="loaderAA"></div> 

        </div>
       
    
    )
    }
   
   {visibleCount < products.length && (
  <div className='ms-58 w-[70%] flex justify-center mt-4'>
    <p
      onClick={handleShowMore}
      className='hover:cursor-pointer px-3 py-1 w-[14%] font-semibold rounded text-green-600 bg-green-100 text-center'
    >
      <i className="fa-solid fa-angles-down me-1"></i>
      Xem thêm
    </p>
  </div>
)}
   
    </div>
  )
}

export default SearchProductByName
