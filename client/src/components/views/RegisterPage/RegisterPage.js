import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_actions';
// import {Auth} from '../../../hoc/auth';      



function RegisterPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
        
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
      
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
      
  const onSubmitHandler = (event) => {
    event.preventDefault(); 
      
    // 입력한 비밀번호와 재확인하는 비밀번호가 맞는지 확인

    if(Password !== ConfirmPassword){
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
    }
      
    let body = {
      email : Email,
      name : Name,
      password : Password
     
    }
      
    dispatch(registerUser(body))
    .then(response=>{
      if(response.payload.success){
        alert('회원가입에 성공하였습니다.')
        // props.history.push("/login")// 로그인페이지로 이동
        navigate('/login')// 로그인페이지로 이동
      }
      else{
        alert('회원가입에 실패하였습니다.')
      }
    })
  }
  return (
    <div 
      style={{display:'flex', justifyContent:'center', alignItems:'center'
    , width:'100%', height:'100vh'
  }}
    >
      <form 
          style={{display:'flex', flexDirection:'column', backgroundColor:'white', padding:'50px',
          boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
         }}
          onSubmit={onSubmitHandler}
        >
              
        <label>Email</label>
        <input type = "email" value= {Email} onChange ={onEmailHandler} />
              
        <label>Name</label>
        <input type = "name" value = {Name} onChange = {onNameHandler} />
              
        <label>Password</label>
        <input type = "password" value = {Password} onChange = {onPasswordHandler} />
              
        <label>Confirm Password</label>
        <input type = "password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler} />
      
        <br />
        <button type="submit"
          style={{ backgroundColor:'#333', border:'0', color:'white', height:'30px', lineheight:'30px'}}
        >
          회원가입
        </button>
      
      </form>
  </div>
  )
}

export default RegisterPage   