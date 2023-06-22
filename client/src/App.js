import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Register from "./components/Register";
import Login from "./components/Login";
import SendOtp from "./components/SendOtp";
import AddBook from "./components/AddBook";
import { DataProvider } from "./GlobalState";


const App = () => {
  return (
    <>
    <DataProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sendOtp/:id" element= {<SendOtp/>}/>
      <Route path="/addBook" element={<AddBook/>}/>
    </Routes>
    </BrowserRouter>
    </DataProvider>
    </>
    
  );
}

export default App;
