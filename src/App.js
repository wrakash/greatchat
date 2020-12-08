import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import Login from './Login'
import "./App.css";
import axios from "./axios";
import owner from './owner.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {

  const[{user}, dispatch ]= useStateValue();

  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      //console.log(response.data)
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("a1f3bbc3e0051cc4b85c", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      // alert(JSON.stringify(data));

      setMessages(...messages, data);
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    });
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">

      {!user ? (<Login/>):(
      <div className="app_body">
        <Router>
          <SideBar />

          <Switch>
            <Route path="/rooms/:roomId">
              <Chat/>
            </Route>

            <Route path="/"> 
            <Chat/>
            </Route>
          </Switch>
        </Router>
      </div> ) }
      <div className="owner">
        <p>Created by Akash</p>
        <img  src={owner} />
        </div>
    </div>
  );
}

export default App;
