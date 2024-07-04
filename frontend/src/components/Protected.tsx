import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userAPI } from '../apis/userAPI';

export default function Protected({children}: any) { 
    let [isLoggedIn, setIsLoggedIn] = useState(true);
    
    useEffect(() => { 
        userAPI.getUser().then(() => {
            setIsLoggedIn(true)
        }).catch(() => {
            setIsLoggedIn(false)
            localStorage.removeItem('token')
        })
    }, [])
    
    if(!isLoggedIn)
        return <Navigate to="/"/>


    return children
}