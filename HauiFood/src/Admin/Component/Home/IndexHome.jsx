import React from 'react'


import BarChart from './Chart1';
import LineChart from "./Chart2";

import PieChart from "./PieChar";
import BodyHeader from './BodyHeader';

import DonHangThongKe from './DonHangThongKe';
const Admin1 = () => {
  return (
  
       <div className="flex-1 p-6">
                {/* body header */}
                <BodyHeader></BodyHeader>
      
                <div className="flex bg-white p-1 w-full gap-x-2">
                  {/* Bieu do 1 */}
                  <div className="flex-1 rounded">
                    
                    <div className="flex justify-between mx-2">
                    <p className="font-bold text-blue-500">Top 5 sản phẩm bán chạy</p>
                    {/* <DatePickerComponent></DatePickerComponent>            */}
                    </div>           
                    <BarChart></BarChart>
                  </div>

                  <div className="flex-1  rounded">
                  <div className="flex justify-between mx-2">
                    <p className="font-bold text-blue-500">Thống kê doanh thu theo từng tháng</p>
                    
                            
                  </div>
                  <LineChart></LineChart>
                </div>
                
                </div>
                  {/* Bieu do 2 */}
                <div className="flex bg-white p-1 rounded-lg shadow-md w-full gap-x-2">
      
                <div className="flex-1 shadow-lg shadow-gray-300  rounded">
                    <div className="flex justify-between mx-2">
                    <p className="font-bold text-blue-500 mt-2">Thống kê đơn hàng</p>
                            
                    </div>           
                   <DonHangThongKe/>
                </div>
                
                {/* Them nen shadow */}
                <div className="flex-1  shadow-lg shadow-gray-300 rounded ">
                  <div className="flex justify-between mx-2 ">
                    <p className="font-bold text-blue-500">Thống kê doanh thu</p>
                           
                  </div>
                 <PieChart></PieChart>
                </div>
                </div>
              </div>

  )
}

export default Admin1
