import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import {useContext} from "react";
import { AuthContext } from './context/AuthContext.jsx';


import "./components/global/Global.css";

import Register from "./pages/authentication/Register.jsx";
import Login from "./pages/authentication/Login.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import News from "./pages/news/News.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Products from "./pages/products/Products.jsx";
import Elearning from "./pages/elearning/Elearning.jsx";



function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products />}/>
                {isAuth &&
                    <>
                        <Route path="/news" element={<News />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/elearning/:id" element={<Elearning />} />
                    </>
                }
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/checkout" element={<Checkout />}/>

            </Routes>
        </>
    )
}

export default App
