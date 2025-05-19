import React, { useEffect, useState } from 'react'
import TinTucItem from './TinTucItem'
import axios from 'axios';

const TinTucIndex = () => {
    const [tintuc,setTinTuc]=useState([]);
    const getAllTinTuc=async()=>{
        try{
        const res=await axios.get(`http://localhost:8080/api/v1/news/all`);
        const ketqua=res.data.data;
        setTinTuc(ketqua||[]);
        console.log(ketqua)
        }catch(error){
            setTinTuc([]);
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllTinTuc();
    },[])
  return (
    <div className='h-[600px]'>
    <div className=' w-full mt-2 mb-2 text-center'>
        <p className='font-bold'>Danh sách tin tức</p>
    </div>
    
   
    <div className='flex gap-x-2 gap-y-3 flex-wrap w-full p-4 '>
        {tintuc.length>0&&(
            tintuc.map((item,index)=> {
                if(item.status){
                    return (
                    <TinTucItem key={index} news={item}/>
                    )
                }
            })
        )}

      
    
    </div>
    </div>
  )
}

export default TinTucIndex
