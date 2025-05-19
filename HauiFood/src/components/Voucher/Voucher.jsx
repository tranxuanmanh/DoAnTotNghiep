import React, { useEffect, useRef, useState } from 'react'
import ItemVoucher from './ItemVoucher'
import axios from 'axios';
import { div } from 'framer-motion/client';
import useAuth from '../../Login_Logout/CustomHook';
import { useNavigate } from 'react-router';

const Voucher = () => {
  // const navigate=useNavigate();
  // const alertedRef = useRef(false);
    const[voucher,setVoucher]=useState(null);
    const [filteredVoucher, setFilteredVoucher] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [voucherCode,setVoucherCode]=useState("");
    //Lấy token từ đăng nhập
    const {getToken,isLoggedIn}=useAuth();
    console.log(isLoggedIn)
  
    const token=getToken();
    console.log({token});

    const handleClick = (id) => {
      setActiveId((prev) => (prev === id ? null : id));
    };

  
    const getAllVocher=async()=>{
    
        try{
        const res=await axios.get("http://localhost:8080/api/v1/voucher/all");
       
            setVoucher(res.data.data);
            console.log(res.data.data)
            setFilteredVoucher(res.data.data.filter(item=>item.voucherStatus=="DANGHOATDONG"));
            // console.log(res.data.data);
       
        }catch(error){
            setVoucher([]);
            console.log("Có lỗi xảy ra:", error);
          }
        
    }
    useEffect(()=>{
        getAllVocher();
    },[])

    const handleValue=(e)=>{
        setVoucherCode(e.target.value);
    }
    useEffect(() => {
        if (voucherCode.trim() === "") {
          getAllVocher(); // gọi lại API nếu input rỗng
        }
      }, [voucherCode]);
    const handleSearch = () => {
        const result = voucher.filter(v =>
          v.voucherCode.toLowerCase().includes(voucherCode.toLowerCase())
        );
        setFilteredVoucher(result);
      };
    console.log(voucherCode)
  return (
    <>
    <div className='w-[100%] text-center mt-3 font-semibold '>Danh sách mã khuyến mãi</div>
    <div className="mx-5 my-3 relative w-[25%] ">
  <input
    onChange={handleValue}
    type="text"
    placeholder="Nhập mã giảm giá muốn tìm..."
    className="border w-full rounded-xl p-2 pr-10" // thêm pr-10 để tránh icon đè chữ
  />
  <button
    onClick={handleSearch}
    className=" cursor-pointer  absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
  >
    <i class="fa-solid fa-magnifying-glass"></i>
  </button>
</div>
    
    <div className='m-5 flex justify-start w-[100%] flex-wrap gap-x-2 sm:flex-col md:flex-row'>
        {
            filteredVoucher?.length>0?(
                filteredVoucher.map((item,index)=> <ItemVoucher key={index} item={item}  activeId={activeId} handleClick={handleClick}/>)
            ):(<p>Chưa có mã voucher nào </p>)
        }
  


     
    </div>
    </>
  
  )
}

export default Voucher
