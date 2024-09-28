import React from 'react'
import '../pages/allworkflow/workflow.css'
import { Link } from 'react-router-dom'
const Cardworkflow = ({item}) => {
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
  

  return (
    <div className=' workflow'>
      
     <div className='right'>
<div>{  
  console.log(item)}
<p>name:</p>
<strong>{item.name}</strong>

</div>
<div>
<p>Owner:</p>
<strong>{item.owner.nickname}</strong>

</div>
<div>
<p>created:{formattedDate}</p>
<p>Updated:{item.updated_at}</p>


</div>



     </div>
     <div className='left'>
     <Link to={`/${item.UUID}`} className={"btn btn-success mx-4"}  >Diagram</Link>

     </div>





        
    </div>
  )
}

export default Cardworkflow