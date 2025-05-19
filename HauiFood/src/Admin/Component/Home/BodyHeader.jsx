import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BodyHeader = () => {

  const [day,setDay]=useState(new Date()+1);
  const [moneyDay,setMoneyDay]=useState(0);

  const [hoantat,setHoanTat]=useState(0);
  const [huy,setHuy]=useState(0);
  const [xacNhan,setXacNhan]=useState(0);

 //So don hang hoan thanh
 const countByHoanTat=async()=>{
  try{
  const res=await axios.get(`http://localhost:8080/api/v1/order/count-by/HOANTAT`);
  const tong=res.data;
  setHoanTat(tong);
  console.log({res})
  }catch(error){
  setHoanTat(0);
  //console.log(error);
  }
}

 //So don hang bi huy
 const countByHuy=async()=>{
  try{
  const res=await axios.get(`http://localhost:8080/api/v1/order/count-by/HUY`);
  const tong=res.data;
  setHuy(tong);
  
  }catch(error){
  setHuy(0);
  //console.log(error);
  }
}
//So don hang cho xac nhan
const countByXacNhan=async()=>{
  try{
  const res=await axios.get(`http://localhost:8080/api/v1/order/count-by/CHOXULY`);
  const tong=res.data;
  setXacNhan(tong);
 
  }catch(error){
  setXacNhan(0);
  //console.log(error);
  }
}







     // Chuyển định dạng yyyy-MM-dd → dd-MM-yyyy
     const formatDateForAPI = (dateStr) => {
      const [yyyy, mm, dd] = dateStr.split("-");
      return `${dd}-${mm}-${yyyy}`;
    };

    useEffect(() => {
      const today = new Date();
      const formattedDate = formatDateForAPI(today.toLocaleDateString('en-CA')); // "yyyy-MM-dd"
      setDay(formattedDate);

      //Fetch du lieu
      countByHoanTat();
      countByHuy();
      countByXacNhan();
    }, []);

  //Doanh thu theo ngay
    const getMoneyInDay=async()=>{
      try{
      const res=await axios.get(`http://localhost:8080/api/v1/order/doanhthuNgay?date=${day}`);
      const money1=res.data.data;
      setMoneyDay(money1);
      //console.log({res})
      }catch(error){
      setMoneyDay(0);
      //console.log(error);
      }
    }

    useEffect(()=>{
      getMoneyInDay();
      
    },[day])
    console.log({day})
  return (
    <div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <i class="fa-brands fa-apple  text-2xl  p-3 rounded"></i>
              <p className="text-lg font-semibold">Thu nhập hôm nay</p>
              <p className="text-green-500 text-lg font-bold">+ {moneyDay.toLocaleString()} vnđ</p>
              {/* <p className="text-green-500">Manh</p> */}
            </div>

            <div className="bg-red-300 p-4 rounded-lg shadow-md">         
             <i class="fa-regular fa-envelope text-2xl  p-3 rounded"></i>
              <p className="text-lg font-semibold">Chờ xác nhận</p>
              <p className="text-red-500 font-bold text-lg">{xacNhan} đơn hàng</p>
              {/* <p className="text-red-500">-9.05% so với hôm qua</p> */}
            </div>

            <div className="bg-blue-300 p-4 rounded-lg shadow-md ">
            <i class="fa-solid fa-truck text-2xl   p-3 rounded "></i>
              <p className="text-lg font-semibold">Đã hoàn thành</p>
              <p className="text-blue-600 text-lg font-bold">{hoantat} đơn hàng</p>
            </div>
            
            <div className="bg-orange-200 p-4 rounded-lg shadow-md">
              <i class="fa-regular fa-circle-xmark text-2xl p-3 rounded"></i>
              <p className="text-lg font-semibold">Bị hủy</p>
              <p className="text-lg font-bold">{huy} đơn hàng</p>
             
            </div>
          </div>
    </div>
  )
}

export default BodyHeader
 