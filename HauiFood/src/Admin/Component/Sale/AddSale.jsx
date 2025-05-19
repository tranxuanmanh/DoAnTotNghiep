import axios from 'axios';
import React, { useState } from 'react'
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';

const AddSale = ({open}) => {
    const [voucher,setVoucher]=useState({
    description:"",
    minOrder:null,
    quantity:null,
    discount:null,
    startDate:null,
    endDate:null
    })
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher(prev => ({
          ...prev,
          [name]: value
        }));
      };

      const validate = () => {
        const newErrors = {};
        if (!voucher.description.trim()) newErrors.description = "Mô tả không được để trống";
        if (!voucher.minOrder) newErrors.minOrder = "Đơn hàng tối thiểu không được để trống";
        if (!voucher.discount) newErrors.discount = "Số tiền giảm không được để trống";
        if (!voucher.startDate) newErrors.startDate = "Vui lòng chọn ngày bắt đầu";
        if (!voucher.endDate) newErrors.endDate = "Vui lòng chọn ngày kết thúc";
        if (!voucher.quantity) newErrors.quantity = "Vui lòng nhập số lượng";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = '00'; // hoặc lấy từ date.getSeconds()
        return `${dd}-${MM}-${yyyy} ${hh}:${mm}:${ss}`;
      };
    
      const {getToken}=useAuth();
      const addVoucher=async()=>{
        const dataToSend = {
            ...voucher,
            minOrder:Number(voucher.minOrder),
            discount:Number(voucher.discount),
            quantity:Number(voucher.quantity),
            startDate: formatDateTime(voucher.startDate),
            endDate: formatDateTime(voucher.endDate),
          };
          console.log(dataToSend)
        try{
        await axios.post("http://localhost:8080/api/v1/voucher",dataToSend,{
          headers:{
            Authorization:`Bearer ${getToken()}`
          }
        });
        toast.success("Thêm thành công mã khuyến mãi",{autoClose:2000});
        open(false);
        window.location.reload();
        }catch(error){
            toast.error(error,{autoClose:2000});
        }
      }
    

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;


        addVoucher();
        // Gửi dữ liệu nếu hợp lệ
        console.log("Dữ liệu hợp lệ:", voucher);
      };
    
  return (
    <div>
       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
       <ToastContainer/>
    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
        

      <h2 className="text-xl font-bold mb-4">Thêm mã khuyến mãi</h2>
      <button
      onClick={() => open(false)}
      className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-600"
    >
      X
    </button>
      {/* Form đơn giản */}
       <form onSubmit={handleSubmit} className="space-y-2">
     

        <label  className='font-semibold'>Đơn hàng tối thiểu áp dụng</label>
        <input type="number" onChange={handleChange} name="minOrder" placeholder="Đơn hàng tối thiểu áp dụng" className="w-full p-2 border rounded" />
        {errors.minOrder && <p className="text-red-500 text-sm">{errors.minOrder}</p>}
        <label className='font-semibold'>Số tiền giảm</label>
        <input type="number" onChange={handleChange} name="discount" placeholder="Số tiền giảm" className="w-full p-2 border rounded" />
        {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
        
         <label  className='font-semibold'>Số lượng</label>
        <input type="number" onChange={handleChange} name="quantity" placeholder="Số lượng" className="w-full p-2 border rounded" />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        
        
        
        <label  className='font-semibold'>Ngày bắt đầu</label>
        <input type="datetime-local" onChange={handleChange} name="startDate" placeholder='Ngày bắt đầu' className="w-full p-2 border rounded"/>
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        <label  className='font-semibold'>Ngày kết thúc</label>
        <input type="datetime-local" onChange={handleChange} name="endDate" placeholder='Ngày kết thúc' className="w-full p-2 border rounded"/>
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
        <label  className='font-semibold'>Nhập mô tả</label>
        <input type="text" onChange={handleChange} name="description" placeholder="Nhập mô tả" className="w-full p-2 border rounded" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
      
      </form>

      {/* Nút đóng */}
     
    </div>
  </div>
      
    </div>
  )
}

export default AddSale
