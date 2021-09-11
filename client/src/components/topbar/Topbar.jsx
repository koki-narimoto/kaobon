import React, { useContext } from 'react';
import "./topbar.css";
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function Topbar() {
  const {user, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const history = useHistory();
  // const toHome = () => {
  //   history.push("/");
  // };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
    return(
      <div className = "topbarContainer">
        <div className = "topbarLeft">
          <Link to="/" style = {{textDecoration: "none"}}>
            <span className = "logo">Kaobon</span>
          </Link>
        </div>
        <div className = "topbarCenter">
          <div className = "searchbar">
            <Search className = "searchIcon"/>
            <input placeholder = "Search for friend, post, or video" className="searchInput" />
          </div>
        </div>
        <div className = "topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Link to ={`/messenger`}>
                <Chat />
                <span className="topbarIconBadge">2</span>
              </Link>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem" onClick={handleLogout}>
              Logout
            </div>
            
          </div>
          
          {/* <div className="topbarLinks">
            <Link to ="/">
              <span className="topbarLink">Homepage</span>
            </Link>
            <span className="topbarLink">Timeline</span>
          </div> */}
          <Link to ={`/profile/${user.username}`}>
            <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg" />
          </Link>
        </div>
      </div>
    );
  };
