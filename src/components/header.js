import React, { useState } from 'react';
import './Header.css'; // استيراد ملف الـ CSS

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './sidenav';

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
