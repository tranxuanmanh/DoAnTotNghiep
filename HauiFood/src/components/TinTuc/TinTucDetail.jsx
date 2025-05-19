


import axios from 'axios';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import DateFormart from '../../Admin/Component/Base/DateFormart';

const TinTucDetail = () => {
    const {id}=useParams();
    const [detail,setDetail]=useState({});

    const getNewDetail=async()=>{
      const res=await axios.get(`http://localhost:8080/api/v1/news/${id}`);
      console.log(res.data.data);
      setDetail(res.data.data);
    }
    useEffect(()=>{
      getNewDetail()
    },[])

  return (
    <div>
      <div className='ms-20 w-[80%] mt-4 p-3 min-h-[800px]'>
       <div>
        <p className='font-bold text-lg'>{detail.title}</p>
       <div className='flex gap-x-10'>
        <p className='text-red-500 '>Đăng bởi : {detail.userName}</p>
        <p className='text-red-500 '>Thời gian: {<DateFormart value={detail.createdAt}/>}</p>
       </div>
       <div>
        <img className='h-80 rounded mx-auto mt-3' src={`http://localhost:8080${detail.thumbnail}`} alt="" />
       </div>
       <div>
        <p className='mt-2 font-bold '>Nội dung bài viết</p>
         <div  dangerouslySetInnerHTML={{ __html: detail?.content }} />
       </div>
       </div>
        <div>
     
       
      
        </div>

    
      
      </div>
    
    </div>
  )
}

export default TinTucDetail
