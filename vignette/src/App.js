import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "./features/auth/index";

function App() {
  return (
    <div className="App">
      {/* <h1>Hello</h1> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
