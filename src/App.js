import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/" element={<Navigate to='/login'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
