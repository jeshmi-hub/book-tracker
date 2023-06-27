import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import {Link} from 'react-router-dom';
import Footer from "./Footer/Footer";

const AllReviews = () => {
  const h1 = {
    textAlign: "center",
    fontFamily: "'Dancing Script', cursive",
    fontWeight: "bold",
  };
  const table = {
    fontFamily: "'Poppins', sans-serif",
    padding: "0.5rem 0.5rem",
    width: "100%",
  };

  const thead = {
    backgroundColor: "#707672",
    color: "#fff",
    padding: "10px",
  };

  const tdata = {
    backgroundColor: "#A4C4B5",
    padding: "10px",
  };

  const data = {
    padding: "10px",
  };

  const statusA = {
    width: "80px",
    borderRadius: "20px",
    backgroundColor: "#355e3b",
    fontSize: "12px",
    textAlign: "center",
    color: "#fff",
  };

  const statusU = {
    width: "80px",
    borderRadius: "20px",
    backgroundColor: "#ffdf00",
    fontSize: "12px",
    textAlign: "center",
    color: "#000",
  };

  const buttonContainer = {
    display: "flex",
    gap: "10px",
    fontSize: "12px",
  };
  const button = {
    borderRadius: "20px",
    width: "70px",
    border: "none",
    backgroundColor: "#707672",
    color: "#fff",
  };

  const Images = {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "50%",
  };
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem('accesstoken')

  const getData = async(e) =>{
    const res = await fetch("http://localhost:8000/getAllReviews",{
        method: "GET",
        headers: {
            "Content-Type" :"application/json",
            "Authorization" : token
        }
    })
    const data = await res.json();
    if(res.status === 404 || !data){
        alert(res.data.msg)
    }else{
        setReviews(data);
        console.log(data)
    }
  }

  useEffect(()=>{
    getData();
  },[refresh]);


  
  return (
    <>
      <Navbar />
      <div>
        <h1 style={h1}>Admin Panel - All Reviews</h1>
        <div className="table-responsive">
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th style={data}>Fullname</th>
                <th>Image</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
               {
                reviews && reviews.map((review) => {
                return (
                <tr style={tdata} key={review.id}>
                <td style={data}>{review.username}</td>
                <td>
                  <img src={`../images/${review.image}`} alt="" style={Images} />
                </td>
                <td>
                  <p>
                    {review.feeback}
                  </p>
                </td>
                <td>
                  <div style={buttonContainer}>
                   <Link to={`/updateReview/${review.id}`}> <button style={button}>Update</button></Link>
                  </div>
                </td>
              </tr>

                    )
                })
               } 
              
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllReviews;