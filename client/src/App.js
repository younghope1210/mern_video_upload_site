import React, { Suspense } from 'react';
import {
  Route,
  Routes
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './components/views/SubscriptionPage/SubscriptionPage';
import Auth from "./hoc/auth";


function App() {
  
// null = 모든 유저 접속 가능
// false = 로그인한 유저는 접속 불가능
// true = 로그인한 유저만 접속 가능, 어드민,일반 유저 구분

  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth( VideoUploadPage, true);
  const AuthVideoDetailPage = Auth( VideoDetailPage, null);
  const AuthSubscriptionPage = Auth( SubscriptionPage, null);

  return (

    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div>
     
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          
           <Route exact path="/" element={<AuthLandingPage />} />
           <Route exact path="/login" element={<AuthLoginPage />} />
           <Route exact path="/register" element={<AuthRegisterPage />} />         
          
           <Route exact path="/upload" element={<AuthVideoUploadPage/>} />
           <Route exact path="/video/:videoId" element={<AuthVideoDetailPage/>} />  
           <Route exact path="/subscriber" element={<AuthSubscriptionPage />} />

        </Routes>
        
      </div>
      <Footer />
      </Suspense>
   
  );
}

export default App
