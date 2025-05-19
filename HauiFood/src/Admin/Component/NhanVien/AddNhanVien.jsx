import React, { useState } from 'react'

const AddNhanVien = ({setOpenAdd}) => {
     const [nhanvien,setNhanVien]=useState({
            fullName:"",
            username:"",
            password:"",
            email:"",
            phone:"",
            role:"ROLE_STAFF"
        })
  return (
   <div className=" fixed inset-0 bg-white/5 bg-opacity-30 flex items-center backdrop-blur-sm justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Thêm nhân viên mới</h2>
        {/* Form thêm nhân viên ở đây */}
        <form action="">
            <p className='mb-1 font-semibold'>Nhập họ tên</p>
            <input type="text" placeholder='Họ tên' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập tài khoản</p>
            <input type="text" placeholder='Tài khoản' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập mật khẩu</p>
            <input type="text" placeholder='Mật khẩu' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập email</p>
            <input type="email" placeholder='Email' className='w-[80%] rounded' />
            <p className='mb-1 font-semibold'>Nhập số điện thoại</p>
            <input type="text" placeholder='Số điện thoại' className='w-[80%] rounded' />
            <br></br>
            <button className='bg-blue-400 p-2 rounded mt-3 w-[150px] font-semibold'>Thêm mới</button>
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
