import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function BorrowBookAPI(token){
    const[isLogged, setIsLogged] = useState(false)
    const[borrowBook, setIsBorrwoed] = useState([])
    const [totalBookBorrowed, setTotalBookBorrowed] = useState(0);
    const {id} = useParams();

    useEffect(()=>{
        if(token){
            const getBorrowedBook = async()=>{
                try{
                    const res = await axios.get(`http://localhost:8000/getOneBorrower/${id}`,{
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization" : `Bearer ${token}`
                        }
                    })
                    setIsLogged(true)
                    setIsBorrwoed(res.data.cart)
                    setTotalBookBorrowed(res.data.cart.length)

                }catch(err){
                    alert(err.response.data.msg)
                }
            }
            getBorrowedBook()
        }
    },[token])

    const addBorrowedBook = async(books)=>{
        if(!isLogged) return alert("Please login to borrow book");

        const check = borrowBook.every(book =>{
            return book.id !== books.id
        })

        console.log("check", check)
        if(check){
            await axios.patch(`http://localhost:8000/addBook/${id}`, {cart: [...borrowBook, {...books}]},{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            window.location.reload()
        }else{
            alert("The book is borrowed by you.")
        }
        console.log(borrowBook)
    }
    return{
        isLogged: [isLogged, setIsLogged],
        borrowBook: [borrowBook,setIsBorrwoed],
        totalBookBorrowed: [totalBookBorrowed, setTotalBookBorrowed]
    }

}

export default BorrowBookAPI;