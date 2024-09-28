import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import { Footer } from './components/footer/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import CytoscapeGraph from './components/cardworkflow';
import CytoscapeGraph1 from './pages/test';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './redux/fetchdata';
import ALLworkflow from './pages/allworkflow';
// import Test from './components/test';

function App() { const data=useSelector((item)=>item.data.ALLworkflow)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchData())
  })
  return (
   <div className='app-style'>
     <div className="center-link">
      {console.log(data)}
      <a href="https://www.edag.com/de/rechtliches/impressum">Impressum</a>
    </div>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/index' element={ <Index/>}/>
      <Route path='/:id' element={ <CytoscapeGraph1/>}/>
      <Route path='/allworkflow' element={ <ALLworkflow/>}/>
      
    </Routes>
    
      
   <Footer />
 
    {/* <Test/> */}
    </BrowserRouter>
  

   </div>
  );
}

export default App;
