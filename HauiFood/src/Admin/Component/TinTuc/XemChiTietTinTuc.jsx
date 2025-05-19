import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DateFormart from '../Base/DateFormart';

const XemChiTietTinTuc = () => {
    const {id}=useParams();
    const [dulieu,setDulieu]=useState();
    const getChiTiet=async()=>{
        const res=await axios.get(`http://localhost:8080/api/v1/news/${id}`);
        console.log(res.data.data);
        setDulieu(res.data.data);
    }
    useEffect(()=>{
        getChiTiet();
    },[id])
  return (
    <>
    <div className='w-full mt-2 h-auto'>
        <p className='text-center font-semibold text-xl'>{dulieu?.title}</p>
        <p className='ms-10 text-gray-500'>
            Ngày đăng: {<DateFormart value={dulieu?.createdAt}/>}
        </p>
        <p className='ms-10 text-gray-500'>
            Người viết: {dulieu?.userName}
        </p>
    </div>
    <p className='ms-10 font-bold text-xl text-red-500 py-2  px-2 border-b'>Nội dung bài viết</p>
    <div className='ms-20' dangerouslySetInnerHTML={{ __html: dulieu?.content }} />
    </>
    
  )
}

export default XemChiTietTinTuc
