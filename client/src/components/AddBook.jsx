import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const AddBook = () => {
  const button = {
    backgroundColor: "#707672",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    margin: "10px",
  };
  const card = {
    backgroundColor: "#A4C4B5",
    width: "70%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
  };

  const h1 = {
    fontFamily: "'Dancing Script', cursive",
    textAlign: "center",
    marginTop: "40px",
  };

  const h2 = {
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    letterSpacing: "1px",
    fontSize: "25px",
  };

  const labelContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const label = {
    marginBottom: "5px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  };

  const radioContainer = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "10px",
  };

  const inputStyle = {
    background: "none",
    border: "none",
    borderBottom: "2px solid #707672",
    width: "300px",
    margin: "auto",
    textAlign: "center",
  };
 
  return (
    <>
      <Navbar />
      <div style={card}>
        <h1 style={h1}>Admin Panel</h1>
        <h2 style={h2}>Add Books</h2>
        <form>
          <div class="mb-3" style={labelContainer}>
            <label for="exampleInputEmail1" class="form-label" style={label}>
              Book Title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={inputStyle}
            />
          </div>
          <div class="mb-3" style={labelContainer}>
            <label for="exampleInputPassword1" class="form-label" style={label}>
              Book Author
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              style={inputStyle}
            />
          </div>
          <div class="mb-3" style={labelContainer}>
            <label for="img"  class="form-label" style={label}>Book Image</label>
            <input type="file" id="img" name="img" accept="image/*" style={{marginLeft:"50px"}}/>
          </div>
          <div style={radioContainer}>
            <div class="mb-3 form-check" style={{ margin: "5px" }}>
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Available
              </label>
            </div>
            <div class="mb-3 form-check" style={{ margin: "5px" }}>
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Unavailable
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary" style={button}>
              Add
            </button>
            <button type="submit" class="btn btn-primary" style={button}>
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBook;