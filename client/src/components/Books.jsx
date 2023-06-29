import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";


const Books = () => {
  const h1 = {
    textAlign: "center",
    fontFamily: "'Dancing Script', cursive",
    fontWeight: "bold",
  };
  
  const images = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  };

  const button = {
    marginRight: "10px",
    backgroundColor: "#707672",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
  };

  const cardbackground = {
    backgroundColor: "#A4C4B5",
  };

  const info = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "Bold",
  };

  const infospan = {
    fontFamily: "'Dancing Script', cursive",
    fontWeight: "Bold",
    color: "#ffff",
  };

  const container = {
    display: "flex",
    gap: "20px",
  };
  const statusA = {
    width: "80px",
    borderRadius: "20px",
    backgroundColor: "#355e3b",
    fontSize: "12px",
    textAlign: "center",
    color: "#fff",
    fontWeight: "normal",
    padding:"3px"
  };
  const statusU = {
    width: "80px",
    borderRadius: "20px",
    backgroundColor: "#A30000",
    fontSize: "12px",
    textAlign: "center",
    color: "#fff",
    fontWeight: "normal",
    padding:"3px"
  };

  const card = {
    width: "18rem",
    marginBottom: "20px",
  };

  const [books, setBooks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const token = localStorage.getItem('accesstoken')

  const getData = async(e) =>{
    const res = await fetch("http://localhost:8000/getAllBooks",{
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
        setBooks(data);
        console.log(data)
    }
  }

  useEffect(()=>{
    getData();
  },[refresh]);


  return (
    <>
      <Navbar />
      <h1 style={h1}>All Books</h1>
      <div className="d-flex flex-wrap  justify-content-center my-3 mx-3" style={{ gap: "20px" }}>
        {books && books.map((book)=>{
            return(
                <div className="card" style={card} key={book.id}>
                <img
                  src={`../images/${book.image}`}
                  style={images}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body" style={cardbackground}>
                  <p className="card-text" style={info}>
                    Book Title: {book.bookTitle} <br />
                    Writer: <span style={infospan}> {book.bookAuthor} </span> <br />
                    <div style={container}>
                      Status: <div style={book.available ? statusA : statusU}>{book.available ? "Available" : "Unavailable"}</div>
                    </div>
                  </p>
                  <div className="d-flex justify-content-start">
                    <a href="#" style={button} className="btn btn-primary">
                      Borrow
                    </a>
                    <a href="#" style={button} className="btn btn-primary">
                      Return
                    </a>
                  </div>
                </div>
              </div>
                
            )
        })}
       
        
      </div>
      <Footer />
    </>
  );
};

export default Books;