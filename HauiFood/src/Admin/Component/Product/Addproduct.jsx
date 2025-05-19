import React, { useEffect, useState } from 'react'
import Product_Topping from './Product_Topping'


import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../Base/Loading';
import useAuth from '../../../Login_Logout/CustomHook';


const Addproduct= () => {
  const [openTopping,setOpenTopping]=useState(false);
  //const [openSize,setOpenSize]=useState(false);
  
  const [product,setProduct]=useState({
    name:"",
    tag:"",
    price:null,
    priceDiscount:0,
    description:"",
    quantity:null,
    status:null,
    categoryId:"",
    toppings:[],
  })
  console.log(product);

  // Preview hinh anh
  const [imageUrl, setImageUrl] = useState([]);
  const [images, setImages] = useState([]);
  const handleImageChange = (event) => {
      const file = event.target.files; // Lấy file đầu tiên
      //console.log("File: ",file[0]);
      if (file.length>0) {
        const imageUrl =Array.from(file).map((item)=>URL.createObjectURL(item)) ; // Tạo URL tạm thời
        //const fileNames = Array.from(file).map(file => file);
        setImageUrl(imageUrl);// Lưu vào state để hiển thị
        setImages(Array.from(file));
        // console.log('Tên các ảnh:', fileNames);
      
      }
      };
      console.log('images: ', images);


  // Xóa ảnh  
    const removeImage = (index) => {
      setImageUrl((prev) => prev.filter((_, i) => i !== index)); // Xóa ảnh khỏi danh sách
      setImages((prev) => prev.filter((_, i) => i !== index)); 
    };

    const [loading,setLoading]=useState(false);
    const {getToken}=useAuth();

    const handleAdd=async (e)=>{
      e.preventDefault();
      setLoading(true); 
      const formData=new FormData();
      images.forEach((file) => {
        formData.append("images", file);
      });
      formData.append('productRequest',JSON.stringify(product));
      try{
        const postProduct=await axios.post('http://localhost:8080/api/v1/product',formData,{
          headers:{
            'Content-Type':'multipart/form-data',
            Authorization:`Bearer ${getToken()}`
          }
        });
      
        console.log('Add product success',postProduct.data);
        if(postProduct.status===200){
        toast.success('Thêm sản phẩm thành công');
        setProduct({
          name:"",
          price:0,
          description:"",
          quantity:0,
          tag:"",
          priceDiscount:0,
          status:null,
          categoryId:"",
          toppings:[],
     
        })
        setLoading(false);
        setImageUrl([]);
        setImages([]);
      }
        
      }catch(error){
        console.log('Add product failed',error);
      }
    }
const [danhmuc,setDanhMuc]=useState();
//get danh muc
const getDanhMuc=async()=>{
 const res= await axios.get("http://localhost:8080/api/v1/category");
 const kq=res.data.data;
 setDanhMuc(kq);
//  console.log(res.data.data);
}
useEffect(()=>{
  getDanhMuc()
},[])
console.log(danhmuc)

return (
  <div className='bg-green-100 w-[100%] mx-auto p-3 m-2 rounded '>
   <div className='h-8  text-center text-black font-bold  mb-4 border-b '>
    Trang thêm sản phẩm mới
   </div>
   <ToastContainer/>
   {loading&&(
     <div className="fixed inset-0 bg-white/60 z-50 flex justify-center items-center">
     <Loading />
   </div>
   )}
<form onSubmit={handleAdd}>
<div className='flex'>
  <div class="flex-1 p-2  mb-2.5 h-[70%] grid grid-cols-1 gap-y-1">
      <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Tên sản phẩm</label>
          <input value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[80%] p-2    " placeholder="Tên sản phẩm" required />
      </div>
       <div>
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Giá gốc</label>
          <input value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}  type="number" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[80%] p-2   " placeholder="Giá bán" required />
      </div>
       <div>
          <label for="priceDiscount" class="block mb-2 text-sm font-medium text-gray-900 ">Giam</label>
          <input value={product.priceDiscount} onChange={(e)=>setProduct({...product,priceDiscount:e.target.value})}  type="number" min={0} id="priceDiscount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[40%] p-2   " placeholder="Giảm (%)" required />
      </div>
      {/* <div>
          <label for="priceSell" class="block mb-2 text-sm font-medium text-gray-900 ">Giá bán</label>
          <input value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}  type="text" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[80%] p-2   " placeholder="Giá bán" required />
      </div> */}
      <div>
          <label for="soluong" class="block mb-2 text-sm font-medium text-gray-900 ">Số lượng</label>
          <input value={product.quantity}  onChange={(e)=>setProduct({...product,quantity:e.target.value})}  type="text" id="soluong" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[40%] p-2    " placeholder="Số lượng" required />
      </div>
      <div>
      <label for="danhmuc" class="block mb-2 text-sm font-medium text-gray-900 ">Danh mục</label>
      <select onChange={(e)=>setProduct({...product,categoryId:e.target.value})}  id="danhmuc" class="block mb-6 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50  focus:border-blue-500   w-[40%] p-2 ">
          <option selected>Chọn 1 danh mục</option>
          {danhmuc&&(
            danhmuc.map((item,index)=>
              <option key={index} value={item.id}>{item.name}</option>
            )
          )}
         
        
      </select>
      </div>
      <div>
          <label for="mota" class="block mb-2 text-sm font-medium text-gray-900 ">Mô tả sản phẩm</label>
          <textarea value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}  type="text" id="mota" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-[50%] p-2   " placeholder="Mô tả sản phẩm" required />
      </div>  
       <div>
          <label for="tag" class="block mb-2 text-sm font-medium text-gray-900 ">Tag</label>
          <input value={product.tag} onChange={(e)=>setProduct({...product,tag:e.target.value})} type="text" id="tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[30%] p-2    " placeholder="Tag" required />
      </div>
     
      <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">Trạng thái</label>
       <div className='border-gray-400 border w-46 p-2'>
       <table  className='w-42  '>
          <tr>
              <td>
                  Hiển thị sản phẩm
              </td>
              <td>
                  <input onChange={()=>setProduct({...product,status:true})} type="radio" name="status" className='text-green-600' />
              </td>
          </tr>
          <tr className='mt-2'>
              <td className='mr-2'>
                 Tắt hiển thị 
              </td>
              <td>
                  <input onChange={(e)=>setProduct({...product,status:false})} type="radio" name="status" className='text-red-500'/>
              </td>
             
             
          </tr>
       </table>
       </div>
       
      </div>
      
  </div>
 
  <div class="w-[45%] flex-col mb-3 h-auto gap-y-3">

  <div className='text-start w-full p-1 mb-3'>
      <buttton className='text-white p-2 rounded-lg bg-green-500 font-bold' onClick={()=>setOpenTopping(!openTopping)}>
      <i class="mr-2 fa-regular fa-square-plus"></i>
          Topping 
      </buttton>  
      {openTopping&& <Product_Topping product={product} setProduct={setProduct}/>}
  </div>



  <div className='text-start w-[32%] p-1'>
      {/* <buttton className=' p-2  rounded-lg bg-green-400' >Chọn hình ảnh </buttton>   */}

      <label for="uploadFile1"
    class=" flex bg-gray-500 mb-2  text-white text-base font-medium px-3 py-1 outline-none rounded w-max cursor-pointer ">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
      <path
        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
        data-original="#000000" />
      <path
        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
        data-original="#000000" />
    </svg>

    Upload Image
    <input type="file" multiple id='uploadFile1' class="hidden" onChange={handleImageChange}/>
  </label>
  <div className="flex gap-x-3">
      {imageUrl.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image}
            className="min-w-40 h-26 object-cover top-20 border "
          />
          <button
            className="absolute top-[-13px] right-[-10px] bg-red-300 text-white rounded-full px-2 py-1 text-sm"
            onClick={() => removeImage(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  

  </div>

  </div>
  </div>
  <button  onClick={handleAdd} type="submit" class=" text-white bg-blue-700 hover:bg-blue-800  font-bold rounded-lg text-sm w-full sm:w-auto px-3.5 py-2.5 text-center ">Thêm sản phẩm 🍔</button>
</form>

  </div>
)
}


export default Addproduct;
