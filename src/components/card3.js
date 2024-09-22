import React from 'react'
import './cardproject/card2.css'
import { FaUnlink } from "react-icons/fa";
const Card3 = ({ img1, img2, name, number, owner }) => {
  return (
    <>
      <div className='card-style'>
        <h3>Current Project</h3>
        <img className='img-style' src={img1} />
        <div className='content' >  <div style={{ padding: "0 20px" }}><h2 className='heading-style'>Name:</h2>
          <p>{name}</p></div>
          <div style={{ padding: "0 20px" }}><h2 className='heading-style'>Number:</h2>
            <p>{number}</p></div>
          <div style={{ padding: "0 20px" }}><h2 className='heading-style'>Owner</h2>
            <p>{owner}</p></div></div>
        <div className='content-btn'>
          <button className='btn btn-warning'>Edit</button>


        </div>







        <div className='content3'>
          <div className='content4'>
            <h3>Current Project</h3>
            <img className='img-style' src={img2} />
          </div>
          <div className='content'style={{display:"flex",alignItems:"start",flexDirection:"column"}}>   <div style={{ display: "flex", marginTop: "20px" }}><div style={{ fontSize: "20px" ,marginRight:"5px"}}><FaUnlink  /></div>
          <p className='m-0  ' style={{ color: "red", textTransform: "capitalize" }}>Framerwork disconnected</p></div>
            <div style={{  display: "flex", marginTop: "20px" }}><div style={{ fontSize: "20px" ,marginRight:"5px"}}><FaUnlink style={{ fontSize: "20px" }} /></div>
            <p className='m-0  ' style={{ color: "red", textTransform: "capitalize" }}>Out of data</p></div>
            <div style={{ display: "flex", marginTop: "20px" }}><div style={{ fontSize: "20px" ,marginRight:"5px"}}><FaUnlink style={{ fontSize: "20px" }} /></div>
              <p className='m-0  ' style={{ color: "red", textTransform: "capitalize" }}>Out of data</p></div>
              </div>
          <div className='content-btn'>
            <button className='btn btn-warning'>Updata</button>


          </div>


        </div>


      </div>
    </>
  )
}

export default Card3