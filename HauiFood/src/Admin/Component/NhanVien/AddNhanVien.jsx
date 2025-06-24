import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const AddNhanVien = ({setOpenAdd}) => {
     const [nhanvien,setNhanVien]=useState({
            fullName:"",
            username:"",
            password:"",
            email:"",
            phone:"",
            role:"ROLE_STAFF"
        });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNhanVien({ ...nhanvien, [name]: value });
    };    

  const dangKy=async(e)=>{
      e.preventDefault();
    try{
    const res=await axios.post(`http://localhost:8080/api/v1/user/register`,nhanvien);
    if(res.status==200){
      alert("Đăng ký thành công !! Vui lòng nhập mã xác nhận");
    }
    setOpenAdd(false);
    window.location.reload();
  }catch(error){
    toast.error("Có lỗi xảy ra trong quá trình đăng ký");
  }
  }      


  return (
   <div className=" fixed inset-0 bg-white/5 bg-opacity-30 flex items-center backdrop-blur-sm justify-center z-50">
    <ToastContainer/>
      <div className="bg-white p-6 rounded-xl w-[500px] relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Thêm nhân viên mới</h2>
        {/* Form thêm nhân viên ở đây */}
        <form action="" onSubmit={dangKy}>
            <p className='mb-1 font-semibold'>Nhập họ tên</p>
            <input type="text" name="fullName" onChange={handleChange} placeholder='Họ tên' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập tài khoản</p>
            <input type="text" name="username" onChange={handleChange} placeholder='Tài khoản' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập mật khẩu</p>
            <input type="text" name="password" onChange={handleChange} placeholder='Mật khẩu' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập email</p>
            <input type="email" name="email" onChange={handleChange} placeholder='Email' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập số điện thoại</p>
            <input type="text" name="phone" onChange={handleChange} placeholder='Số điện thoại' className='w-[80%] rounded' />
            <br></br>
            <button type='submit' className='bg-blue-400 p-2 rounded mt-3 w-[150px] font-semibold'>Thêm mới</button>
        </form>
        
        <button 
          onClick={() => setOpenAdd(false)} 
          className="font-bold text-xl absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default AddNhanVien
