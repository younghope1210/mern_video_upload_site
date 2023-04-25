import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { GiFilmSpool } from "react-icons/gi";
import { TfiAlignJustify } from "react-icons/tfi";
// import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';

function NavBar() {


  return (
   
<header>

<h1><a href="/"> Film Library<GiFilmSpool style={{fontWeight:'bold',fontSize:'35px'}} /> </a></h1>

  <input type="checkbox" id="menu-bar" />

  <label for="menu-bar"><TfiAlignJustify /></label>

  <nav>
      
      {/* <LeftMenu /> */}
      <RightMenu />

  </nav>


</header>
  
  )
}

export default NavBar