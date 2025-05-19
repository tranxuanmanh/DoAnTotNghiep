import React, { useState } from 'react'
import { Link } from 'react-router'
import ProductItem from './ProductItem'

const ProductDrink = ({products}) => {
  //Lấy những sản phẩm có tag như trên
    const arr=["nuoc-ep","sua-chua","cacao","nuoc-ngot","tra-chanh","matcha-latte","sua-chua","tra-sua"];

    const drinks=products.filter(item=>arr.includes(item.tag));

    console.log(drinks);
    const [visibleCount, setVisibleCount] = useState(10); // bắt đầu hiển thị 10 sản phẩm

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 5);
  };




  return (
    <div>
        <div className='p-1 w-[100%] '>
      <div className=' flex justify-between items-end w-[100%] border-b border-dotted border-red-400 py-1 mb-3'>
      <h2 className="text-xl font-bold ">Đồ uống 🍹🍹</h2>
      <Link to="/danhmuc/2" className="text-blue-500 underline me-3 font-semibold">Xem tất cả</Link>
      </div>
      <div>
        <img className=' w-[100%] h-40 mb-2' src="https://pizzahut.vn/_next/image?url=https%3A%2F%2Fcdn.pizzahut.vn%2Fimages%2FWEB_V3%2FCATEGORIES_MenuTool%2FCateBanner_Drinks_Desktop_VI.webp&w=1170&q=100" alt="" />
      </div>
  
     <div className=' flex gap-x-3 flex-wrap gap-y-2 justify-start bg-gradient-to-b to-pink-200 from-orange-200 w-[100%] rounded px-2 py-2'>
     {drinks.slice(0, visibleCount).map(product => (      
         <ProductItem product={product} ></ProductItem>
     ))}
      
     </div> 
     {visibleCount<drinks.length&&(<div className='ms-20 text-center mt-3'>
        <button  onClick={handleShowMore} className='px-3 py-1 text-blue-600 bg-blue-100 cursor-pointer rounded'>
        <i class="fa-solid fa-angles-down me-2"></i>
            Xem thêm
        </button>
     </div>)}
     
    </div>
    </div>
  )
}

export default ProductDrink
