import React , {useContext, useEffect} from 'react'
import '../Navbar/Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';
import { GlobalState } from '../../GlobalState';
import axios from 'axios'

const Navbar = () => {
  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin


  const logoutUser = async()=>{
    await axios.get('http://localhost:8000/logout')
    localStorage.clear()
    window.location.href = "/";
  }

  const adminRouter = () =>{
    return (
      <>
      <li><Link to="">Reviews</Link></li>
      <li><Link to="">Status</Link></li>
      </>
    )
  }

  const loggedRouter=()=>{
    return (
      <>
      <li><Link to="/">Books</Link></li>
      <li><Link to=""><i class="fa-sharp fa-solid fa-cart-shopping"></i>
      <span className="cart-icon">1</span></Link></li>
      <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }
  function animation(){ 
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);



  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">
       <div className="container">
      <NavLink className="navbar-brand navbar-logo text-white" style={{fontSize: "28px"}} to="/" exact>
       {isAdmin ? 'Admin' : 'Arbyte Library'}
      </NavLink>
    
    
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
 
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                {isAdmin ? 'Add Books': 'Home'}
              </NavLink>
            </li>
            {isAdmin && adminRouter()}{
              isLogged ? loggedRouter(): <li><NavLink className="nav-link" to="/login">Login</NavLink></li>

              }   
        </ul>
      </div>
      </div>
  </nav>
  )
}
export default Navbar;