import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
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
//import { GlobalState } from "../GlobalState";
import axios from "axios";




const Login = () => {
  //const {token} = useContext(GlobalState);
  //console.log("from login",token)
    const[data, setData] = useState({
        email: "",
        password: ""
    })
    const history = useNavigate();
    const onChangeInput = e =>{
        const {name, value} = e.target;
        setData({...data, [name]:value})
    }
    
    const loginSubmit = async e =>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8000/login', {...data})
            localStorage.setItem('firstLogin',true )
            alert(response.data.msg)
            localStorage.setItem('refreshToken',response.data.refreshtoken)
            history('/')
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
    margin: "50px",
  };

  return (
    <form onSubmit={loginSubmit}>
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="./images/books.avif"
              alt="login form"
              className="rounded-start w-100 h-100"
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
                Sign into your account
              </h5>
              <div style={{ display: "flex", flexDirection: "column" }}>
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
                  wrapperClass="mb-4"
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
                  wrapperClass="mb-4"
                  id="formControlLg"
                  type="password"
                  name="password"
                  value={data.password}
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
              <a
                className="small text-muted"
                href="#!"
                style={{
                  marginLeft: "250px",
                  marginBottom: "20px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Forgot password?
              </a>
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                type="submit"
                style={{
                  backgroundColor: "#696969",
                  border: "none",
                  width: "150px",
                  margin: "auto",
                  borderRadius: "30px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                }}
              >
                Login
              </MDBBtn>

              <p
                className="mb-5 pb-lg-2 text-center"
                style={{
                  color: "#393f81",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#393f81",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Register here
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

export default Login;