import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import { Footer } from './components/footer/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import CytoscapeGraph1 from './pages/test';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ALLworkflow from './pages/allworkflow';
import Workflow from './pages/workflow';
// import Test from './components/test';

function App() { const data=useSelector((item)=>item.data.ALLworkflow)
 
  return (
   <div className='app-style'>
     <div className="center-link">
      <a href="https://www.edag.com/de/rechtliches/impressum">Impressum</a>
    </div>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/index' element={ <Index/>}/>
      <Route path='/allworkflow' element={ <ALLworkflow/>}/>
      <Route path='/digram/:id' element={ <CytoscapeGraph1/>}/>
     
      {/* <Route path='/workflow/:id' element={ <Workflow/>}/> */}
 
      
      
    </Routes>
    
      
   <Footer />
 
    {/* <Test/> */}
    </BrowserRouter>
  

   </div>
  );
}

export default App;
