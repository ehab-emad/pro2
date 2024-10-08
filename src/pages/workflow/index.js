import React, { useEffect, useState } from 'react'
import jsonData from '../../db1.json';
import Card4 from '../../components/card4';
import Card5 from '../../components/card5';
import m1 from '../../asssets/Status_Waiting_icon.png'
import m2 from '../../asssets/body_check.png'
import m3 from '../../asssets/workflow_session.PNG'
import m5 from '../../asssets/Project_Icon.png'
import m6 from '../../asssets/EDAG_icon.png'
import { useDispatch, useSelector } from 'react-redux';
// import { viewworkflow } from '../../redux/fetchdata';
import { FaUnlink } from 'react-icons/fa';
import Card3 from '../../components/card3';
import { fetchWorkflow, ok, viewworkflow } from '../../redux/fetchflowwork';
import { useParams } from 'react-router-dom';
  const Workflow = () => {
    const data=useSelector((state)=>state.workflow.Workflow)
    const [dateString, setworkflowname] = useState(false);
    
    const viewvalue=useSelector((state)=>state.workflow.view)
    const [view, setview] = useState(false);

    const stage=useSelector((state)=>state.workflow.stage)
    // const stage=useSelector((state)=>state.workflow.data1)


  const param = useParams();
  const dispatch=useDispatch()

  const workflowname = data.name;
    const name = data.instruction.name;
   
    const editname=name!=null? name:"None"
   
    const Descreption = data.instruction.Descreption;
     const editdesc=Descreption!=null? name:"None"

useEffect(()=>{

  dispatch(fetchWorkflow(param.id))
  if (data.static_structure && data.static_structure.length > 0){
  setworkflowname(true)
}
else{
  setworkflowname(false)
}
 
 },[dispatch,param.id])
 

  return (

    <div className='height d-flex gap-3 '>
    <div style={{padding:"10px",width:"30%"}}>
    
    {console.log(data)}
    <div style={{width:"100%",padding:"10px", boxShadow:" 0 0px 8px rgba(0, 0, 0, 0.2)",margin:"5px",borderRadius:"10px"}}>
    <div className='btn btn-info w-100 ' onClick={()=>{
      ok()
      setview(!view)
    }}>Switch editor</div>
    <p style={{fontSize:"26px",marginBottom:"0"}}>workflow Viewer :</p>
    {console.log(dateString)}
    {
    Array.isArray(data.static_structure) && data.static_structure.length > 0 ? 
        data.static_structure.map((item) => {
            return (
                <div onClick={() => { dispatch(viewworkflow(item.UUID)) }}>
                    <Card4 view={view} name={item.name} item={item} />
                </div>
            );
        }) 
        : <div>No data available</div>  // رسالة توضح عدم وجود بيانات
   }
   
   { viewvalue? <div style={{fontSize:"13px"}} className='btn btn-warning p-2 w-100'>Edit</div>:<div className='d-hidden'></div> }
   
    
    </div>
    
    
    <Card5 name={editname} view={view} Descreption={editdesc} />
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
    <div style={{width:"70%"}}>
    {console.log(data)}
    {stage.map((item)=>{return(<>
      <div className='p-3 my-3 d-flex align-items-center flex-column' style={{ boxShadow:" 0 0px 8px rgba(0, 0, 0, 0.2)",borderRadius:"10px"}}><span className='justify-content-start d-flex w-100'>Stage:{item.name}</span> {view? <div className='justify-content-end d-flex w-100 my-2'><button  style={{fontSize:"13px",backgroundColor:"gold" ,border:"none" ,padding:"5px" ,borderRadius:"3px"}}>Add New Action</button></div>:<div className='d-hidden'></div>}</div>
      <div className='p-2 my-3' style={{ boxShadow:" 0 0px 8px rgba(0, 0, 0, 0.2)",borderRadius:"10px"}}>
      <div className='p-2  d-flex align-items-center flex-column' ><span className='justify-content-start d-flex w-100'>Objects</span> {view? <div className='justify-content-end d-flex w-100 my-2'><button  style={{fontSize:"13px",backgroundColor:"gold" ,border:"none" ,padding:"5px" ,borderRadius:"3px"}}>Add New Object</button></div>:<div className='d-hidden'></div>}</div>
    {item.objects.map((item)=>{return(<>
    
     
      <div style={{backgroundColor:"rgb(213 202 202 / 41%)",padding:"20px ",margin:"5px",borderRadius:"5px"}}>
        <div  className='d-flex align-items-center justify-content-between'>
    <div className='d-flex align-items-center gap-5'>
     
      <img src={m2} width={25}/>
      <img src={m1} width={25}/>
    </div>
    <h6>{item.name}</h6>
    
      {view ?
      <div  className='d-flex  align-items-end flex-column' >
       <div style={{margin:"6px 0"}}>  <div style={{fontSize:"13px"}} className='btn btn-warning mx-2 p-1'>Add New Action</div>
      <div style={{fontSize:"13px"}} className='btn btn-warning p-1'>Edit</div>
      </div>
      <div>  <div style={{fontSize:"13px"}} className='btn btn-warning mx-2 p-2'>Edit Instractions</div>
      <div style={{fontSize:"13px"}} className='btn btn-warning p-1'>Delete Object</div>
      </div>
      
       </div>:<div className='d-flex align-items-center '> 
        <div style={{fontSize:"13px",fontWeight:"500"}} className='btn btn-danger mx-2 p-2 '>Delete all</div>
       <div style={{fontSize:"13px",fontWeight:"500"}} className='btn btn-warning p-2'>Add Referrence</div> </div>}
      
   
    
        </div>
        <div></div>
        <div></div>
      </div>
    
    
    
    

    
    
    </>)})}
    </div>
    
    </>)})}
    
    
    
    
    
    
    </div>
    <div style={{width:"28%",padding:"10px"}}>
    <div className='card-style ' style={{width:"100%",maxWidth:"100%", margin:"0"}}>
            <h3>#Current Session</h3>
            <img className='img-style' src={m3} />
            <div className='content' >  <div style={{ display:"flex" ,alignItems:"center"}}><h5 className='heading-style'>Workflow Name:</h5>
              <p style={{margin:"0px 5px"}}>{workflowname}</p></div>
            
              <div style={{ display:"flex" ,alignItems:"center"}}><h5 className='heading-style'> Session Owner</h5>
                <p style={{margin:"0px 5px"}}>fdf</p></div></div>
            <div className='content-btn'>
              <button className='btn btn-warning'>Print report</button>
              <button className='btn btn-warning'>Reset  Sessions</button>
    
    
            </div>
    
    
    
    
    
    
    
         
    {console.log(data)}
    
          </div>
          <Card3 name={"SandBox Project"} owner={"sj9878"} number={"K.O"} img1={m5} img2={m6}/>
    
    
    
    </div>
    
    
    
    
    
        </div>
 
  )
}

export default Workflow