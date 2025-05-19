import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../Login_Logout/CustomHook';
const UpdateSale = ({open,id}) => {
    const [voucher,setVoucher]=useState({
    description:"",
    minOrder:null,
    quantity:null,
    discount:null,
    startDate:null,
    endDate:null,
    voucherStatus:null
    })
    console.log({id})
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "startDate" || name === "endDate") {
            formattedValue = formatDateTime(value); // Chuyển thành dd-MM-yyyy HH:mm:ss
        }
        setVoucher(prev => ({
          ...prev,
          [name]: formattedValue
        }));
      };

      const validate = () => {
        const newErrors = {};
        if (!voucher.description.trim()) newErrors.description = "Mô tả không được để trống";
        if (!voucher.minOrder) newErrors.minOrder = "Đơn hàng tối thiểu không được để trống";
        if (!voucher.discount) newErrors.discount = "Số tiền giảm không được để trống";
        if (!voucher.startDate) newErrors.startDate = "Vui lòng chọn ngày bắt đầu";
        if (!voucher.endDate) newErrors.endDate = "Vui lòng chọn ngày kết thúc";
    
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
      const convertToInputDateFormat = (dateStr) => {
        if (!dateStr) return '';
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('-');
        const [hour, minute] = timePart?.split(':');
      
        return `${year}-${month}-${day}T${hour}:${minute}:00`;
      };
    
      //Lấy 1 mã khuyến mãi theo id
      const getVoucherById=async()=>{
        try{
            const res=await axios.get(`http://localhost:8080/api/v1/voucher/${id}`);
            console.log(res.data.data)
            const kq=res.data.data;
            setVoucher(kq)
            
        }catch(error){
            alert("Xay ra loi khi lay du lieu")
        }
      }
      useEffect(()=>{
            getVoucherById()
      },[id])
      console.log(voucher)


      const {getToken}=useAuth();
      const updateVoucher=async()=>{
        const dataToSend = {
            ...voucher,
            minOrder:Number(voucher.minOrder),
            discount:Number(voucher.discount),
            quantity:Number(voucher.quantity),
            startDate: voucher.startDate,
            endDate: voucher.endDate,
            voucherStatus:voucher.voucherStatus
          };
          console.log(dataToSend)
        try{
        await axios.put(`http://localhost:8080/api/v1/voucher/${id}`,dataToSend,{
          headers:{
            Authorization:`Bearer ${getToken()}`
          }
        });
        toast.success("Cập nhật thành công mã khuyến mãi",{autoClose:2000});
        setTimeout(()=>{
         open(false);
        window.location.reload();
       },3000);
        }catch(error){
          toast.error("Có lỗi khi cập nhật",{autoClose:2000});
        }
      }
    

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;


        updateVoucher();
        // Gửi dữ liệu nếu hợp lệ
        console.log("Dữ liệu hợp lệ:", voucher);
      };
    
  return (
    <div>
       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
       <ToastContainer/>
    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
        

      <h2 className="text-xl font-bold mb-4">Cập nhật mã khuyến mãi</h2>
      <button
      onClick={() => open(false)}
      className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-600"
    >
      X
    </button>
      {/* Form đơn giản */}
       <form onSubmit={handleSubmit} className="space-y-2">
     

        <label htmlFor="" className='font-semibold'>Đơn hàng tối thiểu áp dụng</label>
        <input value={voucher?.minOrder} type="number"  onChange={handleChange} name="minOrder" placeholder="Đơn hàng tối thiểu áp dụng" className="w-full p-2 border rounded" />
        {errors.minOrder && <p className="text-red-500 text-sm">{errors.minOrder}</p>}
        <label htmlFor="" className='font-semibold'>Số tiền giảm</label>
        <input value={voucher?.discount} type="number" onChange={handleChange} name="discount" placeholder="Số tiền giảm" className="w-full p-2 border rounded" />
        <label htmlFor="" className='font-semibold'>Số lượng</label>
        <input value={voucher?.quantity} type="number" onChange={handleChange} name="quantity" placeholder="Số lượng" className="w-full p-2 border rounded" />
        
        {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
        <label htmlFor="" className='font-semibold'>Ngày bắt đầu</label>
        <input value={convertToInputDateFormat(voucher?.startDate)} type="datetime-local" onChange={handleChange} name="startDate" placeholder='Ngày bắt đầu' className="w-full p-2 border rounded"/>
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        <label htmlFor="" className='font-semibold'>Ngày kết thúc</label>
        <input value={convertToInputDateFormat(voucher?.endDate)} type="datetime-local" onChange={handleChange} name="endDate" placeholder='Ngày kết thúc' className="w-full p-2 border rounded"/>
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
        <label htmlFor="" className='font-semibold'>Nhập mô tả</label>
        <input type="text" value={voucher?.description} onChange={handleChange} name="description" placeholder="Nhập mô tả" className="w-full p-2 border rounded" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        {/* <label htmlFor="" className='font-semibold'>Trạng thái</label>
        <br></br>
        Hoạt động <input checked={voucher.voucherStatus === true || voucher.voucherStatus === 'true'}  type="radio" name="voucherStatus" value="true" className='me-5'  onChange={handleChange} />
        Tắt <input checked={voucher.voucherStatus === false || voucher.voucherStatus === 'false'}  type="radio" name="voucherStatus" value="false"  onChange={handleChange}  /> */}
        <br></br>
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold mt-3">Cập nhật</button>
      
      </form>

      {/* Nút đóng */}
     
    </div>
  </div>
      
    </div>
  )
}

export default UpdateSale
