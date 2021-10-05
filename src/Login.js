import { Button } from '@mui/material';
import React from 'react';
import './Login.css';
import { auth, provider } from "./firebase.js"
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';

const Login = () => {
    const signIn = () => {
        signInWithPopup(auth, provider).then(results=>{
            const user = results.user.displayName;
            const credential = GoogleAuthProvider.credentialFromResult(results);
            const token = credential.accessToken;
            console.log("user>>",user, "/ntoken>>",token);
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
