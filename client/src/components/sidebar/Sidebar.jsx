import React, { useContext, useEffect, useState } from 'react';
import "./sidebar.css";
import {Users} from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends"
import axios from 'axios';
import {Link} from "react-router-dom";

import {RssFeed, 
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School} from '@material-ui/icons';

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [allUsers, setUsers] = useState([]);
    useEffect(()=> {
        const getUsers = async () => {
            try{
                const userList = await axios.get("/users/registered/all");
                // console.log(userList);
                // console.log(userList.data);
                setUsers(userList.data);
            }catch(err){
                console.log(err);
            }
        };
        getUsers();
    }, []);
    return (
        <div className = "sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className = "sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {/* {Users.map(u=>(
                        <CloseFriends key = {u.id} user = {u} />
                    ))} */}
                    {allUsers.map((user, index) => (
                        <div key={index}>
                            <Link to={"/profile/"+user.username} style = {{textDecoration : "none"}}>
                                <div className="sidebarFriend">
                                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}alt="" className="sidebarFriendImg" />
                                    <span className = "leftbarFollowingName">{user.username}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
