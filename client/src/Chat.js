import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() + // To get the date and time that the message was sent
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]); // set the list of messages to what is was before, plus the new message recieved
    });
  }, [socket]);

  return (
    <Box className="chat-window">
      <div className="chat-header">
        <h3>Live Chat</h3>
      </div>
      <div className="chat-message">
        <TextField
          placeholder="Message..."
          sx={{ marginBottom: 1 }}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send Message
        </Button>
      </div>
      <div className="chat-body" style={{ marginTop: 10 }}>
        {messageList.map((messageContent) => {
          return (
            <Paper elevation={2}>
              <p style={{ fontWeight: "bold" }}>{username}:</p>{" "}
              <p key={messageContent.message}>{messageContent.message}</p>
            </Paper>
          );
        })}
      </div>
    </Box>
  );
};

export default Chat;
