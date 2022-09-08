import "./App.css";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import User from "./pages/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
