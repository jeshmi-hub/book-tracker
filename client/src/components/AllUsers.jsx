import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const AllUsers = () => {
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

  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem('accesstoken')

  const getData = async(e) =>{
    const res = await fetch("http://localhost:8000/getAllUsers",{
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
        setUsers(data);
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
        <h1 style={h1}>Admin Panel - All Users</h1>
        <div className="table-responsive">
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th style={data}>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Emailaddress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                    users && users.map((user)=>{
                        return(
                            <tr style={tdata} key={user.id}>
                            <td style={data}>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              <div style={user.verified? statusA : statusU}>{user.verified ? "Verified" : "Not Verified"}</div>
                            </td>
                            <td>
                              <div style={buttonContainer}>
                                <button style={button}>Delete</button>
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

export default AllUsers;