import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import dagre from "cytoscape-dagre";
import jsonData from '../db.json';

// دمج الإضافات مع cytoscape
cytoscape.use(cxtmenu);
cytoscape.use(dagre);

const CytoscapeGraph = () => {
  // const [jsonData, setJsonData] = useState(null); 
  const [cyInstance, setCyInstance] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://your-api-endpoint.com/data'); // استبدل بـ URL الخاص بك
//         const data = await response.json();
//         setJsonData(data); // تخزين البيانات المستلمة في الحالة
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData(); // استدعاء الدالة لجلب البيانات

//   }, []); // تنفيذ هذا مرة واحدة عند تحميل المكون

  useEffect(() => {
    if (!jsonData) return; // تأكد من وجود البيانات قبل محاولة استخدامها

    const loadLcaProcess = (parentId, lcaSubpartDict, lcaSubpartName, nodesPreset, edgesPreset) => {
      if (lcaSubpartName === "lca_result") return;
      const idLcaSubpart = lcaSubpartName + parentId;
      nodesPreset.push({ data: { id: idLcaSubpart, name: lcaSubpartDict["name"], background_color: lcaSubpartDict["color"] } });
      edgesPreset.push({ data: { source: parentId, target: idLcaSubpart } });
    };

    const loadLcaSubpart = (parentId, lcaSubpartDict, lcaSubpartName, nodesPreset, edgesPreset) => {
      if (lcaSubpartName === "lca_result") return;
      const idLcaSubpart = lcaSubpartName + parentId;
      nodesPreset.push({ data: { id: idLcaSubpart, name: lcaSubpartName } });
      edgesPreset.push({ data: { source: parentId, target: idLcaSubpart } });
      for (let lcaProcess in lcaSubpartDict) {
        loadLcaProcess(idLcaSubpart, lcaSubpartDict[lcaProcess], lcaProcess, nodesPreset, edgesPreset);
      }
    };

    const loadLcaPart = (parent, lcaPartDict, lcaPartName, nodesPreset, edgesPreset) => {
      if (lcaPartName === "lca_result") return;
      const idLcaPart = lcaPartName + parent["id"];
      nodesPreset.push({ data: { id: idLcaPart, name: lcaPartName, lca_part_id: parent["lca_part_id"] } });
      edgesPreset.push({ data: { source: parent["id"], target: idLcaPart } });
      for (let lcaSubpart in lcaPartDict) {
        loadLcaSubpart(idLcaPart, lcaPartDict[lcaSubpart], lcaSubpart, nodesPreset, edgesPreset);
      }
    };

    const loadParts = (parentId, partDict, nodesPreset, edgesPreset) => {
      nodesPreset.push({ data: { id: partDict["id"], name: partDict["name"] } });
      edgesPreset.push({ data: { source: parentId, target: partDict["id"] } });
      for (let lcaPart in partDict["lca_part"]) {
        loadLcaPart(partDict, partDict["lca_part"][lcaPart], lcaPart, nodesPreset, edgesPreset);
      }
    };

    const loadAnalysis = (analysisDict, nodesPreset, edgesPreset) => {
      nodesPreset.push({ data: { id: analysisDict["id"], name: analysisDict["name"] } });
      for (let part in analysisDict["parts"]) {
        loadParts(analysisDict["id"], analysisDict["parts"][part], nodesPreset, edgesPreset);
      }
    };

    const loadGraph = () => {
      const nodesPreset = [];
      const edgesPreset = [];
      loadAnalysis(jsonData, nodesPreset, edgesPreset);
    //   loadAnalysis(jsonData["analysis_right"], nodesPreset, edgesPreset);
    
      return { nodes: nodesPreset, edges: edgesPreset };
    };

    // هننشا الرسم البياني عند تحميل البيانات
    const { nodes, edges } = loadGraph();
    const cy = cytoscape({
      container: document.getElementById('cy'),
      layout: { name: 'dagre', nodeDimensionsIncludeLabels: true, spacingFactor: 0.8 },
      minZoom: 0.5, // أقل نسبة للتكبير
      maxZoom: 3,   // أعلى نسبة للتكبير
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
          selector: 'node[background_color]',
          style: {
            'background-color': 'data(background_color)',
            'text-outline-color': 'data(background_color)',
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
        const addProcessNodes = ["Upstream", "Core", "Downstream", "Circularity"];
        if (addProcessNodes.includes(e.data('name'))) {
          menu_elements.push({
            content: 'Add process',
            select: function () {
              const dataUrl = `/qlca/lca_part/${e.data("lca_part_id")}/addnewlcaprocess/lca_step/LCASTEP${addProcessNodes.indexOf(e.data("name")) + 1}/`;
              window.open(dataUrl, '_blank');
            }
          });
        }

        if (e.data('name') === "Circularity") {
          menu_elements.push({
            content: 'Toggle Re-Used',
            select: function () {
              window.location.href = `/qlca/lca_part/${e.data("lca_part_id")}/toggle_ispartreused/`;
            }
          });
        }

        menu_elements.push({
          content: e.data('name'),
          select: function (ele) {
            console.log(ele.position());
          }
        });

        return menu_elements;
      }
    });

    setCyInstance(cy);

    // وظيفة التكبير والتصغير باستخدام أزرار الزائد والناقص
    const handleZoomIn = () => {
      cy.zoom(cy.zoom() * 1.1); // تكبير بنسبة 10%
      cy.center();
    };

    const handleZoomOut = () => {
      cy.zoom(cy.zoom() * 0.9); // تصغير بنسبة 10%
      cy.center();
    };

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
    <div className="container-fluid" id="objects-container" style={{position:"relative"}}>
      <div id="cy" style={{ width: '100%', height: '800px' }}></div>
      <div className="zoom-controls">
        <button onClick={() => cyInstance && cyInstance.zoom(cyInstance.zoom() * 1.1)}>+</button>
        <button onClick={() => cyInstance && cyInstance.zoom(cyInstance.zoom() * 0.9)}>-</button>
      </div>
    </div>
  );
};

export default CytoscapeGraph;
