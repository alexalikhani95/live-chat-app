import React, { useEffect, useState } from "react";

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
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]); // set the list of messages to what is was before, plus the new message recieved
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-message">
        <input
          type="text"
          placeholder="Message..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return <p key={messageContent.message}>{messageContent.message}</p>;
        })}
      </div>
    </div>
  );
};

export default Chat;
