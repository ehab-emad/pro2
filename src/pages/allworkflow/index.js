import React from 'react'
import './workflow.css'
import Cardworkflow from '../../components/cardworkflow'
import { useSelector } from 'react-redux'
const ALLworkflow = () => {
 const data=useSelector((item)=>item.data.ALLworkflow)

  return (
   <div style={{margin:"100px 0 60px 0"}}>
     <div className=' workflow'>
      <h1 style={{fontSize:"24px",color:"#443f3f"}}>Active Workflow</h1>
      





        
    </div>
    {data.map((i)=>{
      return(<>
      <Cardworkflow item={i}/>
      
      
      {/* {console.log(i)} */}
      </>)
    })}
    
   
   </div>
  )
}

export default ALLworkflow