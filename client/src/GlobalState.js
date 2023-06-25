import React, {createContext, useState, useEffect} from 'react';
import UserAPI from './api/UserAPI';
import axios from 'axios';



export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    const refreshToken = async()=>{
            const res = await axios.post('http://localhost:8000/refresh_token',{refreshToken:localStorage.getItem('refreshToken')});
            console.log("response from refresh token function",res)
            setToken(res.data.accesstoken);
            console.log(token)
         
        }
    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        console.log("fiirst login value",firstLogin)
        if(firstLogin)refreshToken()
    },[])

    const state={
        token: [token, setToken],
        userAPI : UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

