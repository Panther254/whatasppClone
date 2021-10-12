import { Button } from '@mui/material';
import React from 'react';
import './Login.css';
import { auth, provider } from "./firebase.js"
import { signInWithPopup } from '@firebase/auth';
import { useStateValue } from './DataStore';
import { actionTypes } from './reducer';

const Login = () => {
    const [,dispatch] = useStateValue();
    const signIn = () => {
        signInWithPopup(auth, provider).then((results)=>{
            const name = results.user.displayName
            dispatch({
                type: actionTypes.SET_USER,
                user: name,
            });
        }).catch(error=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error code ${errorCode}: ${errorMessage}`);
         })
    }
    
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://www.logo.wine/a/logo/WhatsApp/WhatsApp-Logo.wine.svg" alt="" />
                <div className="login__text">
                    <h1>Sign In to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
