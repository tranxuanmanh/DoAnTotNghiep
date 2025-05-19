import React from 'react'

import ProductItem from './ProductItem';
import { Link } from 'react-router';
//Product Khac
const ProductAll = ({products}) => {
  return (
 
      <div className='p-1 w-[100%] '>
      <div className=' flex justify-between items-end w-[100%] border-b border-dotted border-red-400 py-1 mb-3'>
      <h2 className="text-xl font-bold  text-red-500 ">Khác 🍿🍩</h2>
      <Link to="#" className="text-blue-500 underline me-3 font-semibold">Xem tất cả</Link>
      </div>
  
     <div className=' flex gap-x-3 flex-wrap gap-y-2 justify-start'>
     {products.map(product => (      
         <ProductItem product={product} ></ProductItem>
     ))}
     
     </div> 
    </div>
   
  )
}

export default ProductAll
