import React, { useEffect } from 'react'
import './workflow.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../redux/fetchdata'
import Allworkflow from '../../components/Cardallworkflow'
import { fetchData3 } from '../../redux/fetchsession'
const ALLworkflow = () => {
 const data=useSelector((item)=>item.data.ALLworkflow)
 const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchData())

  },[])
  return (
   <div style={{margin:"100px 0 60px 0"}}>
     <div className=' workflow'>
      <h1 style={{fontSize:"24px",color:"#443f3f"}}>Active Workflow</h1>
      



{console.log(data)}
        
    </div>
    {data.map((i)=>{
      return(<>
      <Allworkflow item={i}/>
      

      </>)
    })}
    
   
   </div>
  )
}

export default ALLworkflow