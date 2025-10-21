import React, { useEffect } from 'react';

import {Routes, Route, Navigate} from "react-router-dom";

import Navbar from './components/Navbar'; // adjust path


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import { userAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';


import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";

const App = () => {

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = userAuthStore()
  const{theme} = useThemeStore();

  console.log({onlineUsers});


  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
    <Loader className='w-10 h-10 animate-spin'></Loader>
    </div>)

  return (
    <div >

      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path='/signup' element={!authUser ?<SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

      </Routes>

      <Toaster/>
      
    </div>
  )
}

export default App
