import axios from 'axios';
import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';
import "./register.css";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef(); 
    const passwordAgain = useRef(); 

    // can direct to previous page and such
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            
            try{
                await axios.post("/auth/register", user);
                history.push("/login");
            }catch(err){
                console.log(err);
            }
        }
    };
    const toSignIn = () => {
        history.push("/login");
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
                        <input placeholder = "Username" required ref={username} className="loginInput" />
                        <input placeholder = "Email" required type = "email" ref={email} className="loginInput" />
                        <input placeholder = "Password" required minLength = "6" type = "password" ref={password} className="loginInput" />
                        <input placeholder = "Password Again" required type = "password" ref={passwordAgain} className="loginInput" />
                        <button className="loginButton" type = "submit">Sign Up</button>
                        <button className="loginRegisterButton" onClick = {toSignIn}>Log Into an Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
