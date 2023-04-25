
import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
// import {Auth} from '../../../hoc/auth';

// import { useNavigate } from "react-router-dom";


function LoginPage() {


  // 디스패치

  const dispatch = useDispatch();

 // 로그인 완료후 페이지 넘김
 const navigate = useNavigate();


  const [Email , setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHander = (event) => {

    setEmail(event.currentTarget.value);

  };

  const onPasswordHander = (event) => {
    setPassword(event.currentTarget.value);

  }


  const onSubmitHandler = (event) => {
    event.preventDefault(); 
  
    console.log('Email', Email)
    console.log('PW', Password)
  
    let body = {
      email : Email,
      password : Password
    }
  
    dispatch(loginUser(body))
    .then(response=>{
      if(response.payload.loginSuccess){
        // props.history.push('/')//메인페이지로 이동
        navigate('/')//메인페이지로 이동
      }
      else{
        console.log('Error');
      }
    })
  }
  
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'
    , width:'100%', height:'100vh'}}
    >
      <form 
          style={{display:'flex', flexDirection:'column', backgroundColor:'white', padding:'50px',
          boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}
          onSubmit={onSubmitHandler}
          >
        <label>Email  </label>

        <input type="email" value={Email} onChange={onEmailHander} />
   
        <label>Pssword  </label>

        <input type="password" value={Password} onChange={onPasswordHander} />
        
        <br />
        
        <button
          style={{ backgroundColor:'#333', border:'0', color:'white', height:'30px', lineheight:'30px'}}
          type="submit">
          Login
        </button>

      </form>

    

      
      
   
     


    </div>
  )
}

export default LoginPage