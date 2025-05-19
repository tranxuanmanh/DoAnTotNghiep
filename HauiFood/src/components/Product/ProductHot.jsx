import React, { useState } from 'react'
import ProductItem from './ProductItem'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from 'react-router';

const ProductHot = ({products}) => {
  console.log({products});
  //Lấy những sản phẩm lớn hơn 5
  const filterHot = products?.filter(p => p.sold_quantity > 5);
  console.log({filterHot})



  const [visibleCount, setVisibleCount] = useState(3); // bắt đầu hiển thị 3 sản phẩm
  
    const handleShowMore = () => {
      setVisibleCount(prev => prev + 3);
    };
  return (

      <div className='ms-2  py-2  rounded w-[100%] '>
      <h2 className="text-xl font-bold mb-4 text-red-500 border-b">Bán nhiều nhất🔥🔥</h2>

      <div className=' py-2 px-1 flex gap-x-3 flex-wrap gap-y-2 justify-start'>
        <div>
          <Link to="/danhmuc/hot">
          <img className='w-[450px] h-[260px] rounded' src="//theme.hstatic.net/1000242782/1000838257/14/collection_one_img.jpg?v=620" alt="" />
          </Link>
         
        </div>
        {filterHot.slice(0, visibleCount).map((product,index) => (
            <ProductItem key={index} product={product} hot={true}></ProductItem>
        
        ))}
        
         
   </div>
   {visibleCount<filterHot.length&&(<div className='ms-20 text-center mt-3'>
        <button  onClick={handleShowMore} className='px-3 py-1 text-blue-600 bg-blue-100 cursor-pointer rounded'>
        <i class="fa-solid fa-angles-down me-2"></i>
            Xem thêm
        </button>
     </div>)}
    </div>
  
  )
}

export default ProductHot
