import React,{useEffect, useState}from 'react';
import BorrowBookAPI from '../../api/BorrowBookAPI';
import axios from 'axios';

function Cart() {
  const [token, setToken] = useState(false);
  const refreshToken = async()=>{
    setToken(res.data.refreshToken)
  };

  useEffect(()=>{
    const firstLogin = localStorage.getItem('firstLogin');
    if(firstLogin) refreshToken();
  },[]);

  const state = {
    token: [token, setToken],
    bookBorrow: BorrowBookAPI(localStorage.getItem('accesstoken'))
  }

  const [borrowBook, setIsBorrowed] = state.bookBorrow.borrowBook;
  const [total, setTotal] = useState(0)

  return (
    <div>
      
    </div>
  )
}

export default Cart

