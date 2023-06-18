import React,{useState} from "react";
import { Link} from "react-router-dom";
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
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onChangeInput = e => {
        const{name, value} = e.target;
        setData({...data, [name]:value})
    }
    
    const registerSubmit = async e =>{
        e.preventDefault()
        try{
            await axios.post(' http://localhost:8000/register',{...data})
            localStorage.setItem('firstLogin', true)
            alert('Verification otp sent to your email');

        }catch(err){
            alert(err.response.data.msg)

        }
    }
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
  };
  const spanStyles = {
    fontFamily: "'Dancing Script', cursive",
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "0",
  };
  const h5 = {
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1px",
    margin: "30px",
  };
  return (
    <form onSubmit={registerSubmit}>
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="./images/20490.jpg"
              alt="login form"
              className="rounded-start w-100 h-100"
              style={{objectFit:"cover"}}
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody
              className="d-flex flex-column h-100"
              style={{ backgroundColor: "#A4C4B5" }}
            >
              <div style={containerStyles}>
                <span className="h1" style={spanStyles}>
                  Arbyte E-Library
                </span>
              </div>

              <h5 className="fw-normal pb-3 text-center" style={h5}>
                Sign up to register
              </h5>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="firstname"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Firstname
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="firstname"
                  name="firstName"
                  value={data.firstName}
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="lastname"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Lastname
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="lastname"
                  name="lastName"
                  value={data.lastName}
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="username"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Username
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="username"
                  name="username"
                  value={data.username}
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="email"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Emailaddress
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="email"
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="password"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Password
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  name="password"
                  value={data.password}
                  onChange={onChangeInput}
                  type="password"
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="password"
                  style={{
                    marginBottom: "5px",
                    marginLeft: "150px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Re-enter Password
                </label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
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
                type="submit"
                style={{
                  backgroundColor: "#696969",
                  border: "none",
                  width: "200px",
                  margin: "auto",
                  borderRadius: "30px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                }}
              >
                Sign Up
              </MDBBtn>

              <p
                className="mb-5 pb-lg-2 text-center"
                style={{
                  color: "#393f81",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                ALready have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#393f81",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Login here
                </Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    </form>
  );
};

export default Register;