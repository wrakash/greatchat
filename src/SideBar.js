import React, { useState, useEffect } from "react";
import "./SideBar.css";
import db from "./firebase";
import DonutLarge from "@material-ui/icons/DonutLarge";
import Chat from "@material-ui/icons/Chat";
import MoreVert from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";


function SideBar() {
  const[{user}, dispatch ]= useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () =>{
      unsubscribe();
    }
  }, []);
  return (
    <>
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          
          <IconButton>
            <DonutLarge />
          </IconButton>

          <IconButton>
            <Chat />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined style={{ marginLeft: "5px" }} />
          <input type="text" placeholder="Search or srart new chat" />
        </div>
      </div>
      <SidebarChat addNewChat />
      <div className="sidebar_chats">
        
        {
        rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))
        }
      </div>
    </div>
    
    </>
  );
}

export default SideBar;
