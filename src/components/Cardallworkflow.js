import React, { useEffect } from 'react'
import '../pages/allworkflow/workflow.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { viewworkflow } from '../redux/fetchdata';
import { ok } from '../redux/fetchflowwork';
import Cardsession from './cardsession';
import { fetchData3 } from '../redux/fetchsession';
const Allworkflow = ({item}) => {

 

  const dateString = item.updated_at; // التاريخ المدخل
  const date = new Date(dateString); // تحويل السلسلة إلى كائن Date
  
  // خيارات للحصول على اسم الشهر
  const monthOptions = { month: 'long' };
  const monthName = date.toLocaleString('EG', monthOptions); // الحصول على اسم الشهر باللغة العربية
  
  // تنسيق التاريخ بشكل كامل مع الأرقام
  const year = date.getFullYear(); // السنة
  const day = date.getDate(); // اليوم
  const hours = String(date.getHours()).padStart(2, '0'); // الساعة مع إضافة صفر في البداية إذا لزم الأمر
  const minutes = String(date.getMinutes()).padStart(2, '0'); // الدقيقة مع إضافة صفر في البداية إذا لزم الأمر
  const seconds = String(date.getSeconds()).padStart(2, '0'); // الثانية مع إضافة صفر في البداية إذا لزم الأمر
  
  // تجميع التاريخ بالصيغة المطلوبة
  const formattedDate = `${day} ${monthName} ${year}، ${hours}:${minutes}:${seconds}`;
 // سيطبع: "30 أبريل 2024، 15:25:10"
  






 const dateString1 = item.created_at; // التاريخ المدخل
  const date1 = new Date(dateString1); // تحويل السلسلة إلى كائن Date
  
  // خيارات للحصول على اسم الشهر
  const monthOptions1 = { month: 'long' };
  const monthName1 = date.toLocaleString('EG', monthOptions1); // الحصول على اسم الشهر باللغة العربية
  const dispatch=useDispatch()
  // تنسيق التاريخ بشكل كامل مع الأرقام
  const year1 = date1.getFullYear(); // السنة
  const day1 = date1.getDate(); // اليوم
  const hours1 = String(date1.getHours()).padStart(2, '0'); // الساعة مع إضافة صفر في البداية إذا لزم الأمر
  const minutes1 = String(date1.getMinutes()).padStart(2, '0'); // الدقيقة مع إضافة صفر في البداية إذا لزم الأمر
  const seconds1 = String(date1.getSeconds()).padStart(2, '0'); // الثانية مع إضافة صفر في البداية إذا لزم الأمر
  
  // تجميع التاريخ بالصيغة المطلوبة
  const formattedDate1 = `${day1} ${monthName1} ${year1}، ${hours1}:${minutes1}:${seconds1}`;
 // سيطبع: "30 أبريل 2024، 15:25:10"
  

 
  return (

    <div className=' workflow'>
      
    <div className='right'>
<div>
<p>name:</p>
<strong>{item.name}</strong>

</div>
{/* {console.log(item)} */}
<div>
{/* <p>Owner:</p> */}
{/* <strong>{item.owner.nickname}</strong> */}

</div>
<div>
{/* <p>created:{formattedDate1}</p> */}
{/* <p>Updated:{formattedDate}</p> */}


</div>



    </div>
    <div className='left'>
    <Link to={`/digram/${item.UUID}/`} className={"btn btn-success mx-4"}  >Diagram</Link>
    {/* <Link to={`/workflow/${item.UUID}/`} className={"btn btn-success mx-4"}  >configre</Link>
    <Link to={`/workflow/${item.UUID}/`} onClick={()=>dispatch(ok)} className={"btn btn-success mx-4"}  >configre</Link> */}

    </div>





       
   </div>


  )
}

export default Allworkflow