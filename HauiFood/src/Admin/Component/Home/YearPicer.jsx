import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const YearPicker = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <div className="flex flex-col items-center space-y-4">
   
      <div className="relative">
        {/* Year Picker */}
        <DatePicker
        minDate={new Date(2017,0,1)}
        maxDate={Date.now()}
          selected={selectedYear}
          onChange={(date) => setSelectedYear(date)}
          showYearPicker // Chỉ hiển thị phần chọn năm
          dateFormat="yyyy"
          className="w-28  p-1 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 border-blue-500 text-center"
          placeholderText="Chọn năm..."
        />
      </div>
    </div>
  );
};

export default YearPicker;
