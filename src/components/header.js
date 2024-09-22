import React, { useState } from 'react';
import './Header.css'; // استيراد ملف الـ CSS
import Sidenav from './sidenav';
import BottomBar from './bottombar';
import m1 from '../asssets/grid-3x3-gap-fill.svg'
import m2 from '../asssets/Website_Ico.png'

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './sidenav';
import Sidebar from './bottombar';
import './Header.css'

function Header() {
  return (
    <div >
      <Navbar />
      {/* <Sidebar /> */}
    
    </div>
  );
}

export default Header;
