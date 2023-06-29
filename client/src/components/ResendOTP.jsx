import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const ResendOTP = () => {
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
  };
  const spanStyles = {
    fontFamily: "'Dancing Script', cursive",
    fontWeight: "bold",
    fontSize: "2rem"
  };
  const h5 = {
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1px",
    margin: "50px",
  };
  const colStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const mainContainer ={
    margin: "150px auto"
  }
  
  const {id} = useParams();
  const[data, setData] = useState({userId: id, email:""});
  const history = useNavigate();

  const onChangeInput = e =>{
    const{name, value} = e.target;
    setData({...data, [name]: value})
    console.log(data)
  }

  const resendVerifyOtp = async e =>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8000/resendVerificationCode',{...data})
      alert(response.data.message)
      history(`/sendOtp/${id}`);
    }catch(err){
      alert(err.response.data.message)
    }
  }
  return (
    <form onSubmit={resendVerifyOtp}>
    <MDBContainer style={mainContainer}>
      <MDBCard style={{border:"none"}}>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="../images/book-gf66f35e9a_640.jpg"
              alt="login form"
              className="rounded-start w-100 h-100"
            />
          </MDBCol>

          <MDBCol md="6" style={colStyles}>
            <MDBCardBody
              className="d-flex flex-column h-39"
              style={{ backgroundColor: "#A4C4B5" }}
            >
              <div style={containerStyles}>
                <span className="h1" style={spanStyles}>
                  Arbyte E-Library
                </span>
              </div>

              <h5 className="fw-normal pb-3 text-center" style={h5}>
                Resend OTP
              </h5>
              <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="id"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  User Id
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  name="userId"
                  value={id}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: "2px solid #707672",
                    width: "300px",
                    margin: "auto",
                  }}
                  
                />
              </div>
                <label
                  htmlFor="email"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Email address
                </label>
                <MDBInput
                 wrapperClass="mb-2"
                 id="formControlLg"
                 type="text"
                 name="email"
                 value={data.email}
                 onChange={onChangeInput}
                 size="lg"
                 style={{
                 background: "none",
                 border: "none",
                 borderBottom: "2px solid #707672",
                 width: "300px",
                 margin: "auto",
                 }}
                 />
              </div>
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                style={{
                  backgroundColor: "#696969",
                  border: "none",
                  width: "250px",
                  margin: "auto",
                  borderRadius: "30px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                }}
              >
                Send Reset Code
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    </form>
  );
};

export default ResendOTP;