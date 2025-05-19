import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import axios from "axios";
import DatePickerComponent from "./DatePicker";

// Đăng ký các thành phần bắt buộc
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DonHangThongKe = () => {

  const [year,setYear]=useState("2025");
  const [month,setMonth]=useState([]);
  const [huy,setHuy]=useState([]);
  const [hoantat,setHoanTat]=useState([]);

  const getThongKe=async()=>{
    try{
    const res=await axios.get(`http://localhost:8080/api/v1/order/thongkedonhang?year=${year}`);
    const data = res.data;

    // Sắp xếp theo tháng (nếu chưa sắp)
    data.sort((a, b) => a.month - b.month);

    // Tách dữ liệu
    const months = data.map(item => `Tháng ${item.month}`);
    const huyData = data.map(item => item.huy);
    const hoanTatData = data.map(item => item.hoantat);

    // Cập nhật state
    setMonth(months);
    setHuy(huyData);
    setHoanTat(hoanTatData);


    console.log(res);
    
    }catch(error){
      
      console.error(error);
    }
  }
  useEffect(()=>{
    getThongKe()
  },[year]);

 
const chartData = {
  //month
  labels: ["Tháng 1", "Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
    datasets: [
      {
        label: "Hoàn tất",
        data: [5,4,10,15,...hoantat],
        backgroundColor: "rgba(0, 255, 92, 1)",
      },
      {
        label: "Hủy",
        data: [1,0,0,3,...huy],
        backgroundColor: "rgba(255, 0, 0, 1)",
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
        x: {
            stacked: false, // Đảm bảo không chồng cột
          },
      y: {
        beginAtZero: true,
        stacked: false,
        ticks: {
          // ⚠️ Đảm bảo chỉ hiện số nguyên
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
          stepSize: 1, // Mỗi bước nhảy là 1
        }
      },
      
    },
  };

  return (
    <>
  <div className="float-right flex items-center">
      <p>Chọn năm</p>
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
   
    {month.length>0?(<Bar data={chartData} options={options} />):(<p>Chưa có dữ liệu phù hợp</p>)}
   
    
    
    </>
  ) 
};

export default DonHangThongKe;
