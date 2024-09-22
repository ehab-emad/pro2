import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import m1 from '../asssets/grid-3x3-gap-fill.svg'
import m2 from '../asssets/Website_Ico.png'
import { GoQuestion } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { FaTicketAlt } from "react-icons/fa";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Help');
  const [selectedmoney, setSelectedmoney] = useState('DDDD');

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setIsOpened(false)
      
  };
   const toggleDropdown1 = () => {
setIsOpen(false)
    setIsOpened(!isOpened);
};

  const selectLanguage = (language) => {
      setSelectedLanguage(language);
      setIsOpen(false); // إغلاق القائمة بعد اختيار اللغة
     
  };
  const selectmoney = (money) => {
    setSelectedmoney(money);
 
    setIsOpened(false); // إغلاق القائمة بعد اختيار اللغة
};

  return (
   <div className="header ">
    <div className="left">
    
   <a className="" onClick={() => openNav()}>
       <img
         src={m1}
         alt="Menu"
         className="nav-icon"
         style={{ height: "50px" }}
       />
     </a>
     <a className="" href="/home">
     <img
       src={m2}
       alt="Home"
       className="nav-img"
     />
   </a>
     <a className="nav-links">Add new project</a>
    </div>
    <div className="right">
    <div className="language-dropdown">
<button className="dropdown-toggle" onClick={toggleDropdown1}>
<GoQuestion className="mx-2"/>  Help <span className={`arrow ${isOpened ? 'up' : 'down'}`}></span>
            </button>
            {isOpened && (
                <ul className="dropdown-menus">
                    <li onClick={() => selectmoney('USD ($)')}><a  style={{textDecoration:"none", color:"white"}} href="#"><TiDocumentText style={{fontSize:"26px"}}/>Documentation</a></li>
                    <li onClick={() => selectmoney('CAD ($)')}><a  style={{textDecoration:"none", color:"white"}} href="#">Send email </a></li>
                    <li onClick={() => selectmoney('CAD ($)')}><a  style={{textDecoration:"none", color:"white"}} href="#"><FaTicketAlt /> issue a ticket </a></li>
                   
                </ul>
            )}
       
</div>
    <div className="language-dropdown">
<button className="dropdown-toggle" onClick={toggleDropdown}>
<MdAccountCircle  className="mx-2"/>
lkkjjj <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </button>
            {isOpen && (
                <ul className="dropdown-menus">
                    <li onClick={() => selectLanguage('English')} style={{backgroundColor:"gold"}}><a style={{textDecoration:"none", color:"black"}}  href="#">Logout</a></li>
                    
                    
                </ul>
            )}
        </div>
       
    </div>
   </div>
  );
}

export default Navbar;
// background-color: rgb(53, 74, 95)
// height: 90px;

