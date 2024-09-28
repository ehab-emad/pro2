import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import jsonData from '../db1.json'; // تأكد من أن البيانات هنا
import { useParams } from "react-router-dom";

// دمج الإضافات مع cytoscape
cytoscape.use(cxtmenu);
cytoscape.use(dagre);

const CytoscapeGraph1 = () => { const param=useParams()
  const [cyInstance, setCyInstance] = useState(null);
  const [workflowData, setWorkflowData] = useState(null);

//   useEffect(() => {
//     // جلب البيانات من نقطة النهاية باستخدام fetch
//     const fetchData = async () => {
//       try {
//         const response = await fetch('YOUR_API_ENDPOINT'); // استبدل بـ API endpoint الخاص بك
//         const data = await response.json(); // تحويل الاستجابة إلى JSON
//         setWorkflowData(data); // تحديث الحالة بالبيانات المستلمة
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);
  useEffect(() => {
    // if (!workflowData || !workflowData.data || !workflowData.data.objs_workflow.length) return; // تأكد من وجود البيانات
    if (!jsonData || !jsonData.data || !jsonData.data.objs_workflow.length) return; // تأكد من وجود البيانات قبل محاولة استخدامها

    const loadGraph = () => {
      const nodesPreset = [];
      const edgesPreset = [];

      // عرض فقط أول عنصر من objs_workflow
   
      //   const workflow = workflowData.data.objs_workflow[4]; // هنا نعرض أول عنصر
      const workflow = jsonData.data.objs_workflow[4];
      const workflowId = workflow.UUID;
      nodesPreset.push({
        data: {
          id: workflowId,
          name: workflow.name || 'No Name',
        }
      });

      // معالجة الـ static_structure
      if (workflow.static_structure.length > 0) {
        workflow.static_structure.forEach(stage => {
          const stageId = stage.UUID;
          nodesPreset.push({
            data: {
              id: stageId,
              name: stage.name || 'No Name',
            
            }
          });
          edgesPreset.push({ data: { source: workflowId, target: stageId } });

          // معالجة objects داخل كل مرحلة
          if (stage.objects && stage.objects.length > 0) {
            stage.objects.forEach(object => {
              const objectId = object.UUID;
              nodesPreset.push({
                data: {
                  id: objectId,
                  name: object.name || 'No Name',
                 
                }
              });
              edgesPreset.push({ data: { source: stageId, target: objectId } });

              // معالجة الإجراءات داخل كل كائن
              if (object.actions.length > 0) {
                object.actions.forEach(action => {
                  const actionId = action.UUID;
                  nodesPreset.push({
                    data: {
                      id: actionId,
                      name: action.name || 'No Name',
                    
                    }
                  });
                  edgesPreset.push({ data: { source: objectId, target: actionId } });
                });
              }
            });
          }

          // stage  معالجة الإجراءات داخل  
          if (stage.actions.length>0) {
            stage.actions.forEach(action => {
              const actionId = action.UUID;
              nodesPreset.push({
                data: {
                  id: actionId,
                  name: action.name || 'No Name',
               
                }
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
      layout: { name: 'dagre', nodeDimensionsIncludeLabels: true, spacingFactor: 0.8 },
      minZoom: 0.5,
      maxZoom: 3,
      autoungrabify: false,
      style: [
        {
          selector: 'node',
          css: {
            'content': 'data(name)',
            "background-color": "#354a5f",
            width: "label",
            height: "label",
            padding: "6px",
            color: "white",
            shape: "round-rectangle",
            "text-halign": "center",
            "text-valign": "center"
          }
        },
        {
          selector: 'edge',
          css: {
            "curve-style": "taxi",
            "taxi-direction": "downward",
            "taxi-turn": 20,
            "taxi-turn-min-distance": 5,
            'target-arrow-shape': 'triangle',
            width: 1.5,
            color: "#354a5f"
          }
        }
      ],
      elements: { nodes, edges }
    });

    cy.cxtmenu({
      selector: 'node',
      commands: (e) => {
        const menu_elements = [];
        // إضافة خيارات جديدة حسب الحاجة
        if (e.data('description')) {
          menu_elements.push({
            content: 'View Details',
            select: function () {
              alert(`Node Description: ${e.data('description')}`);
            }
          });
        }

        return menu_elements;
      }
    });

    setCyInstance(cy);

    // تحديث الحجم عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
      cy.resize();
      cy.fit();
    });

    // تنظيف
    return () => {
      cy.destroy();
    };
  }, []);

  return (
    <div className="container-fluid" id="objects-container" style={{ position: "relative" }}>
      <div id="cy" style={{ width: '100%', height: '800px' }}></div>
      <div className="zoom-controls">
        {console.log(param)}
        <button onClick={() => cyInstance && cyInstance.zoom(cyInstance.zoom() * 1.1)}>+</button>
        <button onClick={() => cyInstance && cyInstance.zoom(cyInstance.zoom() * 0.9)}>-</button>
      </div>
    </div>
  );
};

export default CytoscapeGraph1;
