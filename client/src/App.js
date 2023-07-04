import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Register from "./components/Register";
import Login from "./components/Login";
import SendOtp from "./components/SendOtp";
import AddBook from "./components/AddBook";
import { DataProvider } from "./GlobalState";
import AllBooks from "./components/AllBooks";
import UpdateBook from "./components/UpdateBook";
import AddReview from "./components/AddReview";
import AllReviews from "./components/AllReviews";
import UpdateReview from "./components/UpdateReview";
import Books from "./components/Books";
import AllUsers from "./components/AllUsers";
import ResendOTP from "./components/ResendOTP";



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
      <Route path="/allBooks" element={<AllBooks/>}/>
      <Route path="/updateBook/:id" element={<UpdateBook/>}/>
      <Route path="/addReview" element={<AddReview/>}/>
      <Route path="/allReviews" element= {<AllReviews/>}/>
      <Route path="/updateReview/:id" element={<UpdateReview/>}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/allUsers" element={<AllUsers/>}/>
      <Route path="/resendOtp/:id" element={<ResendOTP/>}/>
    </Routes>
    </BrowserRouter>
    </DataProvider>
    </>
    
  );
}

export default App;
