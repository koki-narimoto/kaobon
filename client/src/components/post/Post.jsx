import React, {useContext, useEffect, useState} from 'react';
import "./post.css";
import {MoreVert} from "@material-ui/icons";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Post ({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);

    const [like, setLike] = useState(post.likes.length);
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes]);

    const [isLiked, setIsLiked] = useState(false);
    const likeHandler = () => {
        try{
            axios.put("/posts/"+post._id+"/like", {userId: currentUser._id});
        }catch(err){
            console.log(err);
        }
        setLike(isLiked
            ? like - 1
            : like + 1);
        setIsLiked(!isLiked);
    };

    const [user, setUsers] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUsers(res.data);
        };
        fetchUser();
    }, [post.userId]);
    
    return (
        <div className = "post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className = "postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                        </Link>
                        
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className = "postImg" src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick = {likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick = {likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};