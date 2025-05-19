import React from 'react'

const DateFormart = ({value}) => {
    function formatDateTime(value) {
      if(value==""){
        return "";
      }else{
        const date = new Date(value);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
        const year = date.getFullYear();
    
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      }
    }
  return (
    <>
      {formatDateTime(value)}
    </>
  )
}

export default DateFormart
