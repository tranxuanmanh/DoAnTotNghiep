import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div >
     
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date(2023,0,1)}
        maxDate={Date.now()}
        className="border border-blue-400 p-1 text-sm rounded-md shadow-sm w-40"
        placeholderText="Chọn ngày/tháng/năm ...."
      />
    </div>
  );
};

export default DatePickerComponent;
