import React, {useContext, useRef} from 'react';
import "./login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";

export default function Login() {
    // using useRef will prevent rerendering as opposed to useState which rerenders after every character
    const email = useRef();
    const password = useRef(); 
    const {isFetching, dispatch} = useContext(AuthContext);
    const history = useHistory();
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({
            email:email.current.value, 
            password:password.current.value
        }, dispatch);
    };
    const toRegister = () => {
        history.push("/register");
    };
    return (
        <div className = "login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Kaobon Social</h3>
                    <span className="loginDesc">Connect with 友達 using Kaobon</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit = {handleClick}>
                        <input placeholder = "Email" type ="email" required className="loginInput" ref = {email}/>
                        <input placeholder = "Password" type="password" minLength = "6" required className="loginInput" ref={password} />
                        <button className="loginButton" type ="submit" disabled = {isFetching} >{isFetching ? <CircularProgress size= "20px" /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick = {toRegister}>{isFetching ? (<CircularProgress size= "20px" />) : "Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
