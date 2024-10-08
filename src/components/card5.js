import React from 'react'
import m1 from '../asssets/Action.png'

const Card5 = ({name,Descreption,view}) => {
  return (
    <div style={{width:"100%",padding:"7px",boxShadow:" 0 0px 8px rgba(0, 0, 0, 0.2)",margin:"5px",borderRadius:"10px"}} >
    <h5>Instraction:</h5>
    <p>name:{name}</p>
    <p>Descreption:{Descreption}</p>
    <img src={m1} width={200}/>
    
    {view? <div style={{fontSize:"13px"}} className='btn btn-warning p-2 w-100'>Edit</div>:<div className='d-hidden'></div> }
    
    </div>
  )
}

export default Card5