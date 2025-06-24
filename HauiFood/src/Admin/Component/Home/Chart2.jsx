import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

//Thống kê doanh thu từng năm
// Đăng ký các thành phần cần thiết
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
  const [month, setMonth] = useState([]);
  const [tien, setTien] = useState([]);
  const [year,setYear]=useState("2025");
  const getDoanhTheoNam=async()=>{
    try{
    const res=await axios.get(`http://localhost:8080/api/v1/order/doanhthuthang?year=${year}`);
    const data=res.data;
    setMonth(data.map(item =>"Tháng "+ item.month));
    setTien(data.map(item => item.total ));
    console.log({month,tien});
    }catch(error){
      setMonth([])
      setTien([])
      console.log(error);
    }
  }
  useEffect(()=>{
    getDoanhTheoNam()
  },[year])
  // Dữ liệu biểu đồ
  const data = {

    //Month
    labels: ["Tháng 1", "Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
    datasets: [
      {
        label: "Doanh thu ",
        data: [0,0,0,0,...tien],
        borderColor: "rgba(75, 192, 192, 1)", // Màu đường
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền (fill)
        tension: 0.4, // Độ cong của đường
        pointRadius: 5, // Kích thước điểm dữ liệu
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }, // Hiển thị chú thích
      tooltip: { enabled: true }, // Bật tooltip khi hover
    },
    scales: {
      y: {
        beginAtZero: true,
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
    
    
   {month.length>0?( <Line data={data} options={options} />):(<p>Chưa có dữ liệu phù hợp</p>)}
    </>
  )
  
 
};

export default LineChart;
