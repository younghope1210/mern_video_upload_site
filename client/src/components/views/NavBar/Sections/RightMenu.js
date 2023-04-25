/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {


 const navigate = useNavigate();


  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        navigate('/login')
      } else {
        alert('Log Out Failed')
      }
    });
  };
// 
  if (user.userData && !user.userData.isAuth) {
    return ( // 로그인전 메뉴
    <ul>
      <li><NavLink to="/subscriber">subscriber</NavLink></li>
       <li><NavLink to="/login" >login</NavLink></li>
      <li><NavLink to="/register" >join</NavLink></li>

    </ul>
    )
  } else {
    return ( // 로그인 후 메뉴

      <ul>
        <li><NavLink to="/subscriber">subscriber</NavLink></li>
        <li><NavLink to="/upload">upload</NavLink></li>
        <li><a onClick={logoutHandler}>Logout</a></li>
      </ul>
        
    )
  }
}

export default RightMenu