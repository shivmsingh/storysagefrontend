import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import Register from "./Register";
import LoginForm from "../Login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;