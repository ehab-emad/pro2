import React from 'react'
import './card2.css'
const Cardproject = ({img,name,number,owner}) => {
  return (
    <div className='card-style'>
        <h3>Current Project</h3>
    <img className='img-style' src={img}/>
  <div className='content'>  <div style={{padding:"0 20px"}}><h2 className='heading-style'>Name:</h2>
    <p>{name}</p></div>
    <div style={{padding:"0 20px"}}><h2 className='heading-style'>Number:</h2>
    <p>{number}</p></div>
    <div style={{padding:"0 20px"}}><h2 className='heading-style'>Owner</h2>
    <p>{owner}</p></div></div>
    <div className='content-btn'>
    <button className='btn btn-warning'>Edit</button>
    <button className='btn btn-warning'>User Authorisations</button>
    <button className='btn btn-warning'>Change Project</button>

    
    </div>
    
    
    
    
    
        </div>
  )
}

export default Cardproject