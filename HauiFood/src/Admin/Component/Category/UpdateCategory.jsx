import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../Login_Logout/CustomHook';

const UpdateCategory = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    console.log(id);
    const [categoryUp,setCategoryUp]=useState({});
    const [category,setCategory]=useState({
        name:"",
        description:"",
        status:null,
        images:""
        
      });

      const [previewImage, setPreviewImage] = useState(null);
    
    useEffect(()=>{
        const getCategoryById=async()=>{
            const kq=await axios.get(`http://localhost:8080/api/v1/category/${id}`);
            setCategoryUp(kq.data.data);
        }
        getCategoryById();
    },[])

    useEffect(() => {
        if (categoryUp) {
          setCategory({
            name: categoryUp.name || "",
            description: categoryUp.description || "",
            status: categoryUp.status ?? true,
            images: categoryUp.images || ""
          });
        }
      }, [categoryUp]);
    console.log(categoryUp);
    

    const {getToken}=useAuth();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryData", JSON.stringify({
      name: category.name,
      description: category.description,
      status: category.status
    }));
  
    if (category.images instanceof File) {
      formData.append("image", category.images);
    }
    try{
   const response= await axios.put(`http://localhost:8080/api/v1/category/${id}`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${getToken()}`
      },
      });
        //console.log(response)
     if(response.status===200){
          toast.success("Cập nhật danh mục thành công",{autoClose:2000})
          console.log(response);
    }
  }catch(error){
    console.log(error);
    const loi=error.response.data.status;
        if(loi==403){
          toast.error("Đăng nhập để thực hiện",{autoClose:2000})
        }else if(loi==500){
          toast.error("Token ko hợp lệ",{autoClose:2000})
        }else{
          toast.error("Danh mục đã tồn tại");
        }
  }
   
  }
  console.log(category)
  return (
    <div className='w-[97%] h-full bg-teal-300 p-2 m-4 rounded'>
      <ToastContainer/>
     <form onSubmit={handleSubmit} >
<div className='flex '>
  <div class="w-[60%] p-2  mb-2.5 h-[70%] grid grid-cols-1 gap-y-1 " >
      <div>
          <label for="name" class="block mb-2 text-lg font-medium text-white">Tên danh muc</label>
          <input value={category.name} onChange={(e)=>setCategory({...category,name:e.target.value})}  type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:border-blue-500 block w-[80%] p-2    " placeholder="Tên danh muc" required />
      </div>
   
    
      <div>
          <label for="mota" class="block mb-2 text-lg font-medium text-white ">Mô tả </label>
          <textarea value={category.description} onChange={(e)=>setCategory({...category,description:e.target.value})}   type="text" id="mota" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-[80%] p-2   " placeholder="Mô tả" required />
      </div>  
     
      <div>
          <label for="website" class="block mb-2 text-lg font-medium text-white ">Trạng thái</label>
       <div className='border-blue-700 border w-46 p-2'>
       <table  className='w-42  '>
          <tr>
              <td>
                 Active
              </td>
              <td>
                  <input
                    value={true}
                    checked={category.status === true}
                    onChange={()=>setCategory({...category,status:true})} type="radio" name="status" className='text-green-600' />
              </td>
          </tr>
          <tr className='mt-2'>
              <td className='mr-2'>
                 Inactive
              </td>
              <td>
                  <input
                   value={false}
                   checked={category.status === false}
                  onChange={()=>setCategory({...category,status:false})} type="radio" name="status" className='text-red-500'/>
              </td>
             
             
          </tr>
       </table>
       </div>
       
      </div>


      <div>
          <label for="mota" class="block mb-2 text-lg font-medium text-white ">Hình ảnh </label>
          <img src={
                    previewImage
                      ? previewImage
                      : category.images?.startsWith('https')
                      ? category.images
                      : `http://localhost:8080${category.images}`
                  } className='h-30 rounded' alt="" />
          <input
            type="file"
            className="mt-3 rounded"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setCategory({ ...category, images: file });
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
/>
      </div>  

      <div className='text-start w-[32%] p-1 mt-3'>
    



</div>
  </div>
 
  
  </div>
  <button  type="submit" class=" text-white bg-blue-700 hover:bg-blue-800  font-bold rounded-lg text-sm w-full sm:w-auto px-3.5 py-2.5 text-center ">Cập nhật danh mục</button>
 
  </form>
   <button onClick={()=>navigate("/admin/category-manager")} type="submit" class="mt-2  text-white bg-yellow-500 hover:bg-blue-800  font-bold rounded-lg text-sm w-30 px-3.5 py-2.5 text-center ">Hủy</button>
    </div>
  )
}

export default UpdateCategory
