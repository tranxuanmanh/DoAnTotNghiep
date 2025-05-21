import React from 'react'
import { useNavigate } from 'react-router'
import DateFormart from '../../Admin/Component/Base/DateFormart';

const TinTucItem = ({news}) => {
    const navigate=useNavigate();
  return (
    <div className='flex gap-x-3 bg-white rounded shadow-lg p-2 w-[470px] '>
        <img className='w-36 h-30 rounded' src={`http://localhost:8080${news?.thumbnail}`} alt="hinh anh" />
        <div className='flex flex-col justify-between'>
           <div>
           <p className='font-semibold'>{news?.title}</p>
          
           </div>
          <div>
          <p className='text-sm'>Ngày đăng: {<DateFormart value={news.createdAt}/>}</p>
          <p className='text-gray-500 text-sm'>Đăng bởi : {news.userName}</p>
          </div>
        </div>
        <div className='flex flex-col flex-1 items-end justify-end '>
            <button onClick={()=>navigate(`/chi-tiet-tin-tuc/${news?.id}`)} className='border px-2 py-1 bg-blue-400 font-semibold text-white  rounded cursor-pointer w-[100px]'>Xem ngay </button>
        </div>
      </div>
  )
}

export default TinTucItem
