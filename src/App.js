import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          <Route  path="/" element={<Home />}/>
          <Route path="/login"  element={<Login />}></Route>
          <Route path="/signup" element={<Signup/>} />
        </Routes>
    </div>
  );
}

export default App;
