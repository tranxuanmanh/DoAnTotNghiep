
import React, { useEffect, useState } from 'react'
import Modal from '../Product/ModalProduct/Modal';
import { useParams } from 'react-router';
import axios from 'axios';
import DateFormart from '../../Admin/Component/Base/DateFormart';


const ProductDetail = () => {
     const {id}=useParams();
     const[isActive,setIsActive]=useState(false);
     const [products,setProducts]=useState(null);
     const [mainImage, setMainImage]=useState("");
     const [imageActive,setImageActive]=useState([]);

     const [comment,setComment]=useState([]);
     //Get chi tiết sản phẩm
     const getProductById=async()=>{
        try{
          const res=await axios.get(`http://localhost:8080/api/v1/product/${id}`);
          const kq=res.data.data;
          setProducts(kq);
          setMainImage(kq?.images[0]?.image_url);
          setImageActive(kq.images);
        }catch(error){
            setProducts(null);
            setMainImage("");
            setImageActive([])
            console.log(error);
        }
     }
     //Get tất cả các comment của sản phẩm
     const getCommentProduct=async()=>{
      try{
        const res=await axios.get(`http://localhost:8080/api/v1/review/all/${id}`);
        setComment(res.data.filter((item)=>item.status==true));
        console.log(res.data);
      }catch(error){
        console.log(error);
      }
     }
   useEffect(()=>{
    getProductById();
    getCommentProduct()
    
   },[id])
  
     console.log(products);//Lấy được id rồi 
    
    console.log(imageActive)
       return (
    <div className='w-full min-h-[700px]'>
        <p className='text-center bg-green-300 font-semibold py-2'>Chi tiết sản phẩm</p>
      <div className='flex mt-2 ms-5 p-2'>
        <div className='w-[38%] bg-white  py-2 px-2'>
            <img className='w-[450px] rounded shadow shadow-gray-300 p-1 h-[400px]'  src={mainImage||"https://daubepgiadinh.vn/wp-content/uploads/2018/05/hinh-banh-cupcake.jpg"} alt="hinh anh" />
            <div className='flex gap-x-2 mt-2 flex-wrap gap-y-2'>
        {
          imageActive.length>0&&(
            imageActive.map((item,index)=>  <img key={index} className='w-[100px] h-[100px] object-cover rounded p-0.5' onClick={()=>setMainImage(item.image_url)} src={item.image_url} alt="" />)
          
          )
        }
    
                   
            </div>
        </div>
        <div className='w-[58%] bg-white shadow px-2 py-6 '>
            <p className='font-bold text-lg'>{products?.name}</p>
            <p className='mt-2'>
           - {products?.description}
            </p>
            <p className='mt-2'><span className='font-bold '>Giá gốc:</span> {products?.price.toLocaleString()} đ</p>
            <p className='mt-2'><span className='font-bold '>Giá bán:</span> {products?.priceSell.toLocaleString()} đ</p>
            <p className='mt-2'><span className='font-bold '>Số lượng còn:</span> {products?.quantity} sản phẩm</p>
            <p className='mt-2'><span className='font-bold '>Đã bán:</span> {products?.sold_quantity} sản phẩm</p>
          
            <button 
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className={`mt-14 hover:cursor-pointer rounded-lg px-2 py-1 mr-2 text-sm border-2 border-red-600 font-semibold text-white  bg-red-600`}
                 onClick={()=>setIsActive(!isActive)}
                >
                  Thêm vào giỏ
                  </button>
        </div>
      </div>
      <div className='ms-4 mt-5 w-[95%] overflow-scroll min-h-[300px]'>
        <p className='font-semibold border-b py-2 text-blue-500'>Nhận xét 🔽🔽</p>
        {comment.length>0?(
          comment.map((item,index)=>
          <div key={index} className='mt-2 '>
          <p className='text-sm text-gray-500'>
           <i class="fa-solid fa-user me-2"></i>   {item.userName} --- Thời gian: {<DateFormart value={item.createdAt}/>}
          </p>
          <p className='text-sm'>Bình luận</p>
          {[...Array(item.start)].map((_, index) => (
            <i key={index} className="fa-solid fa-star text-yellow-400"></i>
          ))}
           ------ {item.comment}
          </div>
          
          )
          
        ):(<p>Chưa có đánh giá nào</p>)}



      </div>
      {isActive&&<Modal isActive={isActive} setIsActive={setIsActive} show={products}></Modal>}
    </div>
  )
}

export default ProductDetail
