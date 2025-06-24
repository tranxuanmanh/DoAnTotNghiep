import React, { useState } from 'react'
import { Link } from 'react-router'
import ProductItem from './ProductItem'

const ProductCombo = ({products}) => {
  //Lấy những sản phẩm combo 

    const arr=["combo"];

    const combos=products.filter(item=>arr.includes(item.tag));

    console.log(combos);
    const [visibleCount, setVisibleCount] = useState(5); // bắt đầu hiển thị 5 sản phẩm

    const handleShowMore = () => {
      setVisibleCount(prev => prev + 3);
    };
  return (
    <div>
        <div className='p-1 w-[100%] '>
      <div className=' flex justify-between items-end w-[100%] border-b border-dotted border-red-400 py-1 mb-3'>
      <h2 className="text-xl font-bold ">Combo 🍔🍨 </h2>
      <Link to="/danhmuc/2" className="text-blue-500 underline me-3 font-semibold">Xem tất cả</Link>
      </div>
      {/* <div className='w-[100%] grid sm:grid-cols-2 sm:grid-rows-2 md:grid-rows-1  md:grid-cols-4 gap-x-2'>
        <img className=' mb-2 h-40 rounded' src="https://pizzahut.vn/_next/image?url=https%3A%2F%2Fcdn.pizzahut.vn%2Fimages%2FWEB_V3%2FCATEGORIES_MenuTool%2FCateBanner_MyBox_Desktop_VI.webp&w=1170&q=100" alt="" />
        <img className=' mb-2 h-40 rounded' src="https://pizzahut.vn/_next/image?url=https%3A%2F%2Fcdn.pizzahut.vn%2Fimages%2FWEB_V3%2FCATEGORIES_MenuTool%2FCateBanner_MyBox_Desktop_VI.webp&w=1170&q=100" alt="" />
        <img className=' mb-2 h-40 rounded' src="https://pizzahut.vn/_next/image?url=https%3A%2F%2Fcdn.pizzahut.vn%2Fimages%2FWEB_V3%2FCATEGORIES_MenuTool%2FCateBanner_MyBox_Desktop_VI.webp&w=1170&q=100" alt="" />
        <img className=' mb-2 h-40 rounded' src="https://pizzahut.vn/_next/image?url=https%3A%2F%2Fcdn.pizzahut.vn%2Fimages%2FWEB_V3%2FCATEGORIES_MenuTool%2FCateBanner_MyBox_Desktop_VI.webp&w=1170&q=100" alt="" />
      
      
      
      
      </div> */}
  
     <div className=' flex gap-x-3 flex-wrap gap-y-2 justify-start bg-gradient-to-r to-green-200 from-sky-200 w-[100%] px-2 py-2 rounded'>
     {combos.slice(0, visibleCount).map(product => (      
         <ProductItem product={product} ></ProductItem>
     ))}
      
     </div> 
     {visibleCount<combos.length&&(<div className='ms-20 text-center mt-3'>
        <button  onClick={handleShowMore} className='px-3 py-1 text-blue-600 bg-blue-100 cursor-pointer rounded'>
        <i class="fa-solid fa-angles-down me-2"></i>
            Xem thêm
        </button>
     </div>)}
     
    </div>
    </div>
  )
}

export default ProductCombo
