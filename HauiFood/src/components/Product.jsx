import React, { useEffect, useState } from 'react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductIndex from './Product/ProductIndex';
import axios from 'axios';

const Product = () => {
  const [productss,setProductss]=useState([]);
const getAllProduct=async()=>{
  try{
  const res=await axios.get("http://localhost:8080/api/v1/product/all");
  console.log(res);
  const giatri=res.data.data;
  setProductss(giatri);
  }catch(err){
    console.log("Có lỗi xảy ra trong chương trình");
  }
}
useEffect(()=>{
  getAllProduct()
},[])
  return ( 
   <div className='flex mt-2 p-2 boss w-[100%]'>
  
    {/* <Category></Category> */}
    <ProductIndex products={productss}></ProductIndex>
   </div>
  )
}

 export default Product
