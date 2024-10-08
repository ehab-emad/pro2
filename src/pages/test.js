import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import jsonData from '../db1.json';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkflow } from "../redux/fetchflowwork";

cytoscape.use(cxtmenu);
cytoscape.use(dagre);

const CytoscapeGraph1 = () => {
// const [data,setdata]=useState([])
  const [changelayouts, setchangelayout] = useState("grid");
  const [workflowname, setworkflowname] = useState("");
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const param = useParams();
  const data=useSelector((state)=>state.workflow.Workflow)
  const dispatch=useDispatch()
  const [cyInstance, setCyInstance] = useState(null);
  // هذا سيساعدك في تتبع التحديثات
  
  useEffect(()=>{
    dispatch(fetchWorkflow(param.id))
    console.log(data.static_structure)
  
  }, [dispatch, param.id]);
  useEffect(() => {
  
    const loadGraph = () => {
      const nodesPreset = [];
      const edgesPreset = [];
      const workflow = data;
      const workflowId = workflow.UUID;
      setworkflowname(workflow.name);

      nodesPreset.push({
        data: { id: workflowId, name: workflow.name || 'No Name' ,type: "workflow"}
      });

      if ( Array.isArray(workflow.static_structure) && workflow.static_structure.length > 0 ) {
        workflow.static_structure.forEach(stage => {
          const stageId = stage.UUID;
          nodesPreset.push({
            data: { id: stageId, name: stage.name || 'No Name', type: "stage" }
          });
          edgesPreset.push({ data: { source: workflowId, target: stageId } });

          if (stage.objects && stage.objects.length > 0) {
            stage.objects.forEach(object => {
              const objectId = object.UUID;
              nodesPreset.push({
                data: { id: objectId, name: object.name || 'No Name', type: "object" }
              });
              edgesPreset.push({ data: { source: stageId, target: objectId } });

              if (object.actions && object.actions.length > 0) {
                object.actions.forEach(action => {
                  const actionId = action.UUID;
                  nodesPreset.push({
                    data: { id: actionId, name: action.name || 'No Name', type: "actionsobject" }
                  });
                  edgesPreset.push({ data: { source: stageId, target: actionId } });
                });
              }
            });
          }

          if (stage.actions.length > 0) {
            stage.actions.forEach(action => {
              const actionId = action.UUID;
              nodesPreset.push({
                data: { id: actionId, name: action.name || 'No Name', type: "actionstage" }
              });
              edgesPreset.push({ data: { source: stageId, target: actionId } });
            });
          }
        });
      }

      return { nodes: nodesPreset, edges: edgesPreset };
    };

    const { nodes, edges } = loadGraph();
    const cy = cytoscape({
      container: document.getElementById('cy'),
      layout: { name: changelayouts, nodeDimensionsIncludeLabels: true, spacingFactor: 0.8 },
      minZoom: 0.5,
      maxZoom: 3,
      style: [
        {
          selector: 'node',
          css: {
            'content': 'data(name)',
            "background-color": "#354a5f",
            "height": "6px",
            "color": "white",
            "shape": "rectangle",
            "text-halign": "center",
            "text-valign": "center",
            "padding-left": "10px",
            "padding-right": "10px",
            "width": "label"
          }
        },
        {
          selector: 'node[type = "stage"]',
          css: {
            'content': 'data(name)',
            "background-color": "red",
            "height": "6px",
            "color": "white",
            "shape": "rectangle",
            "text-halign": "center",
            "text-valign": "center",
            "padding-left": "10px",
            "padding-right": "10px",
            "width": "label"
          }
        },
        {
          selector: 'node[type = "object"]',
          css: {
            'content': 'data(name)',
            "background-color": "blue",
            "height": "6px",
            "color": "white",
            "shape": "rectangle",
            "text-halign": "center",
            "text-valign": "center",
            "padding-left": "10px",
            "padding-right": "10px",
            "width": "label"
          }
        },
        {
          selector: 'node[type = "actionstage"]',
          css: {
            'content': 'data(name)',
            "background-color": "black",
            "height": "6px",
            "color": "white",
            "shape": "rectangle",
            "text-halign": "center",
            "text-valign": "center",
            "padding-left": "10px",
            "padding-right": "10px",
            "width": "label"
          }
        },
        {
          selector: 'node[type = "actionsobject"]',
          css: {
            'content': 'data(name)',
            "background-color": "green",
            "height": "6px",
            "color": "white",
            "shape": "rectangle",
            "text-halign": "center",
            "text-valign": "center",
            "padding-left": "10px",
            "padding-right": "10px",
            "width": "label"
          }
        },
        {
          selector: 'edge',
          css: {
            width: 1.5,
            color: "#354a5f"
          }
        }
      ],
      elements: { nodes, edges },
      zoomingEnabled: true,
      userZoomingEnabled: true
    });

    document.getElementById('zoom-in').addEventListener('click', () => {
      cy.zoom(cy.zoom() + 0.1);
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
      cy.zoom(cy.zoom() - 0.1);
    });

    cy.cxtmenu({
      selector: 'node[type = "workflow"]',
      commands: function (ele) {
        return [
          {
            content: '<span style="font-size: 16px; color: white;">إضافة</span>',
            select: function () {
              document.getElementById("myModal").style.display = "block";
            }
          }
        ];
      },
      fillColor: 'rgba(60, 60, 60, 0.9)',
      itemColor: 'white',
      openMenuEvents: 'tap',
      menuRadius: 75,
      outsideMenuCancel: true,
      atMouse: false
    });

    setCyInstance(cy);

    window.addEventListener('resize', () => {
      cy.resize();
      // cy.fit();
    });

    return () => {
      cy.destroy();
    };
  }, [data, changelayouts]);

  // إغلاق الـ modal عند النقر على زر Close
  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  // تحديث اسم الـ workflow
  const [stageName, setStageName] = useState('');
  async function handlesubmit(event){
    event.preventDefault()

    const formData=new FormData(event.target)
    console.log(formData)
    // const product=Object.fromEntries(formData.entries())
    // console.log(product)

    
    // if(!product.title || !product.category || !product.price || 
    //     !product.scope){


    //     alert("please fill all the fields")
    //     return
    // }

 try {
    const res=await fetch(`http://localhost:8000/api/data/${param.id}/add-stage/`,{
        method:"Post",
        body:formData
    })
    // const data =await res.json()
    if(res.ok){

      console.log("ok")
      
    }
    else if(res.status === 400){
        alert("valdtion errors")
    }
    else{
        alert("unable to create the product!")
    }
  }
  catch(erorr){
    alert("unable to connect to server!")

  }
}



  return (
    <div className="container-fluid" id="objects-container" style={{ display: "flex", alignItems: "center" }}>
      <div id="cy" style={{ width: '98%', height: '800px' }}></div>
      <div className="all-btn d-flex flex-column">
        <div>
          <div className="d-flex align-items-center">
            <div style={{ backgroundColor: "#354a5f", width: "15px", height: "15px", marginRight: "5px" }}></div>
            workflowname
          </div>
          <div className="d-flex align-items-center">
            <div style={{ backgroundColor: "red", width: "15px", height: "15px", marginRight: "5px" }}></div>
            <span>stages</span>
          </div>
          {console.log(data)}
          <div className="d-flex align-items-center">
            <div style={{ backgroundColor: "black", width: "15px", height: "15px", marginRight: "5px" }}></div>
            <span>action of stage</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ backgroundColor: "blue", width: "15px", height: "15px", marginRight: "5px" }}></div>
            <span>object</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ backgroundColor: "green", width: "15px", height: "15px", marginRight: "5px" }}></div>
            <span>actions of object</span>
          </div>
        </div>
        <div className="btn btn-info m-2" onClick={() => setchangelayout("circle")}>circle</div>
        <div className="btn btn-info m-2" onClick={() => setchangelayout("breadthfirst")}>breadthfirst</div>
        <div className="btn btn-info m-2" onClick={() => setchangelayout("dagre")}>dagre</div>
        <div className="btn btn-info m-2" id="zoom-in">+</div>
        <div className="btn btn-info m-2" id="zoom-out">-</div>
      </div>
      <div id="myModal" className="modal">
      <form onSubmit={handlesubmit}>
