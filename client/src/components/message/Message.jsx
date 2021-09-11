import React, { useEffect, useState }  from 'react';
import "./message.css";
import {format} from "timeago.js";
import axios from 'axios';

export default function Message({message, sender, own}) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=> {
        const getUser = async () => {
            try{
                const res = await axios("/users/" + sender);
                // console.log(res.data);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getUser();
    }, [sender])
    return (
        <div className = {own ? "message own" : "message"}>
            <div className="messageTop">
                <img className = "messageImg" src = 
                    {user?.profilePicture 
                    ? PF + user.profilePicture 
                    : PF + "person/noAvatar.png"} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
