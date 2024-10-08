import React, { useState } from 'react'

import m1 from '../asssets/workflow.png'
import m2 from '../asssets/Status_Waiting_icon.png'
import { useDispatch } from 'react-redux'
import { viewworkflow } from '../redux/fetchdata'
import '../pages/workflow/workflow.css'
const Card4 = ({name,view}) => {
  return (
    <div  style={{width:"100%",padding:"10px",border:"1px solid rgb(182 155 155 / 41%)",margin:"5px 0",borderRadius:"5px"}} className='d-flex align-items-center justify-content-between '>
        <div className='d-flex align-items-center gap-4 w-70'>
        <img src={m1} width={25}/>
<h3 style={{fontSize:"14px"}}>{name}</h3>

        </div>
        <div>
{
  view?<div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>

<button className='btn-left' style={{backgroundColor:"#ffc107",marginBottom:"5px"}}>Edit</button>
<button className='btn-left' style={{backgroundColor:"#dc3545",color:"white"}}>Delete</button>






  </div>:<img src={m2} width={25}/>
}





        </div>




    </div>
  )
}

export default Card4