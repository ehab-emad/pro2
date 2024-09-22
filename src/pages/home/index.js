import React from 'react'
import './home.css'
import Card1 from '../../components/cards/card1'
import m1 from '../../asssets/CatiaFramework.png'
import m2 from '../../asssets/ConceptMan_Ico.png'
import m3 from '../../asssets/QLCA_Icon_Trimmed_dark.png'
import m4 from '../../asssets/BM.png'
import m5 from '../../asssets/Project_Icon.png'
import { Col, Container, Row } from 'react-bootstrap'
import Cardproject from '../../components/cardproject/Card2'
const Home = () => { const value=" sepia(60%) contrast(85%) brightness(90%) saturate(60%) grayscale(30%)"
  return (
    <div className='home-style '>
        <div className='  content-style'>
<Row >
<Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m4} style={value}/>
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m1} />
   
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m2}style={value}/>
    
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m3}/>
   
    
     
    
        <Card1 title={"Blot"} desc={"Create,edit and share bolt cases"} img={m4}/>
    
</Row>






    </div>
   <Row> <Cardproject name={"SandBox Project"} owner={"sj9878"} number={"K.O"} img={m5}/></Row>
 
    </div>
  )
}

export default Home