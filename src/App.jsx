import { AuthContext } from './context/AuthContext.jsx';
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/authentication/Register.jsx";
import Login from "./pages/authentication/Login.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import ResetPassword from "./pages/authentication/ResetPassword.jsx";
import News from "./pages/news/News.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Products from "./pages/products/Products.jsx";
import Elearning from "./pages/elearning/Elearning.jsx";
import "./components/global/Global.css";

function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products />}/>
                {isAuth ? (
                    <>
                        <Route path="/news" element={<News />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/elearning/:id" element={<Elearning />} />
                    </>
                ) : (
                    <Route path="*" element={<Login />} /> // Redirect to Login if not authenticated
                )}
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/checkout" element={<Checkout />}/>
                <Route path="/resetpassword" element={<ResetPassword />}/>
            </Routes>
        </>
    )
}

export default App
