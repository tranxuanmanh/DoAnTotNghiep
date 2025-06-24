import axios from "axios";
import React, { useEffect, useState } from "react";

//Thống kê doanh thu theo ngày, năm

const PieChart = () => {


  const [day,setDay]=useState("23-06-2025");
  const [year,setYear]=useState("2025");
  const [moneyDay,setMoneyDay]=useState(0);
  const [moneyYear,setMoneyYear]=useState(0);

    // Chuyển định dạng yyyy-MM-dd → dd-MM-yyyy
    const formatDateForAPI = (dateStr) => {
      const [yyyy, mm, dd] = dateStr.split("-");
      return `${dd}-${mm}-${yyyy}`;
    };
   
//Doanh thu theo ngay
  const getMoneyInDay=async()=>{
    try{
    const res=await axios.get(`http://localhost:8080/api/v1/order/doanhthuNgay?date=${formatDateForAPI(day)}`);
    const money1=res.data.data;
    setMoneyDay(money1);
   
    }catch(error){
    setMoneyDay(0);
    
    }
  }

//Doanh thu theo nam
    const getMoneyInYear=async()=>{
      try{
      const res=await axios.get(`http://localhost:8080/api/v1/order/doanhthuNam?nam=${year}`);
      const money2=res.data.data;
      setMoneyYear(money2);
     
      }catch(error){
      setMoneyYear(0);
     
      }
    }

    useEffect(()=>{
      getMoneyInDay()
      getMoneyInYear()
     
    },[day,year])

  return (
    <>

    <div className="w-[90%] flex justify-start px-4 ms-6 py-2 border text-center text-xl mt-3  rounded">
      <div className="flex-1/2">
        <label htmlFor="">Chọn ngày</label>
      <input  onChange={(e) => setDay(e.target.value)} type="date" value={day} className=" ms-3 rounded py-1" />
      </div>
      <div className="flex-1/2">
      <p>Doanh thu ngày {formatDateForAPI(day)}</p>
      <p className="font-bold text-green-400">+ {moneyDay.toLocaleString()} vnđ</p>
      </div>
     
    </div>


    <div className="w-[90%] flex justify-start px-4 ms-6 py-2 border text-center text-xl mt-3  rounded">
      <div className="flex-1/2">
        <label htmlFor="">Chọn năm</label>
        <select name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)} 
            className="ms-4 me-2 py-1 rounded" >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
    </select>
      </div>
      <div className="flex-1/2">
      <p>Doanh thu năm </p>
      <p className="font-bold text-green-400">+ {moneyYear.toLocaleString()} vnđ</p>
      </div>
     
    </div>
    
    
    
    </>
  );
};

export default PieChart;
