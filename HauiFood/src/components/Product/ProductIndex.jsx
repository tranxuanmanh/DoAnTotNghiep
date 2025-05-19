import React from 'react'
import ProductHot from './ProductHot'
import ProductAll from './ProductAll'
import ProductDrink from './ProductDrink'
import ProductSale from './ProductSale'
import ProductCombo from './ProductCombo'
import DoAn from './DoAn'

const ProductIndex = ({products}) => {
  return (

      <div className="p-1 ">
          {/* San pham hot: Bán nhiều thì hot */}
          <ProductHot products={products}/>
          {/* San pham giảm giá : >10% */}
          <ProductSale products={products}/>
          {/**Đồ uống :drink,sua-chua,cafe */}
          <ProductDrink products={products}/>
          {/**Combo :Ca do an va do uong */}
          <ProductCombo products={products}/>
          {/**Đồ ăn :Đồ ăn */}
          <DoAn products={products}/>
          {/* Khác tag:khác*/}
          <ProductAll products={products}/>
     </div>

  )
}

export default ProductIndex
