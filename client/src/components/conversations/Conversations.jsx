import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./conversations.css";

export default function Conversations({convo, currentUser}) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=> {
        const friendId = convo.members.find((m)=>
            m !== currentUser._id
        );
        // console.log(friendId);
        // console.log(currentUser._id);
        
        const getUser = async () => {
            try{
                const res = await axios("/users?userId=" + friendId);
                setUser(res.data);
                // console.log(res.data);
                // console.log(user);
            }catch(err){
                // console.log(err);
            }
        };
        getUser();
    }, [currentUser, convo])
    return (
        <div className = "conversation">
            <img className="conversationImg" src = {user?.profilePicture 
                ? PF + user.profilePicture 
                : PF + "person/noAvatar.png"} alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}
