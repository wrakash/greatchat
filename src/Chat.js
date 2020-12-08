import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase';

export default function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const[{user}, dispatch ]= useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((onSnapshot) => setRoomName
        (onSnapshot.data().name));

        db.collection('rooms').doc(roomId).
        collection("messages").orderBy
        ('timestamp', 'asc')
        .onSnapshot(onSnapshot=>
          setMessages(onSnapshot.docs.map((doc) =>
          doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

 // console.log("messages: "+ messages);

  const sendMessage = (e) => {
    e.preventDefault();
   // console.log(input);
   db.collection('rooms').doc(roomId).collection
   ('messages').add({
       message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
   });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}
        />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p> last seen {""}
          {new Date(
            messages[messages.length-1]?.timestamp?.toDate()
          ).toLocaleString('en-US', {timeZone: "Asia/Kolkata"})} </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timeStamp">{new Date(message.timestamp?.toDate())
            .toLocaleString('en-US', {timeZone: "Asia/Kolkata"})
            }</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter message here"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
