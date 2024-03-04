import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          <Route  path="/" element={<Home />}/>
          <Route 
                path="/login"  
                element={<OpenRoute>
                          <Login /> 
                        </OpenRoute>
                        } />
                        
          <Route
                path="signup"
                element={<OpenRoute>
                          <Signup />
                        </OpenRoute>
                      } />

          <Route
                path="forgot-password"
                element={<OpenRoute>
                          < ForgotPassword />
                        </OpenRoute>
                      } /> 

          <Route
                path="verify-email"
                element={<OpenRoute>
                          < VerifyEmail />
                        </OpenRoute>
                      } />

          <Route
                path="update-password/:id"
                element={<OpenRoute>
                          < UpdatePassword />
                        </OpenRoute>
                      } />

        </Routes>
    </div>
  );
}

export default App;