<div className="row mb-3">
<label className="col-sm-4 col-form-label">title</label>
<div className="col-sm-8">
<input className="form-control" name="title" />
{/* <span className="text-danger">{handlerorr.price}</span> */}

</div>
</div>
<div className="row mb-3">
<label className="col-sm-4 col-form-label">scope</label>
<div className="col-sm-8">
<input className="form-control" name="scope" />
<span className="text-danger"></span>

</div>
</div>
<div className="row mb-3">
<label className="col-sm-4 col-form-label">category</label>
<div className="col-sm-8">

<span className="text-danger"></span>

</div>
</div>
<div className="row mb-3">
<label className="col-sm-4 col-form-label">price</label>
<div className="col-sm-8">
<input className="form-control" name="price" type="number" step='0.01' min='1'  />
<span className="text-danger"></span>

</div>
</div>
<div className="row mb-3">
<label className="col-sm-4 col-form-label">image</label>
<div className="col-sm-8">
<input className="form-control" name="image" type="file"  />
<span className="text-danger"></span>

</div>
</div>
<div className="row ">
<div className="offest-sm-4 col-sm-4 d-grid">
<button type="submit" className="btn btn-primary" >submit</button>
</div>
<div className=" col-sm-4 d-grid">
</div>
</div>





        </form>
      </div>
    </div>
  );
};

export default CytoscapeGraph1;
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
