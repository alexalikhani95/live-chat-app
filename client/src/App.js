import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const socket = io.connect("http://localhost:3001"); // connect to the socket.io server on the backend

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="join-chat">
          <h3>Join a Chat</h3>
          <TextField
            placeholder="Name"
            onChange={(event) => setUsername(event.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            placeholder="Room ID"
            onChange={(event) => setRoom(event.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <Button variant="contained" onClick={joinRoom}>
            Join a Room
          </Button>
        </div>
      ) : (
        <div className="chat-container">
          <Chat socket={socket} username={username} room={room} />
        </div>
      )}
    </div>
  );
}

export default App;
