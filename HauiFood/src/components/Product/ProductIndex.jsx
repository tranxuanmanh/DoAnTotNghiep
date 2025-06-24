import React from 'react'
import ProductHot from './ProductHot'
import ProductDrink from './ProductDrink'
import ProductSale from './ProductSale'
import ProductCombo from './ProductCombo'
import ThucAn from './ThucAn'
import MonAnKhac from './MonAnKhac'

const ProductIndex = ({products}) => {
  return (

      <div className="p-1 ">
          {/* San pham hot: Bán nhiều thì hot */}
          <ProductHot products={products}/>
          {/* San pham giảm giá : >10% */}
          <ProductSale products={products}/>
          {/**Đồ uống :drink,sua-chua,cafe */}
          <ProductDrink products={products}/>
          {/**Đồ ăn :Đồ ăn */}
          <ThucAn products={products}/>
          {/**Combo :Ca do an va do uong */}
          <ProductCombo products={products}/>
        
          {/* Khác tag:khác*/}
          <MonAnKhac products={products}/>
     </div>

  )
}

export default ProductIndex
