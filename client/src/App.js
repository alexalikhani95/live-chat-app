import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001"); // connect to the socket.io server on the backend

function App() {
  return (
    <div className="App">
      <p>Hello</p>
    </div>
  );
}

export default App;
