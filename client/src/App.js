import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Register from "./components/Register";
import Login from "./components/Login";
import SendOtp from "./components/SendOtp";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sendOtp/:id" element= {<SendOtp/>}/>
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
