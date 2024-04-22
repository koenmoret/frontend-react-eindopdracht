import {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import { AuthContext } from './context/AuthContext.jsx';


import "./components/global/Global.css";

import Register from "./pages/authentication/Register.jsx";
import Login from "./pages/authentication/Login.jsx";


function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Login" element={<Login/>}/>
            </Routes>
        </>
    )
}

export default App
