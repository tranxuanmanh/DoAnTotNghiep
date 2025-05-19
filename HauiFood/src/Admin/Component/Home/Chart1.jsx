import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Đăng ký các thành phần bắt buộc
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [name,setName]=useState([]);
  const [soldQuantity,setSoldQuantity]=useState([]);
  const [filter,setFilter]=useState("today");

  const getTop5=async()=>{
    try{
    const res=await axios.get(`http://localhost:8080/api/v1/product/filter/top5?filter=${filter}`);
    console.log(res);
    const data=res.data;
     // Tách tên và số lượng bán
      const names = data.map(item => item.name);
      const quantities = data.map(item => item.sold_quantity);
    setName(names);
    setSoldQuantity(quantities);
    }catch(error){
      setName([])
      setSoldQuantity([])
      console.error(error);
    }
  }
  useEffect(()=>{
    getTop5()
  },[filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Dữ liệu biểu đồ
  const data = {
    labels: name,
    datasets: [
      {
        label: "Số lượng đã bán",
        data: soldQuantity,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
         
        ],
        borderWidth: 1,
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
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
   <div className="float-right me-4">
   <select
  className="rounded ms-2 p-1 px-4"
  name="dieukien"
  value={filter}
  onChange={(e) => handleFilterChange(e.target.value)}
>
  <option value="today">Hôm nay</option>
  <option value="yesterday">Hôm qua</option>
  <option value="this_month">Tháng này</option>
  <option value="last_month">Tháng trước</option>
  <option value="this_year">Năm nay</option>
  <option value="last_year">Năm ngoái</option>
</select>
   </div>
   {
    name.length>0?( <Bar data={data} options={options} />):(<p>Chưa có dữ liệu phù hợp</p>)
   }
    
    
    </>
  ) 
};

export default BarChart;
