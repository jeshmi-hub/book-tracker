import React, { useState, useEffect } from 'react'
import '../Home/Home.css'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Home = () =>{
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
    <Navbar/>
    <div className='container1'>
     <div class="row1">
        <div class="imgWrapper">
            <img src="../images/book.jpeg" alt=""/>
        </div>
        <div class="contentWrapper">
            <div class="content">
                <span class="textWrapper">
                    <span></span>Arbyte Solutions
                </span>
                <h2>Teachers die, but books live on.</h2>
                <p>Books are teachers as they teach us wisdom of thousands of years. Teachers come and go, but books carry on. That’s why we can still access wisdom of greats such as Aristotle, Seneca, and Socrates nearly two thousand years after they walked on this planet.
                Your learning deepens when you re-read a book. You’ll inevitably miss few things in the first read, most of which you’ll grasp in the second. This, by the way, doesn’t take into account the silent digestion of and reflection on the content happening between the two readings.
                A book must be read, re-read, and reflected upon in the light of your and others’ experiences to gain in-depth understanding of the subject.
                A bad book steals away your time because you hardly learn anything. If you come across such a book don’t finish it.
                Word count doesn’t matter. What matters is how effective they’re. With low attention spans in the digital world, people don’t have the patience to read unnecessary stuff in your emails and other communications. Therefore, communication should be as succinct and to-the-point as possible.
                Books are a collection of wisdom accumulated over thousands of years. Little wonder, they will provide solution to your suffering. Moreover, books can distract you from the troubling present.
                </p>
                <a href="/dfd">Return Book</a>
            </div>
        </div>
    </div>
  
    </div>
    <div className='flexbox'>
      <h1>Reviews</h1>
    <div className='container2'>
        <div className='row2'>
            {
                reviews && reviews.map((review)=>{
                    return(
                    <div className='card1' key={review.id}>
                       <img src={`../images/${review.image}`} alt='image1'/>
                       <h4>{review.username}</h4>
                      <p>{review.feeback}</p>
                    </div>

                    )
                })
            }
            
        </div>

    </div>
    </div>

   <Footer/>
    </>
  )

    }

export default Home;


