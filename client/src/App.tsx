// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Signup from './pages/SignUp'
import Signin from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import ForgetPassword from './pages/ForgetPassword'
import Users from './pages/Users'
import Profile from './pages/Profile';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    )
}

export default App
