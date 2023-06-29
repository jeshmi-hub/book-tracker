import React,{ useState}from 'react';
import BorrowBookAPI from '../../api/BorrowBookAPI';


function Cart() {
  const [token, setToken] = useState(localStorage.getItem('refreshToken'));


  

  const state = {
    token: [token, setToken],
    bookBorrow: BorrowBookAPI(localStorage.getItem('accesstoken'))
  }

  const [borrowBook, setIsBorrowed] = state.bookBorrow.borrowBook;
  const removeBorrowedBook = state.bookBorrow.removeBorrowedBook

  return (
    <div>
      {borrowBook.map((bok)=>{
         <div className="detail cart" key={bok.id}>
         <div className="box-detail">
           <h2>{bok.username}</h2>
           <h3>{bok.email}</h3>
           <div className="delete" onClick={() => removeBorrowedBook(bok.id)}>
                X
            </div>
           </div>
           </div>

      })
      }
      
    </div>
  )
}

export default Cart

