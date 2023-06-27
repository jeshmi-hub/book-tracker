import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBooks = () => {
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
    backgroundColor: "#A30000",
    fontSize: "12px",
    textAlign: "center",
    color: "#fff",
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

  const [books, setBooks] = useState([]);
  const[refresh, setRefresh] = useState(false);
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

  const deleteBookData = async(id) =>{
    const url = `http://localhost:8000/deleteBook/${id}`;
    const res = await axios.delete(
        url,
        {headers:{ Authorization: token}}
    );
    alert(res.data)
    setRefresh(!refresh)
  }

  return (
    <>
      <Navbar />
      <div>
        <h1 style={h1}>Admin Panel - Manage Books</h1>
        <div className="table-responsive">
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th style={data}>SN</th>
                <th>Book Title</th>
                <th>Book Author</th>
                <th>Book Image</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                    books && books.map((book) => {
              return(          
              <tr style={tdata} key={book.id}>
                <td style={data}>{book.id}</td>
                <td>{book.bookTitle}</td>
                <td>{book.bookAuthor}</td>
                <td><img src={`../images/${book.image}`} style={{width:"250px", height:"250px", objectFit: "cover", marginBottom:"10px"}}  alt="book-image"/></td>
                <td>
                <div style={book.available ? statusA : statusU}>
                {book.available ? "Available" : "Unavailable"}
                </div>
                </td>
                <td>
                  <div style={buttonContainer}>
                  <Link to="/addBook"><button style={button}>Add</button></Link> 
                   <Link to={`/updateBook/${book.id}`}><button style={button}>Update</button></Link> 
                    <button style={button} onClick={()=> deleteBookData(book.id)}>Delete</button>
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

export default AllBooks;