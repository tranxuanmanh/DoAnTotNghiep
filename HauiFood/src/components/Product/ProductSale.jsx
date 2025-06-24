import React, { useState } from 'react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductItem from './ProductItem';

import { Link } from 'react-router';

const ProductSale = ({products}) => {
  const filterSale=products.filter((item)=>item.priceDiscount>4);
  console.log(filterSale)

      const [visibleCount, setVisibleCount] = useState(3); // bắt đầu hiển thị 3 sản phẩm
      const handleShowMore = () => {
        setVisibleCount(prev => prev + 3);
      };
  return (
  
       <div className='mb-4 mt-2'>
      <div className=' mb-2.5 flex items-center w-[100%]  text-center border-yellow-300'>
      <div className="flex-grow border-dotted border-t border-yellow-400"></div>
      <h2 className="text-xl font-bold mb-2 text-yellow-500 px-2">Best Sale</h2>
      <div className="flex-grow border-dotted border-t border-yellow-400"></div>
      </div>
     {/* San pham moi */}
     <div className='ms-2  flex gap-x-3 flex-wrap gap-y-2'>
     <div>
         <Link to="/danhmuc/sale">
         <img className='w-[450px] h-[260px] rounded' src="https://static.kfcvietnam.com.vn/710x470%20%20BTTK)_KO%20KT%20(7%20PHAN).jpg" alt="" />
         </Link>
      </div>
     {filterSale.slice(0, visibleCount).map(product => (
      <ProductItem product={product} sale={true}></ProductItem>
     ))}
     </div>
     {visibleCount<filterSale.length&&(<div className='ms-20 text-center mt-3'>
        <button  onClick={handleShowMore} className='px-3 py-1 text-blue-600 bg-blue-100 cursor-pointer rounded'>
        <i class="fa-solid fa-angles-down me-2"></i>
            Xem thêm
        </button>
     </div>)}
    </div>
   
  )
}

export default ProductSale
