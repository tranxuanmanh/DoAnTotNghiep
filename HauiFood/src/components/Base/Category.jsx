import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const Category = ({isOpen}) => {
  const [danhmuc,setDanhMuc]=useState([]);
  const getAllDanhMuc=async()=>{
    try{
    const res=await axios.get("http://localhost:8080/api/v1/category/gets");
    
    const ketqua=res.data.data.filter((item)=>item.status==true);
    console.log(ketqua);
    setDanhMuc(ketqua);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllDanhMuc()
  },[])
  const filterDanhMuc=danhmuc.filter(item=>item.status==true);
 // console.log(filterDanhMuc);
  return (
  
    <div id="mega-menu-full-dropdown"  class={`${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 invisible"} absolute z-50 w-[98vw]  border-gray-200 shadow-lg rounded-b-lg mx-3 bg-gray-200`}>
    <div class="max-w-screen px-4 py-5 mx-auto text-gray-900 dark:text-white ">
        <ul className='grid sm:grid-cols-3 md:grid-cols-7'>
        <li >
            <Link to={`danhmuc/all`} class="block p-2 rounded-lg hover:bg-gray-100 hover:text-red-500 ">
                <div className='flex items-center gap-4'>
                <img className='w-17 h-17 transition-all duration-300 hover:scale-125 rounded' src="https://www.dmoose.com/cdn/shop/articles/1_main_ebfd0747-89d3-4145-b206-7f7764480614.jpg?v=1638363217" alt="" />
               <div>
               <p class="font-semibold">Tất cả</p>
               <span class="text-sm text-gray-500 dark:text-gray-400">Tất cả sản phẩm</span>
               </div>
                </div>
            </Link>
        </li> 
            {filterDanhMuc&&

            filterDanhMuc.map((item,index)=>
              <li key={index}>
            <Link to={`danhmuc/${item.id}`} class="block p-2 rounded-lg hover:bg-gray-100 hover:text-red-500 ">
                <div className='flex items-center gap-4'>
                <img className='w-17 h-17 transition-all duration-300 hover:scale-125 rounded' src={`${item.images}`} alt="" />
               <div>
               <p class="font-semibold">{item.name}</p>
               <span class="text-sm text-gray-500 dark:text-gray-400">{item.description}</span>
               </div>
                </div>
            </Link>
        </li> 

        )}
   
     
            
            
            
            
            
        </ul>
       
        
    </div>
</div>
  
  )
}

export default Category
