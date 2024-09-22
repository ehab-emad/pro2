import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import { Footer } from './components/footer/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';

function App() {
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
    </Routes>
    
      
   <Footer />
    
    </BrowserRouter>
  

   </div>
  );
}

export default App;
