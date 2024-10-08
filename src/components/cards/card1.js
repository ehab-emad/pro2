import React from 'react'
import './card1.css'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Card1 = ({img,title,desc,style,path}) => {
  return (
    <Col sm={"4"}
    xs={"4"}
    md={"4"}
    lg={"4"}
    xl={"3"}
    >
    <div className='card-style1'>
<img className="img-style" style={{filter:style}} src={img}/>
<div style={{padding:"0 24px"}}><h2 className='heading-style'>{title}</h2>
<p>{desc}</p></div>
<div className='content'>
<Link to={path}><button style={{color:"#333",width:"100%"}} className='btn btn-success'>Start</button></Link>
<button className='btn btn-info' style={{color:"white"}}>Info</button>

</div>





    </div>
    </Col>
  )
}

export default Card1