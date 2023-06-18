import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Register from "./components/Register";
import Login from "./components/login";
import SendOtp from "./components/sendOtp";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sendOTP" element= {<SendOtp/>}/>
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
