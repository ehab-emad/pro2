import React from 'react'
import { Row } from 'react-bootstrap'
import Card1 from '../../components/cards/card1'
import m1 from '../../asssets/Workflow_Icon.png'
import m2 from '../../asssets/Index_Icon.png'
import m3 from '../../asssets/vb-net_Icon.png'
import m5 from '../../asssets/Project_Icon.png'
import m6 from '../../asssets/EDAG_icon.png'
import Cardproject from '../../components/cardproject/Card2'
import Card3 from '../../components/card3'
import '../home/home.css'

const Index = () => {
  return (
    <div className='home-style '>
        <div className='  content-style'>
<Row >
{/* <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m4} style={value}/> */}
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m1} />
   
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m2}/>
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m2}/>
    
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m3}/>
   
    
     
    
        
    
</Row>






    </div>
   <Row> <Card3 name={"SandBox Project"} owner={"sj9878"} number={"K.O"} img1={m5} img2={m6}/></Row>
 
    </div>
  )
}

export default Index